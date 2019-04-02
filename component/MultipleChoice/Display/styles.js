import styled from 'styled-components';
import { green } from '@edulastic/colors';

export const CheckboxContainer = styled.div`
  width: ${props => (props.smallSize ? 22 : 36)}px;
  height: ${props => (props.smallSize ? 22 : 36)}px;
  padding: ${props => (props.smallSize ? 0 : 0)}px;
  border: solid 2px ${green};
  border-radius: 50%;
  box-sizing: border-box;
  margin-right: 10px;

  & input {
    opacity: 0;
    display: none;
  }

  & div {
    width: 100%;
    height: 100%;
    display: block;
    line-height: 1;
  }

  & span {
    width: 100%;
    height: 100%;
    display: ${props => (props.smallSize ? 'block' : 'flex')};
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: transparent;
    -webkit-transition: backgroundColor 0.6s;
    transition: backgroundColor 0.6s;
    text-align: center;
    font-size: ${props => (props.smallSize ? '15px' : '20px')};
    font-weight: 700;
    color: #444444;
  }

  & div {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: ${props => (props.smallSize ? 'block' : 'none')};
    background-color: 'transparent';
  }

  & input:checked + span {
    color: white;
    background-color: ${green};
    -webkit-transition: backgroundColor 0.6s;
    transition: backgroundColor 0.6s;
  }

  & input:checked + span + div {
    background-color: ${green};
    -webkit-transition: backgroundColor 0.6s;
    transition: backgroundColor 0.6s;
    display: none;
  }
`;

export const MultiChoiceContent = styled.div`
  font-size: ${props => props.fontSize || '13px'};
  color: ${props => props.theme.mainContentTextColor};
  display: flex;
  flex: 1;
  align-items: center;
  font-weight: 600;
`;

export const ProblemContainer = styled.div`
  font-size: ${props => (props.smallSize ? 14 : 20)}px;
  padding: ${props => (props.smallSize ? '15px 0 10px' : '20px 0')};
  font-weight: bold;

  & strong {
    font-size: 28px;
  }
`;

export const Label = styled.label`
  position: relative;
  display: inline-block;
  padding-left: ${props => (props.smallSize ? 5 : 20)}px;
  border: dotted 1px transparent;
  border-left: solid 3px transparent;
  margin: ${props => (props.setAnswers ? '5px 0' : '10px 0')};
  width: ${props => props.width || '100%'};

  &:hover {
    border: dotted 1px lightgrey;
    border-left: solid 3px lightgrey;
    cursor: pointer;
  }

  &.checked {
    background-color: #fcfbd4;
    border-left: solid 3px #c3c055;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &.right {
    background-color: #1fe3a11e;
    border-left: solid 3px ${green};
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  &.wrong {
    background-color: #ee16581e;
    border-left: solid 3px #ee1658;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  & i {
    font-size: 18px;
    line-height: 1;
  }
  & .fa-check {
    color: ${green};
  }
  & .fa-times {
    color: #ee1658;
  }
`;

export const Icon = styled.div`
  position: absolute;
  right: 10px;
  top: calc(50% - 10px);
`;

export const OptionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
