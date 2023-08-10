import { Action } from 'redux';

// `UpdateLocationAction`에서 action이 전달될 때 store의 `location`상태 업데이트
interface UpdateLocationAction extends Action {
  type: 'UPDATE_LOCATION';
  payload: string; // payload 타입 맞는지 확인, 업데이트할 위치 정보
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
