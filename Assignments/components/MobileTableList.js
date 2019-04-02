/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Icon, Menu, Collapse, Modal, Row, Col, Dropdown } from 'antd';
import { FlexContainer } from '@edulastic/common';
import presentationIcon from '../../assets/assignments/presentation.svg';
import additemsIcon from '../../assets/assignments/add-items.svg';
import piechartIcon from '../../assets/assignments/pie-chart.svg';
import ActionMenu from './ActionMenu';
import { withNamespaces } from '@edulastic/localization';
import {
  mobileWidth,
  desktopWidth,
  secondaryTextColor,
  greenDark,
  white,
  tabletWidth
} from '@edulastic/colors';

class MobileTableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      classSort : false,
      modalshow: false,
    };
  }

   showModal = () => {
    this.setState({
      modalshow: !this.state.modalshow
    });
  }

  handleClass = (e) => {
    this.setState({
      classSort: !this.state.classSort
    });
  }
  handleCancel = (e) => {
    this.setState({
      modalshow: false
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false
    });
  }
  classCollapsePanel = (classData) =>{
    const { t } = this.props;
    const classPanel = [];
    classData.forEach(data => {
      const CollapsePanel = (
        <div>
          <PanelClass>
            <FlexContainer>
              <FullRow>
                <Col span={16}><GrayFont>{data.className}</GrayFont></Col>
                <Col span={8}>
                  <SortClassContainer>
                    <img src={presentationIcon}/>
                    <img src={additemsIcon} />
                    <img src={piechartIcon} />
                  </SortClassContainer>
                </Col>
              </FullRow>
            </FlexContainer>
          </PanelClass>
          <div>
            { data.status === 'IN PROGRESS' ? <BtnProgress size="small">{data.status}</BtnProgress> : (
              data.status === t('common.submittedTag') ? <BtnSubmitted size="small">{data.status}</BtnSubmitted> : (
              data.status ===  t('common.notStartedTag') ? <BtnStarted size="small">{data.status}</BtnStarted> : '' ))
            }
          </div>
        </div>
      );
      classPanel.push(CollapsePanel)
    });
    return classPanel;
  }
  CollapsePanel = (AssignmentData) => {
    const { t, windowWidth, windowHeight } = this.props;
    const menu = ( <ActionMenu/>);
    var i = 0;
    const Panel = [];
    AssignmentData.forEach(assignment => {
      const panaelHeader = (
        <HeaderDiv>
          <StyledBox/>
          <StyledTextBox>
            <StyledTextFirst>ASSESSMENT NAME</StyledTextFirst>
            <StyledTextSecond>{assignment[0].testName}</StyledTextSecond>
          </StyledTextBox>
        </HeaderDiv>
      );
      const classHeader = (
        <div style={{ textAlign: 'center', cursor: 'pointer' }} onClick={this.handleClass}>
          <p style={{ color: '#00b0ff', fontSize: '1.2em' }}>Class</p>
          <p>
            {this.state.classSort ?
               <Icon type="down" style={{ color: '#00b0ff' }}/>:<Icon type="up" style={{ color: '#00b0ff' }}/>
            }
          </p>
        </div>
      );
      const panelPara = (
        <div>
          <PanelDiv>
            <PanelTableTitle>
              <PanelTableName>TYPE</PanelTableName>
              <PanelTableValue>Assigned</PanelTableValue>
            </PanelTableTitle>
            <PanelTableTitle>
              <PanelTableName>ASSIGNED BY</PanelTableName>
              <PanelTableValue>Lorem Ispum</PanelTableValue>
            </PanelTableTitle>
          </PanelDiv>
          <PanelDiv>
            <PanelTableTitle>
              <PanelTableName>SUBMITTED</PanelTableName>
              <PanelTableValue>{assignment.length} of {assignment.length}</PanelTableValue>
            </PanelTableTitle>
            <PanelTableTitle>
              <PanelTableName>GRADED</PanelTableName>
              <PanelTableValue>1</PanelTableValue>
            </PanelTableTitle>
          </PanelDiv>

          <div style={{ height: 'auto' }}>
            <ClassHeaderCollapse accordion >
              <Collapse.Panel header={classHeader} showArrow={false}>
                {this.classCollapsePanel(assignment)}
              </Collapse.Panel>
            </ClassHeaderCollapse>
          </div>
          <div style={{ height: 'auto', marginTop: '15px' }}>
            { windowWidth < '770' ?
              <div>
                <BtnAction onClick={this.showModal}>ACTIONS</BtnAction>
                  <StyledModal
                    footer={false}
                    closable={false}
                    visible={this.state.modalshow}
                    bodyStyle = {{height:windowHeight, width: windowWidth}}
                  >
                    <HeaderContent>
                      <FilterHeader>Actions</FilterHeader>
                      <StyledCloseIcon onClick={this.handleCancel} type="close" />
                    </HeaderContent>
                    {menu}
                  </StyledModal>
                </div>:
                <div>
                  <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
                    <BtnAction>ACTIONS</BtnAction>
                  </Dropdown>
                </div>
              }
          </div>
        </div>
      );
      const CollapsePanel = (
        <Collapse.Panel header={panaelHeader} showArrow={false} key={i}>
          {panelPara}
        </Collapse.Panel>
      );
      i++;
      Panel.push(CollapsePanel);
    });
    return Panel;
  }

  render() {
    const { assignments, windowWidth, windowHeight} = this.props;
    return (
      <Container>
        <StyledCollapse accordion>
          {this.CollapsePanel(assignments)}
        </StyledCollapse>
      </Container>
    );
  }
}
MobileTableList.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired
};
export default withNamespaces('assignmentCard')(MobileTableList);

