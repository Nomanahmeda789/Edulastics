import styled from 'styled-components';

const Sidebar = styled.div`
  flex: 2;
  background-color: ${props => props.theme.sidebarBgColor};
  color: ${props => props.theme.sidebarTextColor};

  @media (max-width: 760px) {
    display: none;
  }
`;

export default Sidebar;
