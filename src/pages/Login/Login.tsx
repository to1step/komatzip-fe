import LoginBackground from '../../components/background/LoginBackground';
import MenuBar from '../../components/background/MenuBar';
import axiosInstance from '../../api/apiInstance';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserMyInfo, loginAction } from '../../redux/module/user';
import { useDispatch } from 'react-redux';
import { errors } from '../../util/toastify';

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<LoginForm>();

  const onLogin = async (data: LoginForm) => {
    try {
      await axiosInstance.post('/v1/auth/local/sign-in', {
        email: data.email,
        password: data.password,
      });

      const { data: myInfo } = await axiosInstance.get<UserMyInfo>(
        '/v1/users/me',
      );
      dispatch(loginAction(myInfo));
      navigate('/');
    } catch (error) {
      errors('아이디 또는 비밀번호를 잘못 입력하셨습니다.');
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <LoginBackground />
      <MenuBar />

      <section className="hidden md:flex justify-start text-white font-bold">
        <div className="w-1/5" />
        <div className="w-2/5 text-5xl flex flex-col gap-3">
          <h2 className="text-4xl">여기가 수도권</h2>
          <div>-</div>
          <div>Welcome</div>
          <div>Don't have an account?</div>
          <div>
            <button
              type="button"
              className="invisible md:visible inline-flex text-orange-400 justify-center items-center px-8 py-3 mt-4 text-base bg-gray-100 border-0 rounded-3xl w-80"
              onClick={() => navigate('/signup')}
            >
              SIGN UP
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center mt-10">
        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit(onLogin)} className="m-10">
          <div className="flex">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-4xl font-bold visible md:invisible">
                여기가 수도권
              </h2>
              <div className="text-4xl visible md:invisible">-</div>
              <h2 className="text-3xl">LOGIN</h2>
              <input
                type="text"
                className="items-center px-8 py-3 mt-4 text-base text-black outline-orange-300 bg-gray-100 border-0 rounded-3xl w-80 focus-visible:outline-none"
                placeholder="Email"
                {...register('email', { required: true })}
              />
              <input
                type="password"
                className="items-center text-black px-8 py-3 mt-4 text-base outline-orange-300 bg-gray-100 border-0 rounded-3xl w-80 focus-visible:outline-none"
                placeholder="password"
                {...register('password', { required: true })}
              />
              <button
                type="submit"
                className="inline-flex text-white justify-center items-center px-8 py-3 mt-4 text-base bg-orange-400 border-0 rounded-3xl w-80"
              >
                LOGIN
              </button>
            </div>
          </div>
          <button
            type="button"
            className="visible md:invisible inline-flex text-orange-400 justify-center items-center px-8 py-3 mt-4 text-base bg-gray-100 border-0 rounded-3xl w-80"
            onClick={() => navigate('/signup')}
          >
            SIGN UP
          </button>
        </form>
      </section>
    </div>
  );
};

export default Login;
