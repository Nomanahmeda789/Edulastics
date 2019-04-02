import styled from 'styled-components';

const MainContent = styled.div`
  background-color:  ${props => props.theme.mainContentBgColor};
  color: ${props => props.theme.mainContentTextColor};
  border-radius: 10px;
  height: 600px;
  padding: 40px;
  text-align: left;
  font-size: 18px;
  overflow: auto;
  
  & * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  @media (max-width: 760px) {
    padding: 24px;
  }
`;

export default MainContent;
