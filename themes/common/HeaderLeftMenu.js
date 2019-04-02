import styled from 'styled-components';

const HeaderLeftMenu = styled.div`
  text-align: left;
  height: 60px;
  min-width: 70px;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default HeaderLeftMenu;
