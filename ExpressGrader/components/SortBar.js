import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import { FlexContainer } from '@edulastic/common';
import styled from 'styled-components';

const SortBar = () => (
  <FlexContainer>
    <Container>
      <StyledFlexContainer>
        <StyledRadio value={1}>View Mode</StyledRadio>
        <StyledRadio value={2}>Score Entry</StyledRadio>
        <StyledRadio value={3}>Response Entry</StyledRadio>
      </StyledFlexContainer>
    </Container>
  </FlexContainer>
);

SortBar.propTypes = {
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
const StyledFlexContainer = styled(FlexContainer)`

  @media (max-width: 768p) {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  @media (max-width: 992px) {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;
const StyledRadio = styled(Radio)`
  font-weight:bold;
  color:#6b7280;
  font-size:0.9em;
`;
