import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error('🌼axiosInstance.request에서 에러 발생', error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const navigate = useNavigate();

    if (error.response && error.response.statues === 1101) {
      // 토큰 만료 시 '/v1/auth/refresh-token'으로 토큰을 갱신하는 요청
      try {
        const refreshResponse = await axiosInstance.post(
          '/v1/auth/refresh-token',
          {
            grant_type: 'refresh_token',
          },
        );
        // 갱신에 성공하면 원래의 요청을 다시 시도
        const newAccessToken = refreshResponse.data.access_token;
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(error.config);
      } catch (refreshTokenError) {
        console.log('🌼 토큰 갱신 실패:', refreshTokenError);
        navigate('/login');
        return Promise.reject(refreshTokenError);
      }
    }
    console.error('🌼 axiosInstance.response에서 에러 발생:', error);
    return Promise.reject(error);
  },
);

// TODO: get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
// 타입 커스텀 해야함

export default axiosInstance;
