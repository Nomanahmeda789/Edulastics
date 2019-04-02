/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import { Card, Avatar, Tabs, Button, Icon } from 'antd';
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
      <MainDiv>
        <StyledCardOne bordered={false}>
          <StyledDivB>
            <StyledDivOne>
              <img src={Clock} />
              <StyledPara> 9 Seconds</StyledPara>
            </StyledDivOne>
            <StyledDivTwo>
              <StyledButton><StyledIcon type="eye" /> <span>SHOW STUDENT ANSWER</span></StyledButton>
            </StyledDivTwo>
          </StyledDivB>
          <TabDiv>
            <Tabss defaultActiveKey="1">
              <TabPanes tab="TAB1" key="1" />
              <TabPanes tab="TAB2" key="2" />
            </Tabss>
          </TabDiv>
          {/* </StyledDiv> */}
          <StyledDivS>
            {this.state.arr.map((value, i) => (<Sdiv>
              <PlainFlex>
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
                  </StyledAnswerOneA>
                </StyledTextDiv>

                <StyledQuestionDiv>
                  <TextParaTeacher>
                    <DivOne>
                      <Ptwo>
                        Score:
                      </Ptwo>
                      <Pone>
                        <Score>{value.score}</Score>
                        <ScoreDiv />
                        <Score>{value.totalScore}</Score>
                      </Pone>
                    </DivOne>
                  </TextParaTeacher>
                  <Pthree>
                        Teacher Feedback: <Tfeedback>No feedback given</Tfeedback>
                  </Pthree>
                </StyledQuestionDiv>
              </PlainFlex>
            </Sdiv>
            ))
            }
          </StyledDivS>
        </StyledCardOne>
      </MainDiv>
    );
  }
}
const Tfeedback = styled.p`
  display:inline-block;
  margin-left:20px;
  color:gray;
  font-size: 0.8em;

`;
const Sdiv = styled.div`

  @media (max-width: 1100px) {
    font-size:11px; 
  }

  @media (max-width: 860px) {
    font-size:10px; 
  }

  @media (max-width: 610px) {
    font-size:9px; 
  }
`;
const StyledIcon = styled(Icon)`
  color:#00b0ff;
  font-size:2.2em;
  padding-right:7px;

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
const StyledDivTwo = styled.div`
  display:inline-block;
 
`;
const StyledDivB = styled.div`
  width:100%;
  display:flex;
  margin-bottom:30px;
  height:50px;
  justify-Content:space-between;
  border-bottom:1.4px solid #f7f7f7;
  `;
const Score = styled.p`
  font-size:2.5em;
  font-weight:bold;
  width:100%;
  text-align:center;
`;
const StyledAvatar = styled(Avatar)`
  margin-top:20px;
  margin-right:25px;
`;
const StyledDivS = styled.div`
  width:65%;
  display:inline-block;
  float:right;
  box-shadow:0px 0px 3px 2px lightgray;
  border-radius:10px;



  `;
const TabDiv = styled.div`
  width:30%;
  height:inherit;
  border-radius:10px;
  box-shadow:0px 0px 6px 2px lightgray;
  float:left;
`;
const Tabss = styled(Tabs)`
  height:700px;
  .ant-tabs-nav-scroll {
    width:100%;
  }
  .ant-tabs-nav-scroll > div{
    width:100%;
  }
  .ant-tabs-nav .ant-tabs-tab-active {
    
  }
  .ant-tabs-tab {
    width: 46%;
    text-align:center;
    font-size:0.8em;
    font-weight:bold;
    color;#00b0ff;
    padding:15px;
  }
  

`;
const TabPanes = styled(Tabs.TabPane)`


`;
const ScoreDiv = styled.div`
  width:60%;
  margin:auto;
  height:4px;
  background-color:#515151;
`;

const DivOne = styled.div`
  width:90%;
  display:flex;
`;

const Pone = styled.p`
  width:20%;
  padding:20px 20px;

`;
const Ptwo = styled.p`
  font-size:1.5em;
  font-weight:bold;
  display:inline-block;
  padding:56px 0px 56px 30px;
`;

const Pthree = styled.p`
  font-size:1.4em;
  font-weight:bold;
  display:inline-block;
  padding:36px 0px 36px 30px;
  width:100%;
`;
const MainDiv = styled.div`
  margin:0px;
  display:flex;
  width:97.5%;
`;
const StyledTextDiv = styled.div`
  width:57%;
  padding-left:20px;  
  height:auto;
  @media (max-width: 1900px) {
    width: 100%;
    display: block;
  }
  
`;
const Color = styled.p`
  color:#4aac8b;
  display:inline;
`;

const PlainFlex = styled.div`
  display:flex;
  @media (max-width: 1900px) {
    width: 100%;
    display: block;
  }
`;

const TextPara = styled.p`
  padding:30px;
  font-weight:5010;
`;
const TextParaTeacher = styled.p`
  display:flex;
  padding-top:10px;
`;

const StyledSolutionDiv = styled.div`
  width:57%;
  margin-top:30px;
  margin-left:20px;
`;
const StyledQuestionDiv = styled.div`
  width:40%;
  margin-top:30px;
  margin-left:20px;
  @media (max-width: 1900px) {
    width: 100%;
    display: block;
  }
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
  width:70%;
  padding:10px 20px 0px ;  
  font-weight:600;
  background:#e1fbf2;
  border-left:3px solid #1fe3a0;
  height:55px;
  @media (max-width: 820px) {
    width: 85%;
  }

`;


const StyledCardOne = styled(Card)`
  margin:auto;
  border-radius:10px;
  box-shadow:3px 2px 7px lightgray;
  display:inline-block;
  margin:0px 0px 32px 32px;
  width:100%;
  padding-bottom:100px;
`;
const StyledDiv = styled.div`
  width:100%;
  display:flex;
  height:50px;
  justify-Content:space-between;
  border-bottom:2px solid #f7f7f7;
  `;
const StyledDivOne = styled.div`
  padding-left:10px;
  padding-bottom:20px;
`;
const StyledPara = styled.p`
display:inline-block;
color:#a19c9c;
font-weight:bold;
margin-left:15px;
`;
const StyledParaa = styled.p`
  display:inline-block;
  font-size:1.2em;
  font-weight:bold;
  margin-left:15px;
`;
