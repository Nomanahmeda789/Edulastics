/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Card, Button, Icon } from 'antd';
import styled from 'styled-components';
import Clock from '../../assets/assignments/clock-circular-outline.svg';

export default class AnswerCard extends Component {
  constructor() {
    super();
    this.state = {
      arr: [{
        que: 'This is question 1?',
        options: {
          option_A: 'this is option A of question 1',
          option_B: 'this is option B of question 1',
          option_C: 'this is option C of question 1',
          option_D: 'this is option D of question 1'
        },
        solution: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
        feedback: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
        score: '2',
        totalScore: '2'
      },
      {
        que: 'This is question 2?',
        options: {
          option_A: 'this is option A of question 2',
          option_B: 'this is option B of question 2',
          option_C: 'this is option C of question 2',
          option_D: 'this is option D of question 2'
        },
        solution: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
        feedback: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
        score: '6',
        totalScore: '10'
      },
      {
        que: 'This is question 3?',
        options: {
          option_A: 'this is option A of question 3',
          option_B: 'this is option B of question 3',
          option_C: 'this is option C of question 3',
          option_D: 'this is option D of question 3'
        },
        solution: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
        feedback: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
        score: '4',
        totalScore: '5'
      },
      {
        que: 'This is question 4?',
        options: {
          option_A: 'this is option A of question 4',
          option_B: 'this is option B of question 4',
          option_C: 'this is option C of question 4',
          option_D: 'this is option D of question 4'
        },
        solution: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
        feedback: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
        score: '1',
        totalScore: '2'
      },
      {
        que: 'This is question 5?',
        options: {
          option_A: 'this is option A of question 5',
          option_B: 'this is option B of question 5',
          option_C: 'this is option C of question 5',
          option_D: 'this is option D of question 5'
        },
        solution: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
        feedback: 'Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem',
        score: '6',
        totalScore: '10'
      }]
    };
  }

  render() {
    return (
      <div>
        {this.state.arr.map((value, i) => (<MainDiv>
          <StyledCardOne bordered={false}>
            <StyledDiv>
              <StyledDivOne>
                <img src={Clock} />
                <StyledPara> 9 Seconds</StyledPara>
              </StyledDivOne>
              <StyledDivTwo>
                <StyledButton><StyledIcon type="eye" /> <span>SHOW STUDENT ANSWER</span></StyledButton>
              </StyledDivTwo>
            </StyledDiv>
            <StyledTextDiv>
              <StyledQue>
                <b>Q{i + 1}</b> {value.que}
              </StyledQue>
              <StyledAnswerOne>
                <CircularDiv>A</CircularDiv>
                {value.options.option_A}
              </StyledAnswerOne>
              <StyledAnswerOne>
                <CircularDiv>B</CircularDiv>
                {value.options.option_B}
              </StyledAnswerOne>
              <StyledAnswerOne>
                <CircularDiv>C</CircularDiv>
                {value.options.option_C}
              </StyledAnswerOne>
              <StyledAnswerOneA>
                <CircularDiv>D</CircularDiv>
                {value.options.option_D}
                <CheckedIcon type="check" />
              </StyledAnswerOneA>
            </StyledTextDiv>
          </StyledCardOne>

          <StyledCardTwo bordered={false}>
            <StyledDivSec>
              <StyledBlankDiv /><TextPara> / 1</TextPara>
            </StyledDivSec>
            <LeaveDiv>
              Leave a Feedback!
            </LeaveDiv>
            <StyledBlankDivsec />
            <StyledButtonA>VIEW SOLUTION</StyledButtonA>
          </StyledCardTwo>
        </MainDiv>
        ))
        }
      </div>
    );
  }
}

const MainDiv = styled.div`
  margin:0px;
  display:flex;
  width:97.5%;
`;
const StyledIcon = styled(Icon)`
color:#00b0ff;
font-size:2.2em;
padding-right:7px;



`;
const CheckedIcon = styled(Icon)`
  color:#3fe6aa;
  float: right;
  font-size:1.5em;
  padding-top:5px;
`;
const LeaveDiv = styled.div`
  margin:30px 0px 20px 0px;
  font-weight:bold;
  color:#545b6b;
  font-size:0.9em;
`;
const StyledButtonA = styled(Button)`
  font-size:1em;
  margin:10px 0px;
  width:100%;
  padding:13px 5px 20px;
  color:white;
  height:45px;
  background-color:#00b0ff;
  font-weight:bold;
`;
const StyledBlankDiv = styled.div`
  width:130px;
  height:40px;
  border:1px solid #eaeaea;
  border-radius:5px;
  display:inline-block;
`;
const StyledBlankDivsec = styled.div`
  width:100%;
  height:320px;
  border:1px solid #eaeaea;
  border-radius:5px;
  display:inline-block;
`;
const TextPara = styled.p`
  font-size:1.8em;
  font-weight:bold;
  margin-left:10px;
  display:inline-block;
`;
const StyledDivSec = styled.div`
  
  height:50px;
  border-bottom:1.4px solid #f7f7f7;
  margin:auto;
  display: flex;
  justify-content: center;
  `;
const StyledTextDiv = styled.div`
  width:46%;
  padding-left:20px;  
  height:350px;
`;

const CircularDiv = styled.div`
  width: 37px;
  height: 37px;
  border: 2px solid #1fe3a0;
  display: inline-block;
  border-radius: 228px;
  text-align: center;
  margin-right:20px;
  font-weight: bold;
  font-size:1.2em;
`;
const StyledQue = styled.p`
  font-size:1.2em;
  padding:40px 20px 20px 20px;
`;
const StyledAnswerOne = styled.p`
  font-size:1.2em;
  padding:20px 20px;
  font-weight:600;

`;
const StyledAnswerOneA = styled.p`
  font-size:1.2em;
  padding:10px 20px;  
  font-weight:600;
  background:#e1fbf2;
  border-left:3px solid #1fe3a0;
  border-top-right-radius:10px;
  border-bottom-right-radius:10px;

  `;


const StyledCardOne = styled(Card)`
  margin:auto;
  border-radius:10px;
  box-shadow:3px 2px 7px lightgray;
  display:inline-block;
  margin:0px 0px 32px 32px;
  width:73%;
  padding-bottom:100px;
`;
const StyledCardTwo = styled(Card)`
  margin:auto;
  width:22%;
  border-radius:10px;
  box-shadow:3px 2px 7px lightgray;
  display:inline-block;
  margin:0px 0px 32px 32px;
  width:27%;

`;
const StyledDiv = styled.div`
  width:100%;
  display:flex;
  height:50px;
  justify-Content:space-between;
  border-bottom:1.4px solid #f7f7f7;
  `;
const StyledDivOne = styled.div`
  display:inline-block;
`;
const StyledDivTwo = styled.div`
  display:inline-block;
 
`;
const StyledPara = styled.p`
  display:inline-block;
  color:#a19c9c;
  font-weight:bold;
  margin-left:15px;
`;
const StyledButton = styled(Button)`
  font-size:0.66em;
  background-color:transparent;
  width:170px;
  height:25px;
  padding:0px 10px 5px;
  color:#00b0ff;
  border:1px solid #00b0ff;
  font-weight:bold;
`;
