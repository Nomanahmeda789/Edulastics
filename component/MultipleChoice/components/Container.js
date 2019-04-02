import styled from 'styled-components';

const Container = styled.div`
  width: 1260px;
  margin: 10px auto;
  background: #ffffff;
  border-radius: 10px;
  padding: 16px 60px;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  pointer-events: ${props => (props.disabled ? 'none' : 'inherit')};
`;

export default Container;
