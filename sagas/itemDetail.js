import { takeEvery, call, put, all } from 'redux-saga/effects';
import { testItemsApi } from '@edulastic/api';
import { message } from 'antd';

import {
  RECEIVE_ITEM_DETAIL_REQUEST,
  RECEIVE_ITEM_DETAIL_SUCCESS,
  RECEIVE_ITEM_DETAIL_ERROR,
  UPDATE_ITEM_DETAIL_REQUEST,
  UPDATE_ITEM_DETAIL_SUCCESS,
  UPDATE_ITEM_DETAIL_ERROR
} from '../constants/actions';

function* receiveItemSaga({ payload }) {
  try {
    const item = yield call(testItemsApi.getById, payload.id, payload.params);
    yield put({
      type: RECEIVE_ITEM_DETAIL_SUCCESS,
      payload: { item }
    });
  } catch (err) {
    const errorMessage = 'Receive item by id is failing';
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_ITEM_DETAIL_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export function* updateItemSaga({ payload }) {
  try {
    // avoid data part being put into db
    delete payload.data.data;
    const item = yield call(testItemsApi.updateById, payload.id, payload.data);

    yield put({
      type: UPDATE_ITEM_DETAIL_SUCCESS,
      payload: { item }
    });
    yield call(message.success, 'Update item by id is success', 'Success');
  } catch (err) {
    console.error(err);
    const errorMessage = 'Update item by id is failing';
    yield call(message.error, errorMessage);
    yield put({
      type: UPDATE_ITEM_DETAIL_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export default function* watcherSaga() {
  yield all([
    yield takeEvery(RECEIVE_ITEM_DETAIL_REQUEST, receiveItemSaga),
    yield takeEvery(UPDATE_ITEM_DETAIL_REQUEST, updateItemSaga)
  ]);
}
