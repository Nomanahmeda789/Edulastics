import { FETCH_GROUPS, FETCH_GROUP_STUDENTS } from '../constants/actions';

export const fetchGroupsAction = () => ({
  type: FETCH_GROUPS
});

export const fetchStudentsOfGroupAction = data => ({
  type: FETCH_GROUP_STUDENTS,
  payload: {
    ...data
  }
});
