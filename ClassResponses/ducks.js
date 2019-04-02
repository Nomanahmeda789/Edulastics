import { takeEvery, call, put, all } from 'redux-saga/effects';
import { classResponseApi } from '@edulastic/api';
import { message } from 'antd';
import { createSelector } from 'reselect';

import {
  RECEIVE_CLASSRESPONSES_REQUEST,
  RECEIVE_CLASSRESPONSES_SUCCESS,
  RECEIVE_CLASSRESPONSES_ERROR,
  RECEIVE_STUDENTRESPONSES_REQUEST,
  RECEIVE_STUDENTRESPONSES_SUCCESS,
  RECEIVE_STUDENTRESPONSES_ERROR,
  RECEIVE_FEEDBACKRESPONSES_REQUEST,
  RECEIVE_FEEDBACKRESPONSES_SUCCESS,
  RECEIVE_FEEDBACKRESPONSES_ERROR 

} from '../constants/actions';

function* receiveClassResponseSaga({ payload }) {
  try {
    const entities = yield call(classResponseApi.classresponse, payload);

    yield put({
      type: RECEIVE_CLASSRESPONSES_SUCCESS,
      payload: { entities }
    });
  } catch (err) {
    const errorMessage = 'Receive tests is failing';
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_CLASSRESPONSES_ERROR,
      payload: { error: errorMessage }
    });
  }
}


function* receiveStudentResponseSaga({ payload }) {
  try {
    const entities = yield call(classResponseApi.studentresponse, payload);

    yield put({
      type: RECEIVE_STUDENTRESPONSES_SUCCESS,
      payload: { entities }
    });
  } catch (err) {
    const errorMessage = 'Receive tests is failing';
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_STUDENTRESPONSES_ERROR,
      payload: { error: errorMessage }
    });
  }
}


function* receiveFeedbackResponseSaga({ payload }) {
  try {
    const entities = yield call(classResponseApi.feedbackresponse, payload);

    yield put({
      type: RECEIVE_FEEDBACKRESPONSES_SUCCESS,
      payload: { entities }
    });
  } catch (err) {
    const errorMessage = 'Receive tests is failing';
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_FEEDBACKRESPONSES_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export function* watcherSaga() {
  yield all([
    yield takeEvery(RECEIVE_CLASSRESPONSES_REQUEST, receiveClassResponseSaga),
    yield takeEvery(RECEIVE_STUDENTRESPONSES_REQUEST, receiveStudentResponseSaga),
    yield takeEvery(RECEIVE_FEEDBACKRESPONSES_REQUEST, receiveFeedbackResponseSaga)
  ]);
}


export const stateClassResponseSelector = state => state.author_classresponse;
export const stateStudentResponseSelector = state => state.author_studentresponse;
export const stateFeedbackResponseSelector = state => state.author_feedbackresponse;


export const getClassResponseSelector = createSelector(
  stateClassResponseSelector,
  state => state.entities
);

export const getStudentResponseSelector = createSelector(
  stateStudentResponseSelector,
  state => state.entities
);

export const getFeedbackResponseSelector = createSelector(
  stateFeedbackResponseSelector,
  state => state.entities
);
