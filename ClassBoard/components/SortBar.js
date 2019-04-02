import React from 'react';
import { Select } from 'antd';
import { FlexContainer } from '@edulastic/common';
import styled from 'styled-components';
import { themes } from '../../../../student/themes';

const classBoardTheme = themes.default.classboard;

const SortBar = () => (
  <FlexContainer>
    <Container>
      <StyledSelect defaultValue="">
        <Select.Option value="">Class 1</Select.Option>
      </StyledSelect>
    </Container>
  </FlexContainer>
);

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
    color: ${classBoardTheme.SortBarSelectionColor};
  }

  
`;
const StyledSelect = styled(Select)`
  display:inline-block
@media (max-width: 550px) {
  display: none;
}
@media (max-width: 1000px) {
  display: none;
}
`;
