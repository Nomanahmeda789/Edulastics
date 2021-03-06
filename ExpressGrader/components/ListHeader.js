/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import styled from 'styled-components';
import { compose } from 'redux';
import {
  darkBlueSecondary,
  white
} from '@edulastic/colors';
import { withNamespaces } from '@edulastic/localization';
import { Popconfirm, Switch, message } from 'antd';
import { Link } from 'react-router-dom';
import HeaderWrapper from '../../mainContent/headerWrapper';
import Assigned from '../../assets/assignments/assigned.svg';

class ListHeader extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      condition: true // Whether meet the condition, if not show popconfirm.
    };
  }

  changeCondition = (value) => {
    this.setState({ condition: value });
  }

  confirm = () => {
    this.setState({ visible: false });
    message.success('Next step.');
  }

  cancel = () => {
    this.setState({ visible: false });
    message.error('Click on cancel.');
  }

  handleVisibleChange = (visible) => {
    if (!visible) {
      this.setState({ visible });
      return;
    }
    // Determining condition before show the popconfirm.
    // eslint-disable-next-line react/destructuring-assignment
    console.log(this.state.condition);
    // eslint-disable-next-line react/destructuring-assignment
    if (this.state.condition) {
      this.confirm(); // next step
    } else {
      this.setState({ visible }); // show the popconfirm
    }
  }

  render() {
    return (
      <Container>
        <StyledTitle>
          <StyledParaFirst>Class 1</StyledParaFirst>
          <StyledParaSecond>Done (Due on 26 October, 2018)</StyledParaSecond>
        </StyledTitle>
        <StyledTabs>
          <StyledAnchor><StyledLink to={`/author/classboard/${this.props.assignmentId}/${this.props.classId}`}><img src={Assigned} /><SpaceD />LIVE CLASS BOARD</StyledLink></StyledAnchor>
          <StyledAnchorA><StyledLink to={`/author/expressgrader/${this.props.assignmentId}/${this.props.classId}`}><img src={Assigned} /><SpaceD />EXPRESS GRADER</StyledLink></StyledAnchorA>
          <StyledAnchor><img src={Assigned} /><SpaceD />REPORTS</StyledAnchor>
        </StyledTabs>
        <StyledDiv>
          <StyledPopconfirm
            // eslint-disable-next-line react/destructuring-assignment
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText="Yes"
            cancelText="No"
          />
          <StyledParaThird>Release Scores</StyledParaThird><StyledSwitch defaultChecked onChange={this.changeCondition} />
        </StyledDiv>
      </Container>
    );
  }
}

ListHeader.propTypes = {
};

const enhance = compose(withNamespaces('author'));

export default enhance(ListHeader);

const Container = styled(HeaderWrapper)`
  display: flex;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  background-color: ${darkBlueSecondary};
  padding: 0px 15px;
  height: 62px;
  z-index: 1;
`;
// const HeaderWrapper = styled.div`
//   padding-top: 62px;
//   margin-bottom: 10px;
// `;
const StyledTitle = styled.h1`
  color: ${white};
  font-size: 22px;
  font-weight: bold;
  margin: 20px;
  padding: 0;
`;
const StyledParaFirst = styled.p`
  font-size:0.9em;
`;
const SpaceD = styled.div`
  display:inline-block;
  width:10px;  
`;
const StyledParaSecond = styled.p`
font-size:0.5em;

`;
const StyledParaThird = styled.p`
font-size:0.83em;
display:inline-block;
color:white;
margin-right:30px;
  color: ${white};
  font-weight: bold;
`;
const StyledPopconfirm = styled(Popconfirm)`

  
`;
const StyledSwitch = styled(Switch)`
  background-color:#1fe3a0;
  `;
const StyledDiv = styled.div`
margin-right:20px;
`;
const StyledLink = styled(Link)`
color:white;
:hover{
  color:white;

}
`;
const StyledTabs = styled.div`
width:43%;
height:62px;
display:flex;

`;

const StyledAnchorA = styled.a`
  display:inline-block;
  font-size:0.7em;
  color:white;
  padding:17px 12px 15px 12px;
  width:100%;
  text-align:center;
  border-bottom:4px solid lightgray;
  background-color:#037fc2;
  :hover{
    color:white;
  }
`;
const StyledAnchor = styled.a`
  display:inline-block;
  font-size:0.7em;
  color:white;
  padding:19px 12px;
  width:100%;
  text-align:center;
  :hover{
    color:white;
  }
  @media (max-width: 1450px) {
    font-size:0.6em;

  }
  
`;
