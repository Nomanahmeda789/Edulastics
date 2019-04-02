import React from 'react';
import styled from 'styled-components';

const TimeDuration = () => (
  <TimeContainer>
    <Time>06:07 / </Time>
    <Time>10:00</Time>
  </TimeContainer>
);

export default TimeDuration;

const TimeContainer = styled.div`
  display: flex;
`;
const Time = styled.p`
  color: #756e6e;
  font-weight: bold;
  font-size: 14px;
  width: 50px;
`;
