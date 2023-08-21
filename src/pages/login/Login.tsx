import { request } from '../../util/request';
import LoginBackground from '../../components/background/LoginBackground';
import MenuBar from '../../components/background/MenuBar';
import { useState, useEffect } from 'react';

const Login = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    reqlogin();
  }, []);

  const reqlogin = async () => {
    try {
      // request('GET', '/vi/rank', { params: { type: 'store' } });
      request('POST', '/vi/auth/local/email-validation', {
        data: {
          email: 'aaa@example.com',
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onLogin = () => {};

  return (
    <div className="w-full h-full flex items-center justify-between relative">
      <LoginBackground />
      <MenuBar />

      <div className="w-full flex justify-start text-white font-bold">
        <div className="w-1/5" />
        {/* 로그인 경우만 해당 텍스트 표시 */}
        {mode == 'login' && (
          <div className="w-2/5 text-5xl flex flex-col gap-3">
            <h2 className="text-3xl">여기가 수도권</h2>
            <div>-</div>
            <div>Welcome</div>
            <div>Don't have an account?</div>
            <button
              type="button"
              className="inline-flex text-orange-400 justify-center items-center px-8 py-3 mt-4 text-base bg-gray-100 border-0 rounded-3xl w-80"
            >
              SIGN UP
            </button>
          </div>
        )}
      </div>
      <div className="w-2/5">
        {/* 로그인 폼 */}
        <div className="flex">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl">LOGIN</h2>
            <input
              type="text"
              className="items-center px-8 py-3 mt-4 text-base text-black outline-orange-300 bg-gray-100 border-0 rounded-3xl w-80 focus-visible:outline-none"
              placeholder="Email"
            />
            <input
              type="password"
              className="items-center text-black px-8 py-3 mt-4 text-base outline-orange-300 bg-gray-100 border-0 rounded-3xl w-80 focus-visible:outline-none"
              placeholder="password"
            />
            <button
              type="button"
              className="inline-flex text-white justify-center items-center px-8 py-3 mt-4 text-base bg-orange-400 border-0 rounded-3xl w-80"
            >
              LOGIN
            </button>
          </div>
        </div>
        {/* 회원가입 폼 */}
        <div className="flex">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl">LOGIN</h2>
            <input
              type="text"
              className="items-center px-8 py-3 mt-4 text-base text-black outline-orange-300 bg-gray-100 border-0 rounded-3xl w-80 focus-visible:outline-none"
              placeholder="Email"
            />
            <input
              type="password"
              className="items-center text-black px-8 py-3 mt-4 text-base outline-orange-300 bg-gray-100 border-0 rounded-3xl w-80 focus-visible:outline-none"
              placeholder="password"
            />
            <button
              type="button"
              className="inline-flex text-white justify-center items-center px-8 py-3 mt-4 text-base bg-orange-400 border-0 rounded-3xl w-80"
            >
              LOGIN
            </button>
          </div>
        </div>
        {/* Email 전송 폼 */}
        <div className="flex">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-3xl">Email Verification</h2>
            <input
              type="text"
              className="items-center px-8 py-3 mt-4 text-base text-black outline-orange-300 bg-gray-100 border-0 rounded-3xl w-80 focus-visible:outline-none"
              placeholder="인증 코드"
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
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
