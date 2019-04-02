import styled from 'styled-components';

const CheckboxContainer = styled.div`
  width: 20px;
  height: 20px;
  border: solid 2px #b1b1b1;
  border-radius: 5px;
  padding: 2px;
  box-sizing: border-box;
  margin-right: 10px;

  & input {
    opacity: 0;
    display: none;
  }

  & div {
    width: 100%;
    height: 100%;
    display: block;
    line-height: 1;
  }

  & span {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 3px;
    background-color: transparent;
    -webkit-transition: backgroundColor 0.6s;
    transition: backgroundColor 0.6s;
  }

  & input:checked + span {
    background-color: #1fe3a1;
    -webkit-transition: backgroundColor 0.6s;
    transition: backgroundColor 0.6s;
  }
`;

export default CheckboxContainer;
