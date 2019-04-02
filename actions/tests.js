import {
  RECEIVE_TESTS_REQUEST,
  CREATE_TEST_REQUEST,
  RECEIVE_TEST_BY_ID_REQUEST,
  SET_TEST_DATA,
  UPDATE_TEST_REQUEST,
  SET_DEFAULT_TEST_DATA,
  SET_MAX_ATTEMPT
} from '../constants/actions';

export const receiveTestsAction = payload => ({
  type: RECEIVE_TESTS_REQUEST,
  payload
});

export const receiveTestByIdAction = id => ({
  type: RECEIVE_TEST_BY_ID_REQUEST,
  payload: { id }
});

export const createTestAction = data => ({
  type: CREATE_TEST_REQUEST,
  payload: { data }
});

export const updateTestAction = (id, data) => ({
  type: UPDATE_TEST_REQUEST,
  payload: { id, data }
});

export const setTestDataAction = data => ({
  type: SET_TEST_DATA,
  payload: { data }
});

export const setDefaultTestDataAction = () => ({
  type: SET_DEFAULT_TEST_DATA
});

export const setMaxAttemptsAction = data => ({
  type: SET_MAX_ATTEMPT,
  payload: { data }
});
