import { takeEvery, call, put, all } from 'redux-saga/effects';
import { testItemsApi } from '@edulastic/api';
import { message } from 'antd';

import {
  RECEIVE_TEST_ITEMS_REQUEST,
  RECEIVE_TEST_ITEMS_SUCCESS,
  RECEIVE_TEST_ITEMS_ERROR
} from '../constants/actions';

function* receiveTestItemsSaga({ payload: { search = {}, page = 1, limit = 10 } }) {
  try {
    const { items, count } = yield call(testItemsApi.getAll, {
      search,
      page,
      limit
    });
    yield put({
      type: RECEIVE_TEST_ITEMS_SUCCESS,
      payload: {
        items,
        count,
        page,
        limit
      }
    });
  } catch (err) {
    console.error(err);
    const errorMessage = 'Receive items is failing';
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_TEST_ITEMS_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export default function* watcherSaga() {
  yield all([
    yield takeEvery(RECEIVE_TEST_ITEMS_REQUEST, receiveTestItemsSaga)
  ]);
}
