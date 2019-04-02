import styled from 'styled-components';

const ItemContainer = styled.div`
  border-left: solid 3px
    ${props => (props.active ? props.theme.sidebarContentBorderColor : 'transparent')};
  padding: 18px 10px;
  margin: 5px 0 5px 40px;
  box-sizing: border-box;
`;

export default ItemContainer;
