import React from 'react';
import PropTypes from 'prop-types';
import { greenDark, lightGreen, lightRed } from '@edulastic/colors';
import styled from 'styled-components';
import { Checkbox, Radio } from 'antd';

const getCellColor = (correct) => {
  switch (correct) {
    case true:
      return lightGreen;
    case 'incorrect':
      return lightRed;
    default:
      return '';
  }
};

const MatrixCell = ({ label, type, correct, isMultiple, checked, onChange, smallSize }) => {
  let input;

  if (isMultiple) {
    input = <Checkbox checked={checked} onChange={onChange} />;
  } else {
    input = <Radio checked={checked} onChange={onChange} />;
  }

  return (
    <Wrapper smallSize={smallSize} correct={correct}>
      {input}
      {type === 'inline' && (
        <div style={{ color: greenDark }} dangerouslySetInnerHTML={{ __html: label }} />
      )}
    </Wrapper>
  );
};

MatrixCell.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  correct: PropTypes.any.isRequired,
  isMultiple: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  smallSize: PropTypes.bool
};

MatrixCell.defaultProps = {
  smallSize: false
};

export default MatrixCell;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => getCellColor(props.correct, props.showAnswer)};
  padding: ${props => (props.smallSize ? 1 : 15)}px;
`;
