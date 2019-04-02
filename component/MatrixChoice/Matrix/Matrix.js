import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { greenDark, white } from '@edulastic/colors';
import { helpers } from '@edulastic/common';
import { cloneDeep } from 'lodash';
import styled from 'styled-components';

import MatrixCell from './MatrixCell';

const getResponses = (validation) => {
  const altResponses =
    validation.alt_responses && validation.alt_responses.length
      ? validation.alt_responses.map(res => res.value)
      : [];
  return [validation.valid_response.value, ...altResponses];
};

const validatedAnswers = (answers, responses, matrix, type) => {
  let result = [];

  if (type === 'show') {
    const newMatrix = cloneDeep(matrix);

    result = [
      newMatrix.map((mat, matIndex) =>
        mat.map((row, rowIndex) => {
          if (!responses[0] || !responses[0][matIndex]) {
            return false;
          }
          return responses[0][matIndex].includes(rowIndex);
        }))
    ];
  } else {
    result = responses.map((res) => {
      let newMatrix = cloneDeep(matrix);

      newMatrix = newMatrix.map((mat, matIndex) =>
        mat.map((row, rowIndex) => {
          if (!res[matIndex]) {
            res[matIndex] = [];
          }

          if (!answers[matIndex]) {
            answers[matIndex] = [];
          }

          if (!res[matIndex].includes(rowIndex) && answers[matIndex].includes(rowIndex)) {
            return 'incorrect';
          }

          return res[matIndex].includes(rowIndex) && answers[matIndex].includes(rowIndex);
        }));

      return newMatrix;
    });
  }

  return result;
};

const Matrix = ({
  stems,
  options,
  response,
  isMultiple,
  onCheck,
  uiStyle,
  validation,
  type,
  smallSize
}) => {
  let correctAnswersMatrix;

  if (response && validation && type !== 'clear') {
    const responses = getResponses(validation);
    const matrix = stems.map(() => options.map(() => false));
    correctAnswersMatrix = validatedAnswers(response.value, responses, matrix, type);
  }

  const getCell = (columnIndex, data) => {
    let checked = false;
    let correct = false;

    if (correctAnswersMatrix) {
      const answers = correctAnswersMatrix.map(mat => mat[data.index][columnIndex]);

      const isTrue = el => el === true;
      const isIncorrect = el => el === 'incorrect';

      if (answers.some(isTrue)) {
        correct = true;
      } else if (answers.some(isIncorrect)) {
        correct = 'incorrect';
      }
    }

    if (data && data.value && data.value.length) {
      checked = data.value.includes(columnIndex);
    }

    const handleChange = (e) => {
      const checkData = {
        columnIndex,
        rowIndex: data.index,
        checked: e.target.checked
      };

      onCheck(checkData);
    };

    return (
      <MatrixCell
        onChange={handleChange}
        checked={checked}
        correct={correct}
        type={uiStyle.type}
        label={options[columnIndex]}
        isMultiple={isMultiple}
        smallSize={smallSize}
      />
    );
  };

  let columns = [
    {
      title: '',
      dataIndex: 'stem',
      key: 'stem',
      render: stem => <span dangerouslySetInnerHTML={{ __html: stem }} />
    },
    ...options.map((option, i) => ({
      title: <span style={{ color: greenDark }} dangerouslySetInnerHTML={{ __html: option }} />,
      dataIndex: `${i}`,
      key: i,
      render: data => getCell(i, data)
    }))
  ];

  if (uiStyle.type === 'table' && uiStyle.stem_numeration) {
    columns = [
      {
        title: '',
        dataIndex: 'numeration',
        key: 'numeration',
        render: stem => <span dangerouslySetInnerHTML={{ __html: stem }} />
      },
      ...columns
    ];
  }

  const getData = (i) => {
    const result = {};

    options.forEach((o, index) => {
      result[index] = {
        value: response.value[i],
        index: i
      };
    });

    return result;
  };

  const data = stems.map((stem, i) => ({
    key: i,
    stem,
    numeration: helpers.getNumeration(i, uiStyle.stem_numeration),
    ...getData(i)
  }));

  return (
    <StyledTable
      showHeader={uiStyle.type !== 'inline'}
      columns={columns}
      dataSource={data}
      pagination={false}
      smallSize={smallSize}
    />
  );
};

Matrix.propTypes = {
  stems: PropTypes.array.isRequired,
  options: PropTypes.array.isRequired,
  response: PropTypes.object.isRequired,
  onCheck: PropTypes.func.isRequired,
  uiStyle: PropTypes.object.isRequired,
  smallSize: PropTypes.bool,
  isMultiple: PropTypes.bool,
  validation: PropTypes.object,
  type: PropTypes.string
};

Matrix.defaultProps = {
  isMultiple: false,
  validation: null,
  type: 'clear',
  smallSize: false
};

export default Matrix;

const StyledTable = styled(Table)`
  tbody {
    border-collapse: collapse !important;
    border: 1px solid #e8e8e8 !important;
  }
  th {
    text-align: center !important;
    padding: ${props => (props.smallSize ? 3 : 16)}px !important;
    border-bottom: 0 !important;
    background: ${white} !important;
  }
  td {
    padding: 0 !important;
    text-align: center;
  }
`;
