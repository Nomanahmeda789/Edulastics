import { createSelector } from 'reselect';
import { get, groupBy, forEach } from 'lodash';

export const stateSelector = state => state.tests;

export const getTestsSelector = createSelector(
  stateSelector,
  state => state.entities
);
export const getTestSelector = createSelector(
  stateSelector,
  state => state.entity
);
export const getScoringSelector = createSelector(
  getTestSelector,
  state => state.scoring
);
export const getTestsLoadingSelector = createSelector(
  stateSelector,
  state => state.loading
);
export const getTestsCreatingSelector = createSelector(
  stateSelector,
  state => state.creating
);
export const getTestsPageSelector = createSelector(
  stateSelector,
  state => state.page
);
export const getTestsLimitSelector = createSelector(
  stateSelector,
  state => state.limit
);
export const getMaxAttemptSelector = createSelector(
  stateSelector,
  state => state.entity.maxAttempts
);
export const getTestsCountSelector = createSelector(
  stateSelector,
  state => state.count
);

export const getTestItemsRowsSelector = createSelector(
  getTestSelector,
  test =>
    test.testItems.map((item) => {
      if (!item || !item.rows) return [];
      return item.rows.map(row => ({
        ...row,
        widgets: row.widgets.map((widget) => {
          let referencePopulate = {
            data: null
          };

          if (item.data && item.data.questions && item.data.questions.length) {
            referencePopulate = item.data.questions.find(
              q => q._id === widget.reference
            );
          }

          if (
            !referencePopulate &&
            item.data &&
            item.data.resources &&
            item.data.resources.length
          ) {
            referencePopulate = item.data.resources.find(
              r => r._id === widget.reference
            );
          }

          return {
            ...widget,
            referencePopulate
          };
        })
      }));
    })
);

export const getSummarySelector = createSelector(
  getTestSelector,
  getScoringSelector,
  (state, scoring) => {
    const reduceTestItems = (acc, testItem) => {
      const questions = get(testItem, 'data.questions', []);
      const res = questions.map((q) => {
        const item = scoring.testItems.find(({ id }) => testItem._id === id);
        const score = item && item.points ? item.points : 0;

        return {
          id: q._id,
          score,
          standards: get(q, 'standardsMap.domains', []).reduce(
            (st, domain) => [...st, ...domain.standards],
            []
          )
        };
      });

      acc.push(res);
      return acc;
    };

    const toQuestions = (acc, question) => [...acc, ...question];

    const toResult = (acc, question) => [
      ...acc,
      ...question.standards.map(standard => ({
        score: question.score || 0,
        id: question._id,
        standard
      }))
    ];

    const testItems = state.testItems.reduce(reduceTestItems, []);
    const questions = testItems.reduce(toQuestions, []);

    const groupedResult = groupBy(
      questions.reduce(toResult, []),
      item => item.standard.name
    );

    const result = [];

    forEach(groupedResult, (value, key) => {
      result.push({
        standard: key,
        questionsCount: value.length,
        score: value.reduce((acc, item) => acc + +item.score, 0)
      });
    });

    return result;
  }
);
