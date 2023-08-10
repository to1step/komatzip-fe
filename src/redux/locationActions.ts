// 현재 위치 주소 정보를 받아 store에 위치 업데이트
export const updateLocation = (location: string) => {
  return {
    type: 'UPDATE_LOCATION',
    payload: location,
  };
};
