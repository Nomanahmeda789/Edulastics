import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { mainBlueColor, white } from '@edulastic/colors';
import { CorrectAnswersContainer } from '@edulastic/common';

import { withNamespaces } from '@edulastic/localization';

const ShowCorrect = ({ list, correctList, source, t }) => (
  <CorrectAnswersContainer title={t('component.sortList.correctAnswers')}>
    <FlexRow>
      {list.map((item, i) => (
        <Item key={i}>
          <Index>{correctList.indexOf(source.indexOf(item)) + 1}</Index>
          <Content dangerouslySetInnerHTML={{ __html: item }} />
        </Item>
      ))}
    </FlexRow>
  </CorrectAnswersContainer>
);

ShowCorrect.propTypes = {
  list: PropTypes.array.isRequired,
  correctList: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  source: PropTypes.array.isRequired
};

export default withNamespaces('assessment')(ShowCorrect);

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Item = styled(FlexRow)`
  align-items: stretch;
  height: 40px;
  border-radius: 4px;
  background-color: ${white};
  margin-right: 10px;
  font-weight: 600;
  margin-top: 14px;
`;

const Index = styled(FlexRow)`
  align-items: center;
  justify-content: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  width: 40px;
  height: 40px;
  color: ${white};
  background-color: ${mainBlueColor};
`;

const Content = styled(FlexRow)`
  align-items: center;
  padding-right: 36px;
  padding-left: 36px;
  white-space: nowrap;
`;
