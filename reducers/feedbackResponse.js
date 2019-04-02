import {
  RECEIVE_FEEDBACKRESPONSES_REQUEST,
  RECEIVE_FEEDBACKRESPONSES_SUCCESS,
  RECEIVE_FEEDBACKRESPONSES_ERROR
} from '../constants/actions';


const initialState = {
  entities: {},
  error: null,
  loading: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_FEEDBACKRESPONSES_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_FEEDBACKRESPONSES_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: payload.entities
      };
    case RECEIVE_FEEDBACKRESPONSES_ERROR:
      return { ...state, loading: false, error: payload.error };
    default:
      return state;
  }
};

export default reducer;
