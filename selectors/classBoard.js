import { createSelector } from 'reselect';

export const stateGradeBookSelector = state => state.author_classboard_gradebook;
export const stateTestActivitySelector = state => state.author_classboard_testActivity;

export const getGradeBookSelector = createSelector(
  stateGradeBookSelector,
  state => state.entities
);
export const getTestActivitySelector = createSelector(
  stateTestActivitySelector,
  state => state.entities
);
