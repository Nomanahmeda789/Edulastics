import { takeEvery, call, put, all, select } from 'redux-saga/effects';
import { assignmentApi } from '@edulastic/api';
import { getTestSelector } from '../selectors/tests';
import { getUserIdSelector } from '../selectors/user';

import {
  ADD_ASSIGNMENT,
  SET_ASSIGNMENT,
  UPDATE_ASSIGNMENT,
  UPDATE_SET_ASSIGNMENT,
  FETCH_ASSIGNMENTS,
  LOAD_ASSIGNMENTS,
  DELETE_ASSIGNMENT,
  REMOVE_ASSIGNMENT
} from '../constants/actions';

function* assignmentTestsSaga({ payload }) {
  try {
    const userId = yield select(getUserIdSelector);
    const obj = {
      ...payload.data,
      assignedBy: {
        id: userId
      }
    };

    // FIXME: move it out

    const group = yield select(state => state.group);
    const students = obj.specificStudents && obj.students;

    // if(students) {
    //   group
    // }

    if (obj.specificStudents === false) {
      obj.students = [];
    }
    const data = yield call(assignmentApi.create, obj);

    yield put({
      type: SET_ASSIGNMENT,
      payload: { obj: data }
    });
  } catch (err) {
    console.error(err);
  }
}

function* updateassignmentTestsSaga({ payload }) {
  try {
    const userId = yield select(getUserIdSelector);
    const obj = {
      ...payload.data,
      assignedBy: {
        id: userId
      }
    };

    if (obj.specificStudents === false) {
      obj.students = [];
    }

    const { id } = obj;
    delete obj.key;
    delete obj.id;

    const data = yield call(assignmentApi.update, id, obj);
    yield put({
      type: UPDATE_SET_ASSIGNMENT,
      payload: { data, id }
    });
  } catch (err) {
    console.error(err);
  }
}

// load assignments
function* loadAssignments() {
  try {
    const { _id: testId } = yield select(getTestSelector);
    const data = yield call(assignmentApi.fetchAssignments, testId);
    yield put({
      type: LOAD_ASSIGNMENTS,
      payload: { data }
    });
  } catch (e) {
    console.error(e);
  }
}

// delete assignment
function* deleteAssignment({ payload: { id } }) {
  try {
    yield assignmentApi.remove(id);
    yield put({
      type: REMOVE_ASSIGNMENT,
      payload: {
        id
      }
    });
  } catch (e) {
    console.log(e);
  }
}

// watcher saga
export default function* watcherSaga() {
  yield all([
    yield takeEvery(ADD_ASSIGNMENT, assignmentTestsSaga),
    yield takeEvery(UPDATE_ASSIGNMENT, updateassignmentTestsSaga),
    yield takeEvery(FETCH_ASSIGNMENTS, loadAssignments),
    yield takeEvery(DELETE_ASSIGNMENT, deleteAssignment)
  ]);
}
