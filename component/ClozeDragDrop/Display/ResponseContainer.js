import styled from 'styled-components';

const ResponseContainer = styled.span`
  border: 2px dotted ${props => (props.smallSize ? '#e6e6e6' : 'black')};
  min-width: ${props => (props.smallSize ? 140 : 50)}px;
  /* min-height: 30px; */
  padding: 5px 10px;
  margin: 0 10px 5px;
  min-height: ${props => (props.smallSize ? 40 : 30)}px;
  display: inline-flex !important;
  align-items: center;
  border-radius: 10px;
`;

export default ResponseContainer;
