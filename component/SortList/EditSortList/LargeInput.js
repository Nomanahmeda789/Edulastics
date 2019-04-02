import React from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const LargeInput = ({ value, onChange }) => (
  <Input
    type="number"
    value={value}
    onChange={e => onChange(+e.target.value)}
    style={{ textAlign: 'center', width: 110, paddingRight: 0, marginRight: 29, fontWeight: 600 }}
    size="large"
    placeholder="large size"
  />
);

LargeInput.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func
};

LargeInput.defaultProps = {
  value: 0,
  onChange: undefined
};

export default LargeInput;
