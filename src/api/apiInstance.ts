import axios from 'axios';
import { getToken } from '../util/cookie.util';

console.log('import.meta.env.VITE_PUBLIC_API', import.meta.env.VITE_PUBLIC_API);
console.log('process.env.VITE_PUBLIC_API', process.env.VITE_PUBLIC_API);
const axiosInstance = axios.create({
  baseURL: 'https://komatzip.wo.tc/api' ?? 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log('config', config);
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
    if (error.response && error.response.data.code === 1101) {
      // 토큰 만료 시 '/api/v1/auth/refresh-token'으로 토큰을 갱신하는 요청
      try {
        const refresh_token = getToken();
        const refreshResponse = await axiosInstance.post(
          '/v1/auth/refresh-token',
          {
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
          },
        );
        // 갱신에 성공하면 원래의 요청을 다시 시도
        const newAccessToken = refreshResponse.data.access_token;
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(error.config);
      } catch (refreshTokenError) {
        console.log('🌼 토큰 갱신 실패:', refreshTokenError);
        window.location.href = '/login';
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
