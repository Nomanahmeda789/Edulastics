import { takeEvery, call, put, all, select } from 'redux-saga/effects';
import { questionsApi, testItemsApi } from '@edulastic/api';
import { message } from 'antd';
import uuid from 'uuid/v4';
import { history } from '../../../configureStore';
import {
  RECEIVE_QUESTION_REQUEST,
  RECEIVE_QUESTION_SUCCESS,
  RECEIVE_QUESTION_ERROR,
  SAVE_QUESTION_REQUEST,
  SAVE_QUESTION_ERROR,
  LOAD_QUESTION,
  SET_QUESTION_DATA,
  UPDATE_ITEM_DETAIL_SUCCESS
} from '../constants/actions';
import { getQuestionSelector } from '../selectors/question';
import { getItemDetailSelector } from '../selectors/itemDetail';

function* receiveQuestionSaga({ payload }) {
  try {
    const entity = yield call(questionsApi.getById, payload.id);

    yield put({
      type: RECEIVE_QUESTION_SUCCESS,
      payload: { entity }
    });
  } catch (err) {
    console.error(err);
    const errorMessage = 'Receive question is failing';
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_QUESTION_ERROR,
      payload: { error: errorMessage }
    });
  }
}

function* saveQuestionSaga() {
  try {
    const { data: question } = yield select(getQuestionSelector);
    const itemDetail = yield select(getItemDetailSelector);
    const { rowIndex, tabIndex } = history.location.state || {};

    const { id } = question;
    // if id is already present, its an update
    // else a new question
    const isUpdate = !!id;

    const entity = {
      id: id || uuid(),
      ...question
    };

    if (itemDetail && itemDetail.rows) {
      // if update
      if (isUpdate) {
        let { widgets } = itemDetail.rows[rowIndex];
        widgets = widgets.map((widget) => {
          if (widget.entity.id === entity.id) {
            widget.entity = entity;
            return widget;
          }
          return widget;
        });

        itemDetail.rows[rowIndex].widgets = widgets;
      } else {
        // if new entity
        itemDetail.rows[rowIndex].widgets.push({
          widgetType: 'question',
          type: entity.type,
          title: 'Multiple choice',
          entity,
          tabIndex
        });
      }
    }

    delete itemDetail.data;
    const item = yield call(
      testItemsApi.updateById,
      itemDetail._id,
      itemDetail
    );

    yield put({
      type: UPDATE_ITEM_DETAIL_SUCCESS,
      payload: { item }
    });

    yield call(message.success, 'Update item by id is success', 'Success');

    if (itemDetail) {
      yield call(history.push, {
        pathname: `/author/items/${itemDetail._id}/item-detail`,
        state: {
          backText: 'Back to item list',
          backUrl: '/author/items',
          itemDetail: false
        }
      });
    }
  } catch (err) {
    console.error(err);
    const errorMessage = 'Save question is failing';
    yield call(message.error, errorMessage);
    yield put({
      type: SAVE_QUESTION_ERROR,
      payload: { error: errorMessage }
    });
  }
}

function* loadQuestionSaga({ payload }) {
  try {
    const { data, rowIndex } = payload;
    yield put({
      type: SET_QUESTION_DATA,
      payload: {
        data: data.entity
      }
    });

    const { pathname } = history.location.pathname;

    yield call(history.push, {
      pathname: '/author/questions/edit',
      state: {
        backText: 'question edit  ',
        backUrl: pathname,
        rowIndex
      }
    });
  } catch (e) {
    console.error(e);
    const errorMessage = 'Loading Question is failing';
    yield call(message.error, errorMessage);
  }
}

export default function* watcherSaga() {
  yield all([
    yield takeEvery(RECEIVE_QUESTION_REQUEST, receiveQuestionSaga),
    yield takeEvery(SAVE_QUESTION_REQUEST, saveQuestionSaga),
    yield takeEvery(LOAD_QUESTION, loadQuestionSaga)
  ]);
}
