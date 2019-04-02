import React, { Component } from 'react';
import { Popover, Icon, Input, Checkbox, Modal } from 'antd';
import { FlexContainer } from '@edulastic/common';
import styled from 'styled-components';
import { desktopWidth, blue, greenDark, textColor, mobileWidth, tabletWidth } from '@edulastic/colors';
import FilterIcon from '../../assets/assignments/filter.svg';

class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalshow: false
    };
  }

   showModal = () => {
     this.setState({
       modalshow: !this.state.modalshow
     });
   }

  handleCancel = (e) => {
    this.setState({
      modalshow: false
    });
  }

  render() {
    const { windowWidth, windowHeight } = this.props;
    const Search = Input.Search;
    const FilterElement = (
      <MainContainer>
        <StyledBoldText>Grade</StyledBoldText>
        <Input.Search size="large" />
        <StyledParagraph><Checkbox>All</Checkbox></StyledParagraph>
        <StyledParagraph><Checkbox>Lorem Ispum</Checkbox> </StyledParagraph>
        <StyledParagraph><Checkbox>Lorem Ispum</Checkbox> </StyledParagraph>
        <br />
        <hr />
        <StyledBoldText>Subject</StyledBoldText>
        <Input.Search size="large" />
        <StyledBoldText>Year</StyledBoldText>
        <Input.Search size="large" />
      </MainContainer>
    );
    return (
      <FlexContainer>
        <StyledPopover content={FilterElement} placement="bottomLeft" trigger="click">
          <Container>
            <FilterImg src={FilterIcon} /> Filter
          </Container>
        </StyledPopover>
        <ModalContent>
          <Container onClick={this.showModal}>
            <FilterImg src={FilterIcon} /> Filter
          </Container>
          <StyledModal
            footer={false}
            closable={false}
            visible={this.state.modalshow}
            bodyStyle= {{ height: windowHeight, width: windowWidth }}
          >
            <HeaderContent>
              <FilterHeader>Filters</FilterHeader>
              <StyledCloseIcon onClick={this.handleCancel} type="close" />
            </HeaderContent>
            {FilterElement}
          </StyledModal>
        </ModalContent>

      </FlexContainer>
    );
  }
}

export default FilterBar;

const Container = styled.div`
  padding: 10px 15px 14px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover{
    background-color: #fff;
    padding: 10px 15px 10px 15px;
  }
  @media (max-width: 770px) {
    background-color: #fff;
    border-radius:5px;
    padding: 9px 25px 11px 25px;
    
  }
`;
const FilterImg = styled.img`
  margin-right: 15px;
  width: 17px;
`;
const MainContainer = styled.div`
  width: 260px;
  text-align: center;
  padding: 10px;
  @media (max-width: ${mobileWidth}) {
    width: 100%;
    padding: 30px;
  }
  @media (max-width: ${tabletWidth}) {
    width: 100%;
    padding: 30px;
  }
`;
const StyledPopover = styled(Popover)`
  @media (max-width: ${mobileWidth}) {
    display: none;
  }
  @media (max-width: ${tabletWidth}) {
    display: none;
  }
`;

const StyledBoldText = styled.p`
  fontWeight: bold;
  margin: 15px 0px 10px 0px;
  text-align: left;
`;

const StyledParagraph = styled.p`
  margin: 15px 0px 10px 0px;
  text-align: left;
`;
const ModalContent = styled.div`
  display: none;
  @media (max-width: ${mobileWidth}) {
    display: block;
  }
  @media (max-width: ${tabletWidth}) {
    display: block;
  }
`;

const StyledModal = styled(Modal)`
  @media (max-width: ${mobileWidth}){
    position: absolute;
    top: -10px;
    left: -10px;
    .ant-modal-body{
      padding: 0px !important;
    }
  }
  @media (max-width: ${tabletWidth}){
    position: absolute;
    top: -10px;
    left: -10px;
    .ant-modal-body{
      padding: 0px !important;
    }
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
