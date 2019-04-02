import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';
import { greenDark, green } from '@edulastic/colors';

const DragHandle = SortableHandle(({ smallSize }) => (
  <Container smallSize={smallSize}>
    <FaBars />
  </Container>
));

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
  padding-left: 10px;
  color: ${green};
  font-size: ${props => (props.smallSize ? 14 : 25)}px;

  :hover {
    cursor: pointer;
    color: ${greenDark};
  }
`;
export default DragHandle;
