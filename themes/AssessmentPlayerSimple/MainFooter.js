import styled from 'styled-components';

const MainFooter = styled.div`
  background: transparent;
  padding: 50px 0;
  height: 60px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1600px) {
    padding: 60px 0;
  }
  @media (max-width: 760px) {
    display: none;
  }
`;

export default MainFooter;
