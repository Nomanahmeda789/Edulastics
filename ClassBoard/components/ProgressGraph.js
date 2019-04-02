/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { Component } from 'react';
import { Progress } from 'antd';
import styled from 'styled-components';
import BarGraph from './BarGraph';

// eslint-disable-next-line no-trailing-spaces
export default class Graph extends Component {
  render() {
    const { gradebook } = this.props;
    const submittedNum = gradebook.submittedNumber;
    const totalNum = gradebook.total;
    const percentage = Math.round((submittedNum / totalNum) * 100);
    return (
      <StyledDiv>
        <div>
          <StyledProgress
            className="getProgress"
            strokeLinecap="square"
            type="circle"
            percent={percentage}
            width={150}
            strokeWidth={15}
            strokeColor="#00b0ff"
            format={percent => `${percent}%`}
          />
          <GraphText>
            <p>{this.props.gradebook.submittedNumber} out of {this.props.gradebook.total} Submitted</p>
            <p>({this.props.gradebook.absentNumber} Absent)</p>
          </GraphText>
        </div>
        <BarGraph gradebook={gradebook} />
      </StyledDiv>
    );
  }
}

const StyledProgress = styled(Progress)`
  margin:10px 30px;
`;

const StyledDiv = styled.div`
  display:flex;
`;

const GraphText = styled.div`
  text-align:center;
  font-weight:bold;
  font-size:1em;
`;
