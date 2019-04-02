import { SET_GROUPS, SET_GROUP_STUDENTS } from '../constants/actions';

const initalState = [];

export default (state = initalState, { type, payload }) => {
  switch (type) {
    case SET_GROUPS:
      return payload.data;
    case SET_GROUP_STUDENTS:
      return state.map((group) => {
        if (group._id === payload.classId) {
          return {
            ...group,
            students: payload.students
          };
        }
        return group;
      });
    default:
      return state;
  }
};
