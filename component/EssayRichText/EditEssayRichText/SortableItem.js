import React from 'react';
import styled from 'styled-components';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import { FaBars } from 'react-icons/fa';

import { blue, white, black, dashBorderColor, green } from '@edulastic/colors';
import { FlexContainer } from '@edulastic/common';

const DragHandle = SortableHandle(() => (
  <QlBlocks>
    <FlexContainer style={{ fontSize: 14, color: green }} justifyContent="center">
      <FaBars />
    </FlexContainer>
  </QlBlocks>
));

const SortableItem = SortableElement(({ item, i, handleActiveChange, validList }) => {
  const { value, param, active } = item;

  return (
    <FlexCon padding={0} childMarginRight={0} flexDirection="column">
      {value !== '|' ? (
        <QlBlocks
          active={active}
          onClick={(e) => {
            e.preventDefault();
            handleActiveChange(i);
          }}
          {...(validList.includes(value) ? { value: param } : {})}
          className={`ql-${value}`}
          type="button"
        />
      ) : (
        <QlBlocks
          active={active}
          onClick={(e) => {
            e.preventDefault();
            handleActiveChange(i);
          }}
          {...(validList.includes(value) ? { value: param } : {})}
          className={`ql-${value}`}
          type="button"
        >
          <div>
            <b style={{ fontSize: 16 }}>{value}</b>DIV
          </div>
        </QlBlocks>
      )}

      <DragHandle />
    </FlexCon>
  );
});

export default SortableItem;

const QlBlocks = styled.button`
  display: block !important;
  width: 40px !important;
  height: 40px !important;
  background: ${({ active }) => (active ? blue : white)}!important;
  .ql-stroke.ql-fill,
  .ql-stroke.ql-thin,
  .ql-fill,
  .ql-thin {
    fill: ${({ active }) => (active ? white : black)}!important;
  }

  color: ${({ active }) => (active ? white : black)}!important;
  .ql-stroke {
    stroke: ${({ active }) => (active ? white : black)}!important;
  }
`;

const FlexCon = styled(FlexContainer)`
  border-radius: 4px;
  & > *:first-child {
    border-top-left-radius: 4px !important;
    border-top-right-radius: 4px !important;
  }
  & > *:last-child {
    border-top: 1px solid ${dashBorderColor}!important;
    border-bottom-left-radius: 4px !important;
    border-bottom-right-radius: 4px !important;
  }
  border: 1px solid ${dashBorderColor};
  & > ${QlBlocks} {
    padding: ${({ padding }) => (padding !== undefined ? '3px 5px' : padding)}!important;
  }
  & > button {
    &:focus {
      outline: none !important;
    }
    border: none !important;
    padding: 3px 5px !important;
    svg {
      height: auto !important;
    }
    .ql-stroke {
      fill: none;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 2;
    }
    .ql-stroke.ql-thin {
      stroke-width: 1;
    }
  }
`;