const Container = styled.div`
  padding: 30;
  left: 0;
  right: 0;
  height: 100%;
  .ant-collapse{
    border:0px !important;
  }
  .ant-collapse-item{
    border:1px solid #d9d9d9 !important;
    margin-top: 10px !important;
    border-radius: 5px !important;
  }
  .ant-collapse > .ant-collapse-item:last-child, .ant-collapse > .ant-collapse-item:last-child > .ant-collapse-header {
    border-radius: 5px !important;
  }
`;

const BtnAction = styled(Button)`
  color: #12a6e8;
  border-color: #12a6e8;
  width: 100%;
  :active {
    background-color: #12a6e8;
    color: #fff;
  }
  :hover{
    background-color: #12a6e8;
    color: #fff;
  }
`;

const BtnProgress = styled(Button)`
  color: #d1a422;
  background-color: #deba5b;
  border: 0px;
  width: 100%;
  font-size:12px;
  font-weight: bold;
`;
const GrayFont = styled.p`
  color: grey;
  font-size: 1.1rem;
`;
const BtnSubmitted = styled(Button)`
  color: #8750ac;
  background-color: #e7c8fb;
  border: 0px;
  width: 100%;
  font-size:12px;
  font-weight: bold;
`;
const SortClassContainer = styled(FlexContainer)`
  justify-content: space-between;
`;
const BtnStarted = styled(Button)`
  color: #0686c0;
  background-color: #c8ebfb;
  border: 0px;
  width: 100%;
  font-size:12px;
  font-weight: bold;
`;
const StyledCollapse = styled(Collapse)`
    display:none;
    background-color:#ffffff;
    .ant-collapse-content{
      border: 0px;
    }
    @media (max-width: ${tabletWidth}) {
      display: block;
    }
`;
const ClassHeaderCollapse = styled(Collapse)`
    display:none;
    background-color:#ffffff;
    .ant-collapse-item{
      border: 0px !important;
    }
    @media (max-width: ${tabletWidth}) {
      display: block;
    }
`;
const HeaderDiv = styled.div`
   display:flex;
   padding-right: 20px;
`;
const StyledBox = styled.p`
  width:90px;
  height:55px;
  background-color: rgb(0, 216, 218);
  border-radius:8px;
  @media (max-width: 500px) {
    width: 26%;
  }
`;

const HeaderContent = styled.div`
  display: none;
  @media (max-width: ${mobileWidth}) {
    width: 100%;
    padding: 20px 10px 10px 24px;
    display: inline-block;
    flex-direction: row;
    align-items: space-between;
    background-color: #fafefd;
  }
  @media (max-width: ${tabletWidth}) {
    width: 100%;
    padding: 20px 10px 10px 24px;
    display: inline-block;
    flex-direction: row;
    align-items: space-between;
    background-color: #fafefd;
  }
`;
const FilterHeader = styled.p`
  color: #4aab8b;
  font-size: 25px;
  text-align:left;
  display: inline-block;
  padding-left:-40px;
  width: 92%;
`;

const StyledCloseIcon = styled(Icon)`
  color: #4aab8b;
  font-weight: bolder;
  font-size: 22px;
  cursor: pointer;
`;
const StyledModal = styled(Modal)`
  @media (max-width: ${mobileWidth}) {
    position: absolute;
    top: -10px;
    left: -10px;
    .ant-modal-body{
      padding: 0px !important;
    }
  }
  @media (max-width: ${tabletWidth}) {
    position: absolute;
    top: -10px;
    left: -10px;
    .ant-modal-body{
      padding: 0px !important;
    }
  }
`;
const StyledTextBox = styled.div`
  margin-left: 15px;
`;
const StyledTextFirst = styled.div`
  font-size: 0.8em;
  padding-top: 10px;
  @media (max-width: 500px) {
    font-size: 0.7em;
  }
`;
const StyledTextSecond = styled.div`
  font-size: 1.2em;
`;
const PanelDiv = styled.div`
  height: 68px;
`;
const PanelTableTitle = styled.div`
  display: inline-block;
  width: 50%;
  height: inherit;
`;
const PanelTableName = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 0.8em
`;
const PanelTableValue = styled.div`
  text-align: center;
  font-size: 1.3em;
`;
const PanelClass = styled.div`
  padding: 20px 0px 10px 0px;
  margin-bottom: 10px;
  width: 100%;
`;
const FullRow = styled(Row)`
  width: 100%;
`;
