import {
  RECEIVE_TEST_ITEMS_REQUEST,
  SET_TEST_ITEMS_REQUEST
} from '../constants/actions';

export const receiveTestItemsAction = (search, page, limit) => ({
  type: RECEIVE_TEST_ITEMS_REQUEST,
  payload: {
    search,
    page,
    limit
  }
});

export const setTestItemsAction = data => ({
  type: SET_TEST_ITEMS_REQUEST,
  payload: { data }
});
