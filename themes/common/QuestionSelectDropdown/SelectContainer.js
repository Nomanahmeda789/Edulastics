import styled from 'styled-components';

const SelectContainer = styled.div`
  position: relative;
  width: 200px;
  display: flex;
  align-items: center;

  .ant-select {
    height: 40px;
    width: 100%;
  }
  .ant-select-selection {
    display: flex;
    align-items: center;
    padding-left: 10px;
  }
  .ant-select-selection-selected-value {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: #434b5d;
  }
  .anticon-down {
    svg {
      fill: #00b0ff;
    }
  }
  @media (max-width: 760px) {
    height: 52px;
    width: 188px;
  }
`;

export default SelectContainer;
