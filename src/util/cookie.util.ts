import Cookies from 'js-cookie';

// 쿠키 삭제하기
export const removeCookie = () => {
  Cookies.remove('refresh_token');
  Cookies.remove('Authorization');
};

export const getToken = () => {
  const refresh_token = Cookies.get('refresh_token');
  return refresh_token;
};
