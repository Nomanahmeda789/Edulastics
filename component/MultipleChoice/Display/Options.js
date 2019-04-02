import React from 'react';
import PropTypes from 'prop-types';

import Option from './Option';
import { OptionsList } from './styles';

const Options = ({ options, evaluation, uiStyle, onChange, validation, ...restProps }) => (
  <OptionsList>
    {options.map((option, index) => (
      <Option
        key={index}
        index={index}
        uiStyle={uiStyle}
        item={option}
        validation={validation}
        onChange={() => onChange(option.value)}
        correct={evaluation && evaluation[option.value]}
        {...restProps}
      />
    ))}
  </OptionsList>
);

Options.propTypes = {
  showAnswer: PropTypes.bool,
  checkAnswer: PropTypes.bool,
  userSelections: PropTypes.array,
  validation: PropTypes.object,
  options: PropTypes.array,
  smallSize: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  uiStyle: PropTypes.object.isRequired,
  evaluation: PropTypes.object.isRequired
};

Options.defaultProps = {
  showAnswer: false,
  checkAnswer: false,
  userSelections: [],
  validation: {},
  options: [],
  smallSize: false
};

export default React.memo(Options);
