import {
  RECEIVE_CLASSRESPONSES_REQUEST,
  RECEIVE_CLASSRESPONSES_SUCCESS,
  RECEIVE_CLASSRESPONSES_ERROR
} from '../constants/actions';


const initialState = {
  entities: {},
  error: null,
  loading: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_CLASSRESPONSES_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_CLASSRESPONSES_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: payload.entities
      };
    case RECEIVE_CLASSRESPONSES_ERROR:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};

export default reducer;
