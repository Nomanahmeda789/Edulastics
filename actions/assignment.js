import {
  ADD_ASSIGNMENT,
  SET_ASSIGNMENT,
  FETCH_ASSIGNMENTS,
  UPDATE_ASSIGNMENT,
  DELETE_ASSIGNMENT
} from '../constants/actions';

export const addAssignmentAction = data => ({
  type: ADD_ASSIGNMENT,
  payload: { data }
});

export const setAssignmentAction = data => ({
  type: SET_ASSIGNMENT,
  payload: { data }
});

export const updateAssignmentAction = data => ({
  type: UPDATE_ASSIGNMENT,
  payload: { data }
});

export const fetchAssignmentsAction = () => ({
  type: FETCH_ASSIGNMENTS
});


export const deleteAssignmentAction = id => ({
  type: DELETE_ASSIGNMENT,
  payload: { id }
});
