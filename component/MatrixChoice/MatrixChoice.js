import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@edulastic/common';
import styled from 'styled-components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { arrayMove } from 'react-sortable-hoc';
import { withRouter } from 'react-router-dom';
import { withNamespaces } from '@edulastic/localization';

import { QuestionTextArea, Subtitle, SortableList } from '../common';
import withAddButton from '../HOC/withAddButton';
import { setQuestionDataAction } from '../../../../author/src/actions/question';
import Options from './Options';
import Answers from './Answers';
import Preview from './Preview';

const EmptyWrapper = styled.div``;
const List = withAddButton(SortableList);

const MatrixChoice = ({
  view,
  testItem,
  previewTab,
  item,
  setQuestionData,
  saveAnswer,
  userAnswer,
  smallSize
}) => {
  const Wrapper = testItem ? EmptyWrapper : Paper;

  const handleSortEndStems = ({ oldIndex, newIndex }) => {
    const newItem = cloneDeep(item);

    newItem.stems = arrayMove(item.stems, oldIndex, newIndex);
    setQuestionData(newItem);
  };

  const handleRemoveStem = (index) => {
    const newItem = cloneDeep(item);
    newItem.stems.splice(index, 1);
    setQuestionData(newItem);
  };

  const handleAddStem = () => {
    const newItem = cloneDeep(item);

    newItem.stems.push('');
    setQuestionData(newItem);
  };

  const handleChangeStem = (index, value) => {
    const newItem = cloneDeep(item);

    newItem.stems[index] = value;
    setQuestionData(newItem);
  };

  const handleChangeOption = (index, value) => {
    const newItem = cloneDeep(item);

    newItem.options[index] = value;
    setQuestionData(newItem);
  };

  const reduceResponseValue = (val, index) => {
    if (!val) return val;

    val = val.filter(i => i !== index);
    if (!val.length) {
      return null;
    }

    return val;
  };

  const handleRemoveOption = (index) => {
    const newItem = cloneDeep(item);

    newItem.options.splice(index, 1);
    newItem.validation.valid_response.value = newItem.validation.valid_response.value.map(val =>
      reduceResponseValue(val, index));

    if (newItem.validation.alt_responses && newItem.validation.alt_responses.length) {
      newItem.validation.alt_responses.map((res) => {
        res.value = res.value.map(val => reduceResponseValue(val, index));
        return res;
      });
    }

    setQuestionData(newItem);
  };

  const handleAddOption = () => {
    const newItem = cloneDeep(item);

    newItem.options.push('');
    setQuestionData(newItem);
  };
  const handleSortEndOptions = ({ oldIndex, newIndex }) => {
    const newItem = cloneDeep(item);

    newItem.options = arrayMove(item.options, oldIndex, newIndex);
    setQuestionData(newItem);
  };

  const handleItemChangeChange = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    newItem[prop] = uiStyle;
    setQuestionData(newItem);
  };

  let answer = userAnswer;

  if (!userAnswer) {
    answer = {
      value: item.stems.map(() => null)
    };
  } else if (Array.isArray(userAnswer)) {
    answer = {
      value: userAnswer
    };
  }

  return (
    <Fragment>
      {view === 'edit' && (
        <Fragment>
          <Paper style={{ marginBottom: 30 }}>
            <QuestionTextArea
              placeholder="Enter question"
              onChange={stimulus => handleItemChangeChange('stimulus', stimulus)}
              value={item.stimulus}
            />
            <Subtitle>Multiple Choice Options</Subtitle>
            <List
              items={item.stems}
              onSortEnd={handleSortEndStems}
              useDragHandle
              onRemove={handleRemoveStem}
              onChange={handleChangeStem}
              onAdd={handleAddStem}
              columns={2}
              prefix="list1"
            />
            <Subtitle>Steams</Subtitle>
            <List
              items={item.options}
              onSortEnd={handleSortEndOptions}
              useDragHandle
              onRemove={handleRemoveOption}
              onChange={handleChangeOption}
              onAdd={handleAddOption}
              columns={2}
              prefix="list2"
            />
            <Answers item={item} setQuestionData={setQuestionData} />
          </Paper>
          <Options onChange={handleItemChangeChange} uiStyle={item.ui_style} />
        </Fragment>
      )}
      {view === 'preview' && (
        <Wrapper>
          {previewTab === 'check' && (
            <Preview type="check" saveAnswer={saveAnswer} userAnswer={answer} item={item} />
          )}

          {previewTab === 'show' && (
            <Preview type="show" saveAnswer={saveAnswer} userAnswer={answer} item={item} />
          )}

          {previewTab === 'clear' && (
            <Preview
              smallSize={smallSize}
              type="clear"
              saveAnswer={saveAnswer}
              userAnswer={answer}
              item={item}
            />
          )}
        </Wrapper>
      )}
    </Fragment>
  );
};

MatrixChoice.propTypes = {
  view: PropTypes.string.isRequired,
  userAnswer: PropTypes.object,
  saveAnswer: PropTypes.func.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  smallSize: PropTypes.bool,
  previewTab: PropTypes.string,
  testItem: PropTypes.bool,
  item: PropTypes.object
};

MatrixChoice.defaultProps = {
  previewTab: 'clear',
  testItem: false,
  item: {},
  userAnswer: null,
  smallSize: false
};

const enhance = compose(
  withRouter,
  withNamespaces('assessment'),
  connect(
    null,
    {
      setQuestionData: setQuestionDataAction
    }
  )
);

export default enhance(MatrixChoice);
