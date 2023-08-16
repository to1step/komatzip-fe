import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.to1step.shop',
});

axiosInstance.interceptors.response.use((response) => {
    const data = response.data.data;
    return data;
}, (error) => {
    console.error('에러 발생:', error);
    return Promise.reject(error);
});

export default axiosInstance;