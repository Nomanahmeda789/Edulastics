import { createSelector } from 'reselect';
import { get } from 'lodash';

export const stateSelector = state => state.testItems;

export const getTestItemsSelector = createSelector(
  stateSelector,
  state => state.items
);
export const getTestsItemsCountSelector = createSelector(
  stateSelector,
  state => state.count
);
export const getTestsItemsPageSelector = createSelector(
  stateSelector,
  state => state.page
);
export const getTestsItemsLimitSelector = createSelector(
  stateSelector,
  state => state.limit
);
export const getTestItemsLoadingSelector = createSelector(
  stateSelector,
  state => state.loading
);
export const getSelectedItemSelector = createSelector(
  stateSelector,
  state => state.selectedItems
);

export const getItemsTypesSelector = createSelector(
  getTestItemsSelector,
  (state) => {
    const result = {};

    state.forEach((item) => {
      const types = item.rows.reduce(
        (acc, row) => [...acc, ...row.widgets.map(({ type }) => type)],
        []
      );

      result[item._id] = [...new Set(types)];
    });

    return result;
  }
);

export const getStandardsSelector = createSelector(
  getTestItemsSelector,
  (state) => {
    const result = {};

    state.forEach((item) => {
      const tags = get(item, 'data.questions', []).reduce((acc, question) => {
        const t = get(question, 'standardsMap.domains', []).reduce(
          (r, { standards }) => [...r, ...standards.map(s => s.name)],
          []
        );
        return [...acc, ...t];
      }, []);

      result[item._id] = tags;
    });

    return result;
  }
);
