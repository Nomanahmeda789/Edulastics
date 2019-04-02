import styled from 'styled-components';

const Content = styled.div`
  color: ${props => (props.active ? props.theme.sidebarActiveTextColor : props.theme.sidebarTextColor)};
  font-size: ${props => props.theme.sidebarFontSize};
  line-height: 1;
  letter-spacing: 0.2px;
  text-transform: capitalize;
`;

export default Content;
