import styled from 'styled-components';

const AddNewChoiceBtn = styled.a`
  width: 227px;
  height: 40px;
  border-radius: 65px;
  border: solid 1px #12a6e8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  font-family: 'Open Sans';
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.36;
  letter-spacing: 0.2px;
  text-align: center;
  color: #00b0ff;

  &:hover {
    background-color: #00b0ff;
    color: #ffffff;
  }
  &:active {
    background-color: #59c7f9;
    color: #eee;
  }
`;

export default AddNewChoiceBtn;
