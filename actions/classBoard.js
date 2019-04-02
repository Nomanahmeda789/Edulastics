import {
  RECEIVE_GRADEBOOK_REQUEST,
  RECEIVE_TESTACTIVITY_REQUEST
} from '../constants/actions';

export const receiveGradeBookdAction = (assignmentId, classId) => ({
  type: RECEIVE_GRADEBOOK_REQUEST,
  payload: { assignmentId, classId }
});
export const receiveTestActivitydAction = (assignmentId, classId) => ({
  type: RECEIVE_TESTACTIVITY_REQUEST,
  payload: { assignmentId, classId }
});
