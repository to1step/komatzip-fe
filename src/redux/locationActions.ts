export const updateLocation = (location: string) => {
  return {
    type: 'UPDATE_LOCATION',
    payload: location,
  };
};
