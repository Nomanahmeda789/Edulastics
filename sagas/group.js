import { takeEvery, call, put, all } from 'redux-saga/effects';
import { groupApi, enrollmentApi } from '@edulastic/api';
import {
  FETCH_GROUPS,
  SET_GROUPS,
  FETCH_GROUP_STUDENTS,
  SET_GROUP_STUDENTS
} from '../constants/actions';

function* loadGroups() {
  try {
    const data = yield call(groupApi.fetchMyGroups);
    yield put({
      type: SET_GROUPS,
      payload: { data }
    });
  } catch (err) {
    console.log(err);
  }
}

// closure can be lovely little cache  😚
const fetchStudents = () => {
  const groupIdCache = [];
  return function* ({ payload }) {
    try {
      const { classId } = payload;
      if (groupIdCache.includes(classId)) {
        return;
      }

      const students = yield call(enrollmentApi.fetch, classId);
      groupIdCache.push(classId);
      yield put({
        type: SET_GROUP_STUDENTS,
        payload: { students, classId }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export default function* watcherSaga() {
  yield all([
    yield takeEvery(FETCH_GROUPS, loadGroups),
    yield takeEvery(FETCH_GROUP_STUDENTS, fetchStudents())
  ]);
}
