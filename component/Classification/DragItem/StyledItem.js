import styled from 'styled-components';

import { white, red, blue, green } from '@edulastic/colors';

export const getStyles = (isDragging, backgroundColor, borderColor, styles = {}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: isDragging ? 0 : 1,
  minWidth: 136,
  minHeight: 40,
  borderRadius: 5,
  border: `1px solid ${borderColor}`,
  backgroundColor,
  paddingRight: 40,
  cursor: 'pointer',
  paddingLeft: 40,
  ...styles
});

export const IndexBox = styled.div`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  color: ${white};
  background: ${({ preview, valid }) =>
    (valid && preview ? green : preview && valid !== undefined ? red : blue)};
`;
