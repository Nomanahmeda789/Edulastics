import React from 'react';
import PropTypes from 'prop-types';

import { white } from '@edulastic/colors';
import { CenteredText } from '@edulastic/common';

import styled from 'styled-components';
import { DropContainer } from '../../common';
import DragItem from '../DragItem';

const styles = {
  columnContainerStyle: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '70px 50px',
    height: '100%',
    borderRadius: 4,
    backgroundColor: white
  }
};

const TableRow = ({
  startIndex,
  colCount,
  arrayOfRows,
  rowTitles,
  drop,
  answers,
  preview,
  possible_responses,
  onDrop,
  validArray
}) => {
  const cols = [];

  for (let index = startIndex; index < startIndex + colCount; index++) {
    if (arrayOfRows.has(index) && rowTitles.length > 0) {
      cols.push(
        <RowTitleCol key={index} colCount={colCount}>
          <CenteredText style={{ wordWrap: 'break-word', textAlign: 'left' }}>
            <div dangerouslySetInnerHTML={{ __html: rowTitles[index / colCount] }} />
          </CenteredText>
        </RowTitleCol>
      );
    }
    cols.push(
      <Column key={index} rowTitles={rowTitles} colCount={colCount}>
        <DropContainer
          style={{
            ...styles.columnContainerStyle,
            justifyContent: 'center'
          }}
          noTopBorder={index / colCount >= 1}
          drop={drop}
          index={index}
          flag="column"
        >
          {Array.isArray(answers) &&
            Array.isArray(answers[index]) &&
            answers[index].length > 0 &&
            answers[index].map((answerValue, answerIndex) => (
              <DragItem
                valid={validArray[index].includes(possible_responses.indexOf(answerValue))}
                preview={preview}
                key={answerIndex}
                renderIndex={possible_responses.indexOf(answerValue)}
                onDrop={onDrop}
                item={answerValue}
              />
            ))}
        </DropContainer>
      </Column>
    );
  }

  return <tr>{cols}</tr>;
};

TableRow.propTypes = {
  startIndex: PropTypes.number.isRequired,
  colCount: PropTypes.number.isRequired,
  arrayOfRows: PropTypes.object.isRequired,
  rowTitles: PropTypes.array.isRequired,
  drop: PropTypes.func.isRequired,
  answers: PropTypes.array.isRequired,
  preview: PropTypes.bool.isRequired,
  possible_responses: PropTypes.array.isRequired,
  onDrop: PropTypes.func.isRequired,
  validArray: PropTypes.array.isRequired
};

export default TableRow;

const RowTitleCol = styled.td`
  padding: 0 16px 0 16px;
  word-break: break-word;
  width: ${({ colCount }) => 100 / colCount / 5}%;
`;

const Column = styled.td`
  padding: 0 16px 0 16px;
  word-break: break-word;
  height: 204px;
  width: ${({ rowTitles, colCount }) =>
    (rowTitles.length > 0 ? 100 / colCount - 100 / colCount / 5 / colCount : 100 / colCount)}%;
`;
