import PropTypes from 'prop-types';
import React from 'react';
import { withNamespaces } from '@edulastic/localization';

import FlexContainer from '../../common/FlexContainer';
import ItemContainter from './ItemContainter';
import Circle from '../../common/Circle';
import Content from './Content';

const QuestionListItem = ({
  index,
  active,
  beforeSelection,
  t,
  gotoQuestion
}) => (
  <ItemContainter
    active={active}
    onClick={() => {
      gotoQuestion(index);
    }}
  >
    <FlexContainer alignItems="center">
      <Circle r={6} active={active} hide={!beforeSelection} />
      <Content active={active}>
        {t('common.layout.questionlist.question')} {index + 1}
      </Content>
    </FlexContainer>
  </ItemContainter>
);

QuestionListItem.propTypes = {
  beforeSelection: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  gotoQuestion: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces('student')(QuestionListItem);
