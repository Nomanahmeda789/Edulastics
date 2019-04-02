import styled from 'styled-components';
import { grey, green, red, lightGreen, lightRed } from '@edulastic/colors';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  cursor: pointer;
  border-radius: 4px;
  border: ${props =>
    (props.style && props.style.border ? props.style.border : `1px solid ${grey}`)};
`;

export const StyledDragHandle = styled.div`
  width: ${props => (props.smallSize ? 30 : 50)}px;
  flex: 1;
  border-right: 1px solid ${grey};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const Text = styled.div`
  resize: none;
  width: ${({ showDragHandle, smallSize }) =>
    (showDragHandle ? (smallSize ? 'calc(100% - 30px)' : 'calc(100% - 50px)') : '100%')};
  height: 100%;
  border: ${({ checkStyle }) => (checkStyle ? 'none' : '')};
  border-left: ${({ checkStyle, correct }) =>
    (checkStyle ? (correct ? `2px solid ${green}` : `2px solid ${red}`) : 'none')};
  background: ${({ checkStyle, correct }) =>
    (checkStyle ? (correct ? `${lightGreen}` : `${lightRed}`) : 'none')};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  min-height: ${({ smallSize }) => (smallSize ? 20 : 31)}px;
  padding: ${({ smallSize }) => (smallSize ? '5px' : '15px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ smallSize }) => (smallSize ? '13px' : '16px')};
`;

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

export const TextEmpty = styled.div`
  resize: none;
  width: ${({ showDragHandle, smallSize }) =>
    (showDragHandle ? (smallSize ? 'calc(100% - 30px)' : 'calc(100% - 50px)') : '100%')};
  height: 100%;
  border-radius: 4px;
  min-height: ${({ smallSize }) => (smallSize ? 31 : 56)}px;
  padding: ${({ smallSize }) => (smallSize ? '5px' : '15px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ smallSize }) => (smallSize ? '13px' : '16px')};
`;

export const WithIndex = styled.div`
  font-size: 26px;
  font-weight: 600;
  margin-right: 50px;
  margin-left: 30px;
  line-height: 0.8;
`;
