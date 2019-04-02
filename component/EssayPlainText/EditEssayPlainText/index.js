import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import { Checkbox } from 'antd';

import { withNamespaces } from '@edulastic/localization';
import { Paper, FlexContainer } from '@edulastic/common';

import { QuestionTextArea, Subtitle, WordLimitAndCount } from '../../common';

const EditEssayPlainText = ({ item, setQuestionData, t }) => {
  const handleItemChangeChange = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    newItem[prop] = uiStyle;
    setQuestionData(newItem);
  };

  return (
    <Fragment>
      <Paper style={{ marginBottom: 30 }}>
        <Subtitle>{t('component.sortList.editQuestionSubtitle')}</Subtitle>
        <QuestionTextArea
          placeholder="Enter question"
          onChange={stimulus => handleItemChangeChange('stimulus', stimulus)}
          value={item.stimulus}
        />
        <Subtitle>{t('component.essayPlainText.formattinOptions')}</Subtitle>
        <FlexContainer childMarginRight={100}>
          <Checkbox
            defaultChecked={item.show_copy}
            onChange={e => handleItemChangeChange('show_copy', e.target.checked)}
          >
            {t('component.essayPlainText.copy')}
          </Checkbox>
          <Checkbox
            defaultChecked={item.show_cut}
            onChange={e => handleItemChangeChange('show_cut', e.target.checked)}
          >
            {t('component.essayPlainText.cut')}
          </Checkbox>
          <Checkbox
            defaultChecked={item.show_paste}
            onChange={e => handleItemChangeChange('show_paste', e.target.checked)}
          >
            {t('component.essayPlainText.paste')}
          </Checkbox>
        </FlexContainer>

        <WordLimitAndCount
          onChange={handleItemChangeChange}
          selectValue={item.show_word_limit}
          inputValue={item.max_word}
        />

        <Checkbox
          style={{ marginTop: 32 }}
          defaultChecked={item.show_word_count}
          onChange={e => handleItemChangeChange('show_word_count', e.target.checked)}
        >
          {t('component.essayRichText.showWordCheckbox')}
        </Checkbox>
      </Paper>
    </Fragment>
  );
};

EditEssayPlainText.propTypes = {
  item: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces('assessment')(EditEssayPlainText);
