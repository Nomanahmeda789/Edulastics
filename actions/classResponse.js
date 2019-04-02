import {
  RECEIVE_CLASSRESPONSES_REQUEST,
  RECEIVE_STUDENTRESPONSES_REQUEST,
  RECEIVE_FEEDBACKRESPONSES_REQUEST
} from '../constants/actions';

export const receiveClassResponseAction = data => ({
  type: RECEIVE_CLASSRESPONSES_REQUEST,
  payload: { data }
});

export const receiveStudentResponseAction = data => ({
  type: RECEIVE_STUDENTRESPONSES_REQUEST,
  payload: { data }
});

export const receiveFeedbackResponseAction = data => ({
  type: RECEIVE_FEEDBACKRESPONSES_REQUEST,
  payload: { data }
});
