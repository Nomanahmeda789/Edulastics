/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {  Menu } from 'antd';
import simpleIcon from '../../assets/assignments/icon.svg';
import classIcon from '../../assets/assignments/manage-class.svg';
import copyItem from '../../assets/assignments/copy-item.svg';
import viewIcon from '../../assets/assignments/view.svg';
import infomationIcon from '../../assets/assignments/information.svg';
import responsiveIcon from '../../assets/assignments/responses.svg';
import toolsIcon from '../../assets/assignments/printing-tool.svg';
import devIcon from '../../assets/assignments/dev.svg';
import googleIcon from '../../assets/assignments/Google Classroom.svg';
import {
  tabletWidth,
  mobileWidth
} from '@edulastic/colors';

class ActionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    const MenuItems = [];
    MenuItems.push(
      <Menu.Item>
        <StyledLink target="_blank" rel="noopener noreferrer">
          <img alt="icon" src={simpleIcon} /><SpaceElement />Add/Edit Assignment
        </StyledLink>
       </Menu.Item>
    );
    MenuItems.push(
      <Menu.Item>
        <StyledLink target="_blank" rel="noopener noreferrer">
          <img alt="icon" src={classIcon} /><SpaceElement />Edit Assessment
        </StyledLink>
      </Menu.Item>
    );
    MenuItems.push(
      <Menu.Item>
        <StyledLink target="_blank" rel="noopener noreferrer">
          <img alt="icon" src={copyItem} /><SpaceElement />Duplicate
        </StyledLink>
      </Menu.Item>
    );
    MenuItems.push(
      <Menu.Item>
         <StyledLink target="_blank" rel="noopener noreferrer">
          <img alt="icon" src={viewIcon} /><SpaceElement />Preview
        </StyledLink>
      </Menu.Item>
    );
    MenuItems.push(
      <Menu.Item>
        <StyledLink target="_blank" rel="noopener noreferrer">
          <img alt="icon" src={infomationIcon} /><SpaceElement />View Details
        </StyledLink>
      </Menu.Item>
    );
    MenuItems.push(
      <Menu.Item>
        <StyledLink target="_blank" rel="noopener noreferrer">
          <img alt="icon" src={responsiveIcon} /><SpaceElement />Responses
        </StyledLink>
      </Menu.Item>
    );
    MenuItems.push(
      <Menu.Item>
        <StyledLink target="_blank" rel="noopener noreferrer">
          <img alt="icon" src={toolsIcon} /><SpaceElement />Print
        </StyledLink>
      </Menu.Item>
    );
    MenuItems.push(
      <Menu.Item>
        <StyledLink target="_blank" rel="noopener noreferrer">
          <img alt="icon" src={devIcon} /><SpaceElement />Embed
        </StyledLink>
      </Menu.Item>
    );
    MenuItems.push(
      <Menu.Item>
        <StyledLink target="_blank" rel="noopener noreferrer">
          <img alt="icon" src={googleIcon} /><SpaceElement />GClassroom
        </StyledLink>
      </Menu.Item>
    );
    return (
      <Container>
        <StyledMenu>
          {MenuItems}
        </StyledMenu>
      </Container>
    );
  }
}

export default ActionMenu;

const Container = styled.div`
  padding: 30;
  left: 0;
  right: 0;
  height: 100%;
`;
const StyledMenu = styled(Menu)`
  border: 0px;
  @media (max-width: ${mobileWidth}) {
    padding-left: 30px;
    padding-right: 30px;
  }
  @media (max-width: ${tabletWidth}) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;
const StyledLink = styled.a`
  margin-top: 2px;
`;
const SpaceElement = styled.div`
  display: inline-block;
  width: 10px;
`;
