import { Action } from 'redux';

interface UpdateLocationAction extends Action {
  type: 'UPDATE_LOCATION';
  payload: string; // payload 타입 맞는지 확인
}

const initialState = {
  location: '',
};

type LocationState = typeof initialState;

const locationReducer = (
  state: LocationState = initialState,
  action: UpdateLocationAction,
) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return {
        ...state,
        location: action.payload,
      };

    default:
      return state;
  }
};

export default locationReducer;
