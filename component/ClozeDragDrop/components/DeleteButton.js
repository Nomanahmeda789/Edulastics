import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconTrashAlt } from '@edulastic/icons';
import { green, greenDark, red, lightGrey } from '@edulastic/colors';

const DeleteButton = ({ onDelete }) => (
  <Container onClick={onDelete}>
    <IconTrashAlt color={greenDark} hoverColor={red} />
  </Container>
);

DeleteButton.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default React.memo(DeleteButton);

const Container = styled.div`
  width: 50px;
  height: 50px;
  display: inline-flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  color: ${green};
  font-weight: 300;

  :hover {
    cursor: pointer;
    color: ${red};
    background: ${lightGrey};
  }
`;
