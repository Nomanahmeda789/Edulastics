import {
  RECEIVE_TEST_ITEMS_REQUEST,
  RECEIVE_TEST_ITEMS_SUCCESS,
  RECEIVE_TEST_ITEMS_ERROR,
  SET_TEST_ITEMS_REQUEST
} from '../constants/actions';

const initialState = {
  items: [],
  error: null,
  loading: false,
  page: 1,
  limit: 10,
  count: 0
};

const itemsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_TEST_ITEMS_REQUEST:
      return { ...state, loading: true };
    case RECEIVE_TEST_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: payload.items,
        count: payload.count,
        page: payload.page,
        limit: payload.limit
      };
    case RECEIVE_TEST_ITEMS_ERROR:
      return { ...state, loading: false, error: payload.error };
    case SET_TEST_ITEMS_REQUEST:
      return {
        ...state,
        selectedItems: payload
      };
    default:
      return state;
  }
};

export default itemsReducer;
