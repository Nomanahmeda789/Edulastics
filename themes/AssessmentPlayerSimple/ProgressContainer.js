import styled from 'styled-components';

const ProgressContainer = styled.div`
  width: 600px;

  @media (max-width: 1600px) {
    width: 740px;
  }
  @media (max-width: 760px) {
    width: 120px;

    & .rc-progress-line {
      height: 7px;
      width: 110px;
    }
  }
`;

export default ProgressContainer;
