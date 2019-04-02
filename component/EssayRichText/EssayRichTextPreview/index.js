import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';

import { Paper, Stimulus, FlexContainer } from '@edulastic/common';
import { withNamespaces } from '@edulastic/localization';
import { red, lightRed } from '@edulastic/colors';

import { Toolbar, Item } from '../../common';
import { validList } from '../constants';
import { PREVIEW, ON_LIMIT, ALWAYS } from '../../../constants/constantsForQuestions';

const EssayRichTextPreview = ({ view, saveAnswer, t, item, smallSize, userAnswer }) => {
  const [wordCount, setWordCount] = useState(
    Array.isArray(userAnswer) ? 0 : userAnswer.split(' ').filter(i => !!i.trim()).length
  );

  const handleTextChange = (val, a, b, editor) => {
    setWordCount(
      editor
        .getText()
        .split(' ')
        .filter(i => !!i.trim()).length
    );
    saveAnswer(val);
  };

  const showLimitAlways = item.show_word_limit === ALWAYS;

  const showOnLimit = item.show_word_limit === ON_LIMIT;

  const displayWordCount =
    (showOnLimit && item.max_word < wordCount) || showLimitAlways
      ? `${wordCount} / ${item.max_word} ${t('component.essayPlainText.wordsLimitTitle')}`
      : `${wordCount} ${t('component.essayPlainText.wordsTitle')}`;

  const wordCountStyle =
    (showLimitAlways || showOnLimit) && item.max_word < wordCount ? { color: red } : {};

  return (
    <Paper padding={smallSize} boxShadow={smallSize ? 'none' : ''}>
      {view === PREVIEW && !smallSize && (
        <Stimulus dangerouslySetInnerHTML={{ __html: item.stimulus }} />
      )}

      <ReactQuill
        id="mainQuill"
        style={item.max_word < wordCount ? { background: lightRed } : { background: 'transparent' }}
        defaultValue={
          smallSize
            ? t('component.essayRichText.templateText')
            : Array.isArray(userAnswer)
              ? ''
              : userAnswer
        }
        onChange={handleTextChange}
        modules={EssayRichTextPreview.modules(item.formatting_options)}
      />

      {item.show_word_count && (
        <Toolbar borderRadiusOnlyBottom>
          <FlexContainer />
          <Item style={wordCountStyle}>{displayWordCount}</Item>
        </Toolbar>
      )}
    </Paper>
  );
};

EssayRichTextPreview.propTypes = {
  t: PropTypes.func.isRequired,
  smallSize: PropTypes.bool,
  item: PropTypes.object.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  userAnswer: PropTypes.any.isRequired
};

EssayRichTextPreview.defaultProps = {
  smallSize: false
};

const toolbarOptions = (options) => {
  const arrSorted = options
    .filter(ite => ite.active)
    .map((item) => {
      const { value, param } = item;
      return validList.includes(value) ? { [value]: param } : value;
    });

  const arr = [];
  let ind = 0;

  arrSorted.forEach((item, i) => {
    if (item === '|') {
      if (arrSorted[i + 1] === '|') {
        arrSorted.splice(i + 1, 1);
      }
      arr.push(arrSorted.slice(ind, i));
      ind = i + 1;
    }
    if (i === arrSorted.length - 1 && item !== '|') {
      arr.push(arrSorted.slice(ind));
    }
  });

  return arr;
};

EssayRichTextPreview.modules = options => ({
  toolbar: toolbarOptions(options)
});

EssayRichTextPreview.formats = [
  'header',
  'script',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'align'
];

export default withNamespaces('assessment')(EssayRichTextPreview);
