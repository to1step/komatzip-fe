import { useState } from 'react';
import LoginBackground from '../../components/background/LoginBackground';
import axiosInstance from '../../api/apiInstance';
import MenuBar from '../../components/background/MenuBar';
import { useNavigate } from 'react-router-dom';
import { success } from '../../util/toastify';

const SignUp = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<
    'signup' | 'email-verification' | 'username-verification'
  >('signup');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [check, setCheck] = useState<boolean>(false);
  const [nikeName, setNikeName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [errors, setErrors] = useState({});

  const onSignupStep1 = async () => {
    try {
      // 유효성 검사
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const validationErrors: any = {};

      if (formData.password.length < 12) {
        validationErrors.passwordLength =
          '비밀번호는 최소한 12자리 이상이어야 합니다.';
      }

      if (formData.password !== formData.confirmPassword) {
        validationErrors.passwordMatch = '비밀번호가 일치하지 않습니다.';
      }

      // 에러가 있는 경우 에러 상태 업데이트
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      await axiosInstance.post('/v1/auth/local/email-validation', {
        email: formData.email,
      });
      await axiosInstance.post('/v1/auth/local/email-code', {
        email: formData.email,
        password: formData.password,
        nickname: formData.username,
      });

      setMode('username-verification');
      // 성공적으로 가입된 경우 초기화
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
    } catch (error) {
      console.log(error);
    }
  };

  const onSignupStep2 = async () => {
    try {
      await axiosInstance.post('/v1/auth/local/nickname-validation', {
        nikeName: nikeName,
      });
      // data false일 경우 존재하지 않는 계정으로 회원가입 가능
      setMode('email-verification');
    } catch (error) {
      console.log(error);
    }
  };

  const onSignupStep3 = async () => {
    try {
      const { data } = await axiosInstance.post(
        '/v1/auth/local/email-verification',
        {
          email: formData.email,
          nickname: nikeName,
          code: code,
        },
      );
      // data false일 경우 존재하지 않는 계정으로 회원가입 가능
      if (data === false) {
        success('성공적으로 가입되셨습니다.');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-full flex items-center justify-between relative h-screen"
      id="full"
    >
      <LoginBackground />
      <MenuBar />
      <div className="w-3/5"></div>
      {mode === 'signup' && (
        <div className="w-2/5">
          <div className="flex flex-col justify-center items-center">
            <input
              type="text"
              className="items-center px-8 py-3 mt-4 text-base text-black outline-orange-300 bg-gray-100 border-0 rounded-3xl w-80 focus-visible:outline-none"
              placeholder="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="text"
              className="items-center px-8 py-3 mt-4 text-base text-black outline-orange-300 bg-gray-100 border-0 rounded-3xl w-80 focus-visible:outline-none"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              className="items-center text-black px-8 py-3 mt-4 text-base outline-orange-300 bg-gray-100 border-0 rounded-3xl w-80 focus-visible:outline-none"
              placeholder="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              className="items-center text-black px-8 py-3 mt-4 text-base outline-orange-300 bg-gray-100 border-0 rounded-3xl w-80 focus-visible:outline-none"
              placeholder="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <ul>
              <li className=" text-red-600">10자리 이상 16자리 미만</li>
              <li>특수문자 또는 숫자 사용</li>
              <li>영문 대문자 또는 소문자 사용</li>
              <div className="flex justify-center items-center gap-1">
                <input
                  type="checkbox"
                  id="option1"
                  name="option1"
                  onChange={(e) => setCheck(e.target.checked)}
                />
                <label htmlFor="check"> 서비스 이용약관에 동의 (필수)</label>
              </div>
            </ul>
            <button
              type="button"
              className={`inline-flex text-white justify-center items-center px-8 py-3 mt-4 text-base border-0 rounded-3xl w-80 ${
                !check
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-orange-400 cursor-pointer'
              }`}
              disabled={check}
              onClick={() => onSignupStep1()}
            >
              SIGN UP
            </button>
          </div>
        </div>
      )}
      {mode === 'username-verification' && (
        <div className="w-2/5">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl">WELLCOM</h2>
            <input
              type="text"
              className="items-center px-8 py-3 mt-4 text-base text-black outline-orange-300 bg-gray-100 border-0 rounded-3xl w-80 focus-visible:outline-none"
              placeholder="nickname"
              value={nikeName}
              onChange={(e) => setNikeName(e.target.value)}
            />
            <button
              type="button"
              className="inline-flex text-white justify-center items-center px-8 py-3 mt-4 text-base bg-orange-400 border-0 rounded-3xl w-80"
              onClick={() => onSignupStep3()}
            >
              SIGN UP
            </button>
          </div>
        </div>
      )}
      {mode === 'email-verification' && (
        <div className="w-2/5">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl">Email Verification</h2>
            <input
              type="text"
              className="items-center px-8 py-3 mt-4 text-base text-black outline-orange-300 bg-gray-100 border-0 rounded-3xl w-80 focus-visible:outline-none"
              placeholder="인증코드"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              type="button"
              className="inline-flex text-white justify-center items-center px-8 py-3 mt-4 text-base bg-gray-400 border-0 rounded-3xl w-80"
            >
              인증번호 재발송
            </button>
            <button
              type="button"
              className="inline-flex text-white justify-center items-center px-8 py-3 mt-4 text-base bg-orange-400 border-0 rounded-3xl w-80"
              onClick={() => onSignupStep2()}
            >
              SIGN UP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
