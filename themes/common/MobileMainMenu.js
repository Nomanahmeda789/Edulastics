import styled from 'styled-components';

const MobileMainMenu = styled.div`
  display: none;

  @media (max-width: 760px) {
    display: block;
  }
`;

export default MobileMainMenu;
