import styled from 'styled-components';

const Main = styled.main`
  background-color: ${props => props.theme.mainBgColor};
  padding: ${props => (props.skin ? '90px 0 0' : '144px 0 0')};
  display: ${props => (props.skin ? 'block' : 'flex')};
  min-height: ${props => (props.skin ? '0' : '100vh')};
  box-sizing: border-box;

  & p {
    margin: 0;
  }

  @media (max-width: 760px) {
    padding: 174px 26px 0;
  }
`;

export default Main;
