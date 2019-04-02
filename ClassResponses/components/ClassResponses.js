/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import {
  withWindowSizes,
  FlexContainer
} from '@edulastic/common';
import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';
import { withNamespaces } from '@edulastic/localization';
import { receiveClassResponseAction, receiveStudentResponseAction, receiveFeedbackResponseAction } from '../../actions/classResponse';
import {
  getClassResponseSelector,
  getStudentResponseSelector,
  getFeedbackResponseSelector
} from '../ducks';
import ListHeader from './ListHeader';
import SortBar from './SortBar';
import AnswerCard from './AnswerCard';
import AnswerCard_Dup from './AnswerCard_Dup';
import AnswerCard_Single_que from './AnswerCard_single_que';


import { ComposedChart, Bar, XAxis, YAxis, Line } from 'recharts';

class ClassResponses extends Component {
  constructor(props) {
    super(props);
    this.component_One = this.component_One.bind(this);
    this.component_Two = this.component_Two.bind(this);
    this.component_Three = this.component_Three.bind(this);
    this.APIDATA = this.APIDATA.bind(this);

    this.state = {
      component_Changing: {
        component_one: true,
        component_two: false,
        component_three: false
      },
      searchStr: '',
      blockStyle: 'tile',
      isShowFilter: false
    };
  }
  // eslint-disable-next-line lines-between-class-members
  componentDidMount() {
    const { loadClassResponses, loadStudentResponses, loadFeedbackResponses } = this.props;
    loadClassResponses();
    loadStudentResponses();
    loadFeedbackResponses();
  }

  handleCreate = () => {
    // eslint-disable-next-line react/prop-types
    const { history, match } = this.props;
    history.push(`${match.url}/create`);
  };

  component_One() {
    this.setState({
      component_Changing: {
        component_one: true,
        component_two: false,
        component_three: false
      }
    });
  }

  APIDATA(){
    // const { loadGradebook, loadTestActivity, match } = this.props;
    // const { assignmentId, classId } = match.params;
    // loadGradebook(assignmentId, classId);
    // loadTestActivity(assignmentId, classId);
  }
 
  component_Two() {
    this.setState({
      component_Changing: {
        component_one: false,
        component_two: true,
        component_three: false
      }
    });
  }

  component_Three() {
    this.setState({
      component_Changing: {
        component_one: false,
        component_two: false,
        component_three: true
      }
    });
  }

  render() {
    const itemsSum = this.props.classresponse.itemsSummary;
    const data = [];
    if (itemsSum) {
      itemsSum.map((item, index) => {
        data.push({
          name: `Q${index}`,
          red: item.wrongNum || 0,
          yellow: item.correctNum || 0,
          green: item.partialNum || 0,
          all: (item.wrongNum || 0) + (item.correctNum || 0) + (item.partialNum || 0),
        })
      });
    }

    window.onresize = function (event) {
      height = document.getElementsByClassName('ClassResponsesBarChart')[0].clientHeight;
      width = document.getElementsByClassName('ClassResponsesBarChart')[0].clientWidth;

      $('#container').highcharts().setSize(width, height, doAnimation = true);
    };
    const {
      // eslint-disable-next-line react/prop-types
      classresponse,
      creating
    } = this.props;
    return (
      <div>
        <ListHeader
          onCreate={this.handleCreate}
          creating={creating}
        />
        <StyledFlexContainer
          justifyContent="space-between"
        >
          <PaginationInfo>
            <a>&lt; <Link to="/author/assignments">RECENTS ASSIGNMENTS</Link></a> / <a>CALIFORNIA VERSION 4</a> / <a>CLASS 1</a>
          </PaginationInfo>
          <SortBar />
        </StyledFlexContainer>
        <StyledCard bordered={false}>
          <StyledGraphDivOne className="ClassResponsesBarChart">
            <StyledDiv width={1000} height={240} barGap={1} barSize={36} data={data} margin={{ top: 20, right: 60, bottom: 0, left: 20 }}>
              <XAxis dataKey="name" axisLine={false} tickSize={0} />
              <YAxis
                dataKey="all"
                yAxisId={0}
                tickCount={4}
                allowDecimals={false}
                tick={{ strokeWidth: 0, fill: '#999' }}
                tickSize={6}
                label={{ value: 'ATTEMPTS', angle: -90, fill: '#999' }}
                stroke="#999"
              />
              <YAxis
                dataKey="all"
                yAxisId={1}
                tickCount={4}
                allowDecimals={false}
                tick={{ strokeWidth: 0, fill: '#999' }}
                tickSize={6}
                label={{ value: 'AVG TIME (SECONDS)', angle: -90, fill: '#999'}}
                orientation="right"
                stroke="#999"
              />
              <Bar stackId="a" dataKey="green" fill="#1fe3a0" />
              <Bar stackId="a" dataKey="yellow" fill="#fdcc3a" />
              <Bar stackId="a" dataKey="red" fill="#ee1b82" />
              <Line type='monotone' dataKey='green' stroke='#1baae9' dot={{ stroke: '#1baae9', strokeWidth: 2, fill: '#1baae9' }}/>
            </StyledDiv>
          </StyledGraphDivOne>
          <StyledGraphDiv>
            <Paras>
              <ParaOne>TOTAL SCORE</ParaOne>
              <ParaTwo>12</ParaTwo>
              <ParaThree />
              <ParaFour>12</ParaFour>
            </Paras>
            <ParaT>
              <Pone><Color>Time:</Color> 1:54</Pone>
              <Pone><Color>Status:</Color> Graded</Pone>
              <Pone><Color>Submitted on:</Color> 19 October,2018</Pone>
              <Pone><Color>Hour:</Color> 03:13</Pone>
            </ParaT>
          </StyledGraphDiv>

        </StyledCard>
        <StyledFlexContainer
          justifyContent="space-between"
        >
          <PaginationInfoF>
            <StyledButtonA onClick={this.component_One}>6 ALL</StyledButtonA>
            <StyledButton onClick={this.component_Two}>6 NOT STARTED</StyledButton>
            <StyledButton onClick={this.component_Three}>0 IN PROGRESS</StyledButton>
            <StyledButton onClick={this.APIDATA}>0 SUBMITTED</StyledButton>
            <StyledButton>0 GRADED</StyledButton>
          </PaginationInfoF>
          <PaginationInfoS>
            <StyledButtonW>OVERALL FEEDBACK</StyledButtonW>
          </PaginationInfoS>
        </StyledFlexContainer>
        {this.state.component_Changing.component_one ? <AnswerCard_Dup /> : ''}
        {this.state.component_Changing.component_two ? <AnswerCard_Single_que /> : ''}
        {this.state.component_Changing.component_three ? <AnswerCard /> : ''}

      </div>
    );
  }
}
const enhance = compose(
  withWindowSizes,
  withNamespaces('header'),
  connect(
    state => ({
      classresponse: getClassResponseSelector(state),
      studentresponse: getStudentResponseSelector(state),
      feedbackresponse: getFeedbackResponseSelector(state)

    }),
    {
      loadClassResponses: receiveClassResponseAction,
      loadStudentResponses: receiveStudentResponseAction,
      loadFeedbackResponses: receiveFeedbackResponseAction

    }
  )
);

