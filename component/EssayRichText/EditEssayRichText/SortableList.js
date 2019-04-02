import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

import styled from 'styled-components';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ items, handleActiveChange, validList }) => (
  <QlFormats className="ql-formats">
    {items.map((value, index) => (
      <SortableItem
        item={value}
        i={index}
        index={index}
        validList={validList}
        handleActiveChange={handleActiveChange}
        key={value.id}
      />
    ))}
  </QlFormats>
));

export default SortableList;

const QlFormats = styled.span`
  display: flex !important;
  flex-wrap: wrap !important;

  & > * {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 20px;
  }
  & > *:last-child {
    margin-right: 0;
  }
`;
