import styled from 'styled-components';

const Label = styled.label`
  max-width: 960px;
  display: block;
  padding-left: 20px;
  border: dotted 1px transparent;
  border-left: solid 3px transparent;
  margin: ${props => (props.setAnswers ? '5px 0' : '10px 0')};

  &:hover {
    border: dotted 1px lightgrey;
    border-left: solid 3px lightgrey;
  }

  &.right {
    background-color: #1fe3a11e;
    border-left: solid 3px #1fe3a1;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  &.wrong {
    background-color: #ee16581e;
    border-left: solid 3px #ee1658;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
  & i {
    font-size: 18px;
    line-height: 1;
  }
  & .fa-check {
    color: #1fe3a1;
  }
  & .fa-times {
    color: #ee1658;
  }
`;

export default Label;
