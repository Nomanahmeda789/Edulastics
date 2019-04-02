import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep } from 'lodash';
import { arrayMove } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'antd';

import { Paper } from '@edulastic/common';
import { withNamespaces } from '@edulastic/localization';
import { secondaryTextColor } from '@edulastic/colors';

import {
  QuestionTextArea,
  Subtitle,
  SortableList,
  CorrectAnswers,
  GroupPossibleResponses
} from '../../common';
import { setQuestionDataAction } from '../../../../../author/src/actions/question';
import withAddButton from '../../HOC/withAddButton';
import withPoints from '../../HOC/withPoints';
import ClassificationPreview from '../ClassificationPreview';
import { EDIT } from '../../../constants/constantsForQuestions';

const List = withAddButton(SortableList);

const OptionsList = withPoints(ClassificationPreview);

const actions = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  SORTEND: 'SORTEND'
};

const EditClassification = ({ item, setQuestionData, t }) => {
  const { stimulus, ui_style } = item;

  const [correctTab, setCorrectTab] = useState(0);

  const handleItemChangeChange = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    newItem[prop] = uiStyle;
    setQuestionData(newItem);
  };

  const onGroupPossibleResp = (e) => {
    const newItem = cloneDeep(item);

    newItem.group_possible_responses = e.target.checked;

    setQuestionData(newItem);
  };

  const handleGroupAdd = () => {
    const newItem = cloneDeep(item);

    newItem.possible_response_groups.push({ title: '', responses: [] });

    setQuestionData(newItem);
  };

  const handleGroupRemove = index => () => {
    const newItem = cloneDeep(item);

    const colCount = newItem.ui_style.column_count;
    const rowCount = newItem.ui_style.row_count;

    const initialLength = (colCount || 2) * (rowCount || 1);
    newItem.validation.valid_response.value = Array(...Array(initialLength)).map(() => []);

    newItem.validation.alt_responses.forEach((ite) => {
      ite.value = Array(...Array(initialLength)).map(() => []);
    });

    newItem.possible_response_groups.splice(index, 1);

    setQuestionData(newItem);
  };

  const onAddInner = index => () => {
    const newItem = cloneDeep(item);

    newItem.possible_response_groups[index].responses.push('');

    setQuestionData(newItem);
  };

  const onRemoveInner = ind => (index) => {
    const newItem = cloneDeep(item);

    const colCount = newItem.ui_style.column_count;
    const rowCount = newItem.ui_style.row_count;

    const initialLength = (colCount || 2) * (rowCount || 1);
    newItem.validation.valid_response.value = Array(...Array(initialLength)).map(() => []);

    newItem.validation.alt_responses.forEach((ite) => {
      ite.value = Array(...Array(initialLength)).map(() => []);
    });

    newItem.possible_response_groups[ind].responses.splice(index, 1);

    setQuestionData(newItem);
  };

  const onGroupTitleChange = (index, value) => {
    const newItem = cloneDeep(item);

    newItem.possible_response_groups[index].title = value;

    setQuestionData(newItem);
  };

  const handleGroupSortEnd = index => ({ oldIndex, newIndex }) => {
    const newItem = cloneDeep(item);

    newItem.possible_response_groups[index].responses = arrayMove(
      newItem.possible_response_groups[index].responses,
      oldIndex,
      newIndex
    );

    setQuestionData(newItem);
  };

  const handleGroupChange = ind => (index, value) => {
    const newItem = cloneDeep(item);

    newItem.possible_response_groups[ind].responses[index] = value;

    setQuestionData(newItem);
  };

  const handleMainPossible = action => (restProp) => {
    const newItem = cloneDeep(item);

    switch (action) {
      case actions.ADD:
        newItem.possible_responses.push('');
        break;

      case actions.REMOVE:
        newItem.validation.valid_response.value.forEach((arr) => {
          if (arr.includes(restProp)) {
            arr.splice(arr.indexOf(restProp), 1);
          }
        });
        newItem.validation.alt_responses.forEach((arrs) => {
          arrs.value.forEach((arr) => {
            if (arr.includes(restProp)) {
              arr.splice(arr.indexOf(restProp), 1);
            }
          });
        });
        newItem.possible_responses.splice(restProp, 1);
        break;

      case actions.SORTEND:
        newItem.possible_responses = arrayMove(
          item.possible_responses,
          restProp.oldIndex,
          restProp.newIndex
        );
        break;

      default:
        break;
    }

    setQuestionData(newItem);
  };

  const handleMain = (action, prop) => (restProp) => {
    const newItem = cloneDeep(item);

    switch (action) {
      case actions.ADD:
        newItem.ui_style[prop].push('');
        if (prop === 'column_titles') {
          newItem.ui_style.column_count += 1;
        } else if (prop === 'row_titles') {
          newItem.ui_style.row_count += 1;
        }
        break;

      case actions.REMOVE:
        newItem.ui_style[prop].splice(restProp, 1);
        if (prop === 'column_titles') {
          newItem.ui_style.column_count -= 1;
        } else if (prop === 'row_titles') {
          newItem.ui_style.row_count -= 1;
        }
        break;

      case actions.SORTEND:
        newItem.ui_style[prop] = arrayMove(
          item.ui_style[prop],
          restProp.oldIndex,
          restProp.newIndex
        );
        break;

      default:
        break;
    }

    setQuestionData(newItem);
  };

  const handleChange = prop => (index, value) => {
    const newItem = cloneDeep(item);

    newItem.ui_style[prop][index] = value;
    setQuestionData(newItem);
  };

  const handleChangePossible = () => (index, value) => {
    const newItem = cloneDeep(item);

    newItem.possible_responses[index] = value;
    setQuestionData(newItem);
  };

  const onUiChange = prop => (val) => {
    const newItem = cloneDeep(item);

    newItem.ui_style[prop] = val;

    const colCount = newItem.ui_style.column_count;
    const rowCount = newItem.ui_style.row_count;

    const initialLength = (colCount || 2) * (rowCount || 1);

    if (prop === 'column_count' || prop === 'row_count') {
      newItem.validation.valid_response.value = Array(...Array(initialLength)).map(() => []);

      newItem.validation.alt_responses.forEach((ite) => {
        ite.value = Array(...Array(initialLength)).map(() => []);
      });
    }

    setQuestionData(newItem);
  };

  const handleAddAnswer = () => {
    const newItem = cloneDeep(item);

    if (!newItem.validation.alt_responses) {
      newItem.validation.alt_responses = [];
    }
    newItem.validation.alt_responses.push({
      score: 1,
      value: item.validation.valid_response.value
    });

    setQuestionData(newItem);
    setCorrectTab(correctTab + 1);
  };

  const handleCloseTab = (tabIndex) => {
    const newItem = cloneDeep(item);
    newItem.validation.alt_responses.splice(tabIndex, 1);

    setCorrectTab(0);
    setQuestionData(newItem);
  };

  const handlePointsChange = (val) => {
    const newItem = cloneDeep(item);

    if (correctTab === 0) {
      newItem.validation.valid_response.score = val;
    } else {
      newItem.validation.alt_responses[correctTab - 1].score = val;
    }

    setQuestionData(newItem);
  };

  const handleAnswerChange = (answer) => {
    const newItem = cloneDeep(item);
    let groupArray = item.group_possible_responses ? [] : item.possible_responses;

    if (item.group_possible_responses) {
      item.possible_response_groups.forEach((group) => {
        groupArray = [...groupArray, ...group.responses];
      });
    }

    if (correctTab === 0) {
      if (newItem.validation && newItem.validation.valid_response) {
        newItem.validation.valid_response.value = [...answer];
      }
    } else if (
      newItem.validation &&
      newItem.validation.alt_responses &&
      newItem.validation.alt_responses[correctTab - 1]
    ) newItem.validation.alt_responses[correctTab - 1].value = [...answer];

    setQuestionData(newItem);
  };

  const renderOptions = () => (
    <OptionsList
      item={item}
      points={
        correctTab === 0
          ? item.validation.valid_response.score
          : item.validation.alt_responses[correctTab - 1].score
      }
      onChangePoints={handlePointsChange}
      saveAnswer={handleAnswerChange}
      editCorrectAnswers={
        correctTab === 0
          ? item.validation.valid_response.value
          : item.validation.alt_responses[correctTab - 1].value
      }
      view={EDIT}
    />
  );

  return (
    <Fragment>
      <Paper style={{ marginBottom: 30 }}>
        <Subtitle>{t('component.sortList.editQuestionSubtitle')}</Subtitle>

        <QuestionTextArea
          placeholder="Enter question"
          onChange={stim => handleItemChangeChange('stimulus', stim)}
          value={stimulus}
        />

        <Row gutter={70}>
          <Col span={12}>
            <Subtitle>{t('component.classification.columnsSubtitle')}</Subtitle>

            <Subtitle fontSize={13} padding="0 0 16px 0" color={secondaryTextColor}>
              {t('component.classification.columnsCountSubtitle')}
            </Subtitle>

            <Input
              size="large"
              value={ui_style.column_count}
              onChange={e => onUiChange('column_count')(+e.target.value)}
            />

            <Subtitle fontSize={13} color={secondaryTextColor}>
              {t('component.classification.editColListSubtitle')}
            </Subtitle>

            <List
              prefix="columns"
              buttonText="Add new column"
              items={item.ui_style.column_titles.map(ite => ite)}
              onAdd={handleMain(actions.ADD, 'column_titles')}
              onSortEnd={handleMain(actions.SORTEND, 'column_titles')}
              onChange={handleChange('column_titles')}
              onRemove={handleMain(actions.REMOVE, 'column_titles')}
              useDragHandle
              columns={1}
            />
          </Col>
          <Col span={12}>
            <Subtitle>{t('component.classification.rowsSubtitle')}</Subtitle>

            <Subtitle fontSize={13} padding="0 0 16px 0" color={secondaryTextColor}>
              {t('component.classification.rowsCountSubtitle')}
            </Subtitle>

            <Input
              size="large"
              value={ui_style.row_count}
              onChange={e => onUiChange('row_count')(+e.target.value)}
            />

            <Subtitle fontSize={13} color={secondaryTextColor}>
              {t('component.classification.editRowListSubtitle')}
            </Subtitle>

            <List
              prefix="rows"
              buttonText="Add new row"
              items={item.ui_style.row_titles.map(ite => ite)}
              onAdd={handleMain(actions.ADD, 'row_titles')}
              onSortEnd={handleMain(actions.SORTEND, 'row_titles')}
              onChange={handleChange('row_titles')}
              onRemove={handleMain(actions.REMOVE, 'row_titles')}
              useDragHandle
              columns={1}
            />
          </Col>
        </Row>

        <GroupPossibleResponses
          checkboxChange={onGroupPossibleResp}
          checkboxVal={item.group_possible_responses}
          items={
            item.group_possible_responses
              ? item.possible_response_groups
              : item.possible_responses.map(ite => ite)
          }
          onAddInner={onAddInner}
          onTitleChange={onGroupTitleChange}
          onAdd={item.group_possible_responses ? handleGroupAdd : handleMainPossible(actions.ADD)}
          onSortEnd={
            item.group_possible_responses ? handleGroupSortEnd : handleMainPossible(actions.SORTEND)
          }
          onChange={item.group_possible_responses ? handleGroupChange : handleChangePossible()}
          onRemoveInner={onRemoveInner}
          onRemove={
            item.group_possible_responses ? handleGroupRemove : handleMainPossible(actions.REMOVE)
          }
        />

        <CorrectAnswers
          onTabChange={setCorrectTab}
          correctTab={correctTab}
          onAdd={handleAddAnswer}
          validation={item.validation}
          options={renderOptions()}
          onCloseTab={handleCloseTab}
        />
      </Paper>
    </Fragment>
  );
};

EditClassification.propTypes = {
  item: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces('assessment')(
  connect(
    null,
    { setQuestionData: setQuestionDataAction }
  )(EditClassification)
);
