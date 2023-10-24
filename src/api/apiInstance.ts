import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    const data = response.data;
    return data;
  },
  (error) => {
    console.error('axiosInstance에서 에러 발생:', error);
    return Promise.reject(error);
  },
);

// TODO: get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
// 타입 커스텀 해야함

export default axiosInstance;