export default enhance(ClassResponses);

ClassResponses.propTypes = {
  count: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  loadClassResponses: PropTypes.func.isRequired,
  loadStudentResponses: PropTypes.func.isRequired,
  loadFeedbackResponses: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  classresponse: PropTypes.func.isRequired,
  studentresponse: PropTypes.func.isRequired,
  feedbackresponse: PropTypes.func.isRequired,
  windowWidth: PropTypes.number.isRequired,
};
const PaginationInfo = styled.span`
  font-weight: bold;
  font-size: 10px;
  word-spacing:5px;
  display:inline-block
  margin-left:30px;
  color:#1890ffd9;

    @media (max-width: 570px) {
      font-size:8px; 
    }
  `;
const ParaT = styled.p`
  margin-top:20px;

  @media (max-width: 870px) {
   font-size:11px; 
  }
`;
const Color = styled.span`
 color:#58b294;
`;
const Pone = styled.p`
  font-size:0.9em;
  font-weight:bold;
  padding-left:20px;
`;
const Paras = styled.p`
  text-align:center;
  margin-top:20px;
`;
const ParaOne = styled.p`
  color:#C0C0C0;
  font-size:0.8em;
`;
const ParaTwo = styled.p`
  font-weight:bold;
  font-size:2em;
`;
const ParaThree = styled.p`
  width:40px;
  height:2px;
  background-color:#59595a;
  margin:auto;
`;
const ParaFour = styled.p`
font-weight:bold;
font-size:2em;
`;
const PaginationInfoF = styled.span`
  font-weight: bold;
  font-size: 15px;
  display:inline-block;
  margin-left:30px;
`;
const StyledGraphDiv = styled.div`
  display:inline-block;
  width:20%;
  height:200px;
  position:absolute;

  @media (max-width: 1400px) {
    width: 25%;
    height: 226px;
    
  }
  `;
const StyledGraphDivOne = styled.div`
  display:inline-block;
  width:75%;
  .highcharts-title{
    display: none;
  }
  .highcharts-credits{
    display: none;
  }
`;
const PaginationInfoS = styled.span`
  display:inline-block;
  `;
const StyledFlexContainer = styled(FlexContainer)`
  margin:20px 13px;
`;
const StyledCard = styled(Card)`
  margin:auto;
  width:95%;
  display:flex:
  justify-content:spance-between;
  height:270px;
  border-radius:10px;
  box-shadow:3px 2px 7px lightgray;
`;
const StyledButton = styled(Button)`
  font-size:0.64em;
  background-color:transparent;
  margin:0px 23px 0px -5px;
  width:100px;
  padding:2px 5px;
  height:25px;
  color:#00b0ff;
  border:1px solid #00b0ff;
  font-weight:bold;
  @media (max-width: 950px) {
    margin:0px 23px 10px -5px;
  }

  @media (max-width: 770px) {
    font-size: 0.44em;
    width: 85px;
    height: 23px;
  }
`;
const StyledButtonW = styled(Button)`
  font-size:0.8em;
  background-color:white;
  margin:0px 23px 0px -5px;
  width:170px;
  padding:2px 5px;
  height:40px;
  color:#00b0ff;
  border:1px solid white;
  font-weight:bold;
  @media (max-width: 770px) {
    font-size: 0.6em;
    width: 153px;
    height: 36px;
  }
`;
const StyledButtonA = styled(Button)`
  font-size:0.65em;
  margin:0px 23px 10px -5px;
  width:100px;
  padding:2px 5px;
  height:25px;
  color:white;
  background-color:#00b0ff;
  font-weight:bold;
  @media (max-width: 950px) {
    margin:0px 23px 10px -5px;
  }
  @media (max-width: 770px) {
    font-size: 0.44em;
    width: 85px;
    height: 23px;
  }
`;
const StyledDiv = styled(ComposedChart)`
  width:inherit;
`;
