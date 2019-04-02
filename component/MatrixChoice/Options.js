import React from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';
import O, { FontSizeSelect } from '../common/Options';

const styleOptions = [{ value: 'inline', label: 'Inline' }, { value: 'table', label: 'Table' }];
const stemNumerationOptions = [
  { value: 'number', label: 'Numerical' },
  { value: 'upper-alpha', label: 'Uppercase alphabet' },
  { value: 'lower-alpha', label: 'Lowercase alphabet' }
];

function Options({ onChange, uiStyle }) {
  const changeUiStyle = (prop, value) => {
    console.log(prop, value);
    onChange('ui_style', {
      ...uiStyle,
      [prop]: value
    });
  };

  return (
    <O>
      <O.Block>
        <O.Heading>Layout</O.Heading>

        <O.Row>
          <O.Col md={6}>
            <O.Label>Matrix style</O.Label>
            <Select
              style={{ width: '80%' }}
              size="large"
              onChange={val => changeUiStyle('type', val)}
              value={uiStyle.type}
              data-cy="matrixStyle"
            >
              {styleOptions.map(option => (
                <Select.Option data-cy={option.value} key={option.value}>{option.label}</Select.Option>
              ))}
            </Select>
          </O.Col>
          {uiStyle.type === 'table' && (
            <O.Col md={6}>
              <O.Label>Stem numeration</O.Label>
              <Select
                style={{ width: '80%' }}
                size="large"
                onChange={val => changeUiStyle('stem_numeration', val)}
                value={uiStyle.stem_numeration}
                data-cy="stemNum"
              >
                {stemNumerationOptions.map(option => (
                  <Select.Option data-cy={option.value} key={option.value}>{option.label}</Select.Option>
                ))}
              </Select>
            </O.Col>
          )}
        </O.Row>

        <O.Row>
          <O.Col md={6}>
            <FontSizeSelect
              onChange={val => changeUiStyle('fontsize', val)}
              value={uiStyle.fontsize}
            />
          </O.Col>
        </O.Row>
      </O.Block>
    </O>
  );
}

Options.propTypes = {
  onChange: PropTypes.func.isRequired,
  uiStyle: PropTypes.object
};

Options.defaultProps = {
  uiStyle: {
    type: 'standard',
    fontsize: 'normal',
    columns: 0,
    orientation: 'horizontal',
    choice_label: 'number'
  }
};

export default Options;
