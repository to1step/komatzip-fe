import Cookies from 'js-cookie';

// 쿠키 삭제하기
export const removeCookie = () => {
  Cookies.remove('refresh_token');
  Cookies.remove('Authorization');
};
