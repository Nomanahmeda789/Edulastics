import {
  RECEIVE_STUDENTRESPONSES_REQUEST,
  RECEIVE_STUDENTRESPONSES_SUCCESS,
  RECEIVE_STUDENTRESPONSES_ERROR
} from '../constants/actions';


const initialState = {
  entities: {},
  error: null,
  loading: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_STUDENTRESPONSES_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_STUDENTRESPONSES_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: payload.entities
      };
    case RECEIVE_STUDENTRESPONSES_ERROR:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};

export default reducer;
