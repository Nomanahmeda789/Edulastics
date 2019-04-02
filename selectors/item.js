import { createSelector } from 'reselect';

export const stateSelector = state => state.test;
export const getItemsSelector = createSelector(stateSelector, state => state.items);

export const currentItemIndexSelector = createSelector(stateSelector, state => state.currentItem);

export const currentItemRowsSelector = createSelector(
  getItemsSelector,
  currentItemIndexSelector,
  (items, currentIndex) => {
    const item = items[currentIndex];
    if (!item) return [];
    return item.rows.map(row => ({
      ...row,
      widgets: row.widgets.map((widget) => {
        let referencePopulate = {
          data: null,
        };

        if (item.data.questions && item.data.questions.length) {
          referencePopulate = item.data.questions.find(q => q._id === widget.reference);
        }

        if (!referencePopulate && item.data.resources && item.data.resources.length) {
          referencePopulate = item.data.resources.find(r => r._id === widget.reference);
        }

        return {
          ...widget,
          referencePopulate,
        };
      }),
    }));
  },
);
