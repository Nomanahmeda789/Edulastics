import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { FlexContainer } from '@edulastic/common';
import styled from 'styled-components';

const SortBar = ({ onSortChange }) => (
  <FlexContainer>
    <Container>
      <StyledSelect defaultValue="" onChange={onSortChange}>
        <Select.Option value="">Class 1</Select.Option>
      </StyledSelect>
    </Container>
  </FlexContainer>
);

SortBar.propTypes = {
  onSortChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  onStyleChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  activeStyle: PropTypes.string.isRequired
};

export default SortBar;

const Container = styled.div`
  display: flex;
  align-items: center;

  .ant-select {
    margin-right: 23px;
    width: 128px;
  }

  svg {
    margin-right: 23px;
    width: 18px !important;
  }

  .ant-select-selection__rendered {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: #434b5d;
  }

  .ant-select-arrow-icon {
    svg {
      fill: #00b0ff;
      margin-right: 0px;
    }
  }
`;
const StyledSelect = styled(Select)`
  display:inline-block

`;
