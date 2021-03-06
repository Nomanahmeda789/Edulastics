import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import styled from 'styled-components';

import { Paper, Stimulus, FlexContainer } from '@edulastic/common';
import { withNamespaces } from '@edulastic/localization';
import { dashBorderColor, lightGrey, red, lightRed } from '@edulastic/colors';

import { Toolbar, Item } from '../../common';
import {
  COPY,
  CUT,
  PASTE,
  ON_LIMIT,
  ALWAYS,
  PREVIEW
} from '../../../constants/constantsForQuestions';

const EssayPlainTextPreview = ({ view, saveAnswer, t, item, smallSize, userAnswer }) => {
  const [text, setText] = useState(Array.isArray(userAnswer) ? '' : userAnswer);

  const [wordCount, setWordCount] = useState(text.split(' ').filter(i => !!i).length);

  const [selection, setSelection] = useState(null);

  const [buffer, setBuffer] = useState('');

  const [cursor, setCursor] = useState(null);

  let node;

  const handleTextChange = (e) => {
    const val = e.target.value;
    setText(val);
    setWordCount(val.split(' ').filter(i => !!i).length);
    saveAnswer(val);
  };

  const handleSelect = () => {
    if (node.textAreaRef.selectionStart !== node.textAreaRef.selectionEnd) {
      setSelection({ start: node.textAreaRef.selectionStart, end: node.textAreaRef.selectionEnd });
    } else {
      setSelection(null);
    }

    setCursor({ start: node.textAreaRef.selectionStart, end: node.textAreaRef.selectionEnd });
  };

  const handleAction = action => () => {
    switch (action) {
      case COPY:
        if (selection) {
          setBuffer(text.slice(selection.start, selection.end));
        }
        break;
      case CUT: {
        if (selection) {
          setBuffer(text.slice(selection.start, selection.end));
          setText(text.slice(0, selection.start) + text.slice(selection.end));
        }
        break;
      }
      case PASTE: {
        if (cursor.end) {
          setText(text.slice(0, cursor.start) + buffer + text.slice(cursor.end));
        } else {
          setText(text.slice(0, cursor.start) + buffer + text.slice(cursor.start));
        }
        break;
      }

      default:
        break;
    }
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

      <Toolbar borderRadiusOnlyTop style={{ borderBottom: 0 }}>
        <FlexContainer childMarginRight={0} alignItems="stretch" justifyContent="space-between">
          {item.show_copy && (
            <ToolbarItem onClick={handleAction(COPY)}>
              {t('component.essayPlainText.copy')}
            </ToolbarItem>
          )}
          {item.show_cut && (
            <ToolbarItem onClick={handleAction(CUT)}>
              {t('component.essayPlainText.cut')}
            </ToolbarItem>
          )}
          {item.show_paste && (
            <ToolbarItem onClick={handleAction(PASTE)}>
              {t('component.essayPlainText.paste')}
            </ToolbarItem>
          )}
        </FlexContainer>
      </Toolbar>

      <Input.TextArea
        ref={(ref) => {
          node = ref;
        }}
        style={{
          borderRadius: 0,
          background: item.max_word < wordCount ? lightRed : 'transparent'
        }}
        rows={4}
        onSelect={handleSelect}
        value={smallSize ? t('component.essayPlainText.templateText') : text}
        onChange={handleTextChange}
        size="large"
      />

      {item.show_word_count && (
        <Toolbar borderRadiusOnlyBottom style={{ borderTop: 0 }}>
          <FlexContainer alignItems="stretch" justifyContent="space-between" />

          <Item style={wordCountStyle}>{displayWordCount}</Item>
        </Toolbar>
      )}
    </Paper>
  );
};

EssayPlainTextPreview.propTypes = {
  t: PropTypes.func.isRequired,
  smallSize: PropTypes.bool,
  item: PropTypes.object.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  view: PropTypes.string.isRequired,
  userAnswer: PropTypes.any.isRequired
};

EssayPlainTextPreview.defaultProps = {
  smallSize: false
};

export default withNamespaces('assessment')(EssayPlainTextPreview);

const ToolbarItem = styled(Item)`
  &:hover {
    cursor: pointer;
    background: ${dashBorderColor};
  }
  &:active {
    background: ${lightGrey};
  }
`;
