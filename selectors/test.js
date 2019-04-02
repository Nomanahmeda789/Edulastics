import { createSelector } from 'reselect';
import { cloneDeep, get } from 'lodash';
import { questionType } from '@edulastic/constants';
import { getAnswersListSelector } from './answers';

const { ESSAY_RICH_TEXT, ESSAY_PLAIN_TEXT, HIGHLIGHT_IMAGE } = questionType;
const stateSelector = state => state.test;

export const currentItemIndexSelector = createSelector(
  stateSelector,
  state => state.currentItem
);

export const itemsSelector = createSelector(
  stateSelector,
  state => state.items
);

export const currentItemSelector = createSelector(
  itemsSelector,
  currentItemIndexSelector,
  (items, index) => items[index]
);

export const currentQuestions = createSelector(
  currentItemSelector,
  (item) => {
    const rows = Array.isArray(item.rows) ? item.rows : [];
    return rows.reduce((acc, row) => {
      const widgets = Array.isArray(row.widgets) ? row.widgets : [];
      return [...acc, ...widgets];
    }, []);
  }
);

export const answersForCheck = createSelector(
  getAnswersListSelector,
  currentQuestions,
  (answers, questions) => {
    const newAnswers = cloneDeep(answers);
    const types = [ESSAY_RICH_TEXT, ESSAY_PLAIN_TEXT, HIGHLIGHT_IMAGE];

    Object.keys(newAnswers).forEach((key) => {
      const question = questions.find(({ entity }) => entity.id === key);
      const type = get(question, 'entity.type');

      if (question && types.includes(type)) {
        delete newAnswers[key];
      }
    });

    return newAnswers;
  }
);

export const itemQuestionsSelector = createSelector(
  currentItemSelector,
  (item) => {
    const questions = [];
    item.rows.forEach((row) => {
      row.widgets.forEach((widget) => {
        const qid = widget.entity && widget.entity.id;
        questions.push(qid);
      });
    });
    return questions;
  }
);
