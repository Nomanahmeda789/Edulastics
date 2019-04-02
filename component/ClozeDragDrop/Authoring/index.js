import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import { PaddingDiv, CustomQuillComponent } from '@edulastic/common';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withNamespaces } from '@edulastic/localization';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import 'react-quill/dist/quill.snow.css';
import { Button, Icon, Input } from 'antd';

import SortableItemContainer from './SortableItemContainer';
import Subtitle from '../common/Sutitle';
import AddNewChoiceBtn from './AddNewChoiceBtn';
import { setQuestionDataAction } from '../../../../../author/src/actions/question';
import DeleteButton from '../components/DeleteButton';
import FocusInput from '../../common/FocusInput';

const DragHandle = React.memo(SortableHandle(() => <i className="fa fa-align-justify" />));

const SortableItem = React.memo(
  SortableElement(({ value, onRemove, onChange }) => (
    <SortableItemContainer>
      <div className="main">
        <DragHandle />
        <div>
          <FocusInput
            style={{ background: 'transparent' }}
            type="text"
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
      <DeleteButton onDelete={onRemove} />
    </SortableItemContainer>
  ))
);

const SortableList = React.memo(
  SortableContainer(({ items, onRemove, onChange }) => (
    <div>
      {items.map((value, index) => (
        <SortableItem
          key={index}
          index={index}
          value={value}
          onRemove={() => onRemove(index)}
          onChange={e => onChange(index, e)}
        />
      ))}
    </div>
  ))
);

const defaultTemplateMarkup =
  '<p>Risus </p><p class="response-btn" contenteditable="false"><span class="index">1</span><span class="text">Response</span></p><p>, et tincidunt turpis facilisis. Curabitur eu nulla justo. Curabitur vulputate ut nisl et bibendum. Nunc diam enim, porta sed eros vitae. </p><p class="response-btn" contenteditable="false"><span class="index">1</span><span class="text">Response</span></p><p> dignissim, et tincidunt turpis facilisis. Curabitur eu nulla justo. Curabitur vulputate ut nisl et bibendum.</p>';

class ClozeDragDropAuthoring extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    setQuestionData: PropTypes.func.isRequired
  };

  state = {
    hasGroupResponses: false,
    groupResponses: []
  };

  getNewItem() {
    const { item } = this.props;
    return cloneDeep(item);
  }

  onChangeQuesiton = (html) => {
    const stimulus = html;
    const { item, setQuestionData } = this.props;
    setQuestionData({ ...item, stimulus });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { setQuestionData } = this.props;
    const newItem = this.getNewItem();
    newItem.options = arrayMove(newItem.options, oldIndex, newIndex);
    setQuestionData(newItem);
  };

  remove = (index) => {
    const { setQuestionData } = this.props;
    const newItem = this.getNewItem();
    newItem.options.splice(index, 1);
    setQuestionData(newItem);
  };

  editOptions = (index, e) => {
    const { setQuestionData } = this.props;
    const newItem = this.getNewItem();
    newItem.options[index] = e.target.value;
    setQuestionData(newItem);
  };

  addNewChoiceBtn = () => {
    const { setQuestionData } = this.props;
    const newItem = this.getNewItem();
    newItem.options.push('new choice');
    setQuestionData(newItem);
  };

  onChangeMarkUp = (html) => {
    const templateMarkUp = html;
    const { item, setQuestionData } = this.props;
    setQuestionData({ ...item, templateMarkUp });
  };

  groupResponsesHandler = (e) => {
    const { item, setQuestionData } = this.props;
    const { groupResponses } = this.state;
    const hasGroupResponses = e.target.checked;
    if (e.target.checked) {
      this.setState({
        hasGroupResponses,
        groupResponses: (groupResponses.length === 0 && item.options) ? [{
          title: '',
          options: [...item.options]
        }] : groupResponses
      });
    } else {
      this.setState({ hasGroupResponses });
    }
    setQuestionData({ ...item, hasGroupResponses });
  };

  addGroup = () => {
    const { groupResponses } = this.state;
    groupResponses.push({ title: '', options: [] });
    const newGroupResponses = groupResponses.slice();
    this.setState({ groupResponses: newGroupResponses });
    const { item, setQuestionData } = this.props;
    setQuestionData({ ...item, groupResponses: newGroupResponses });
  };

  removeGroup = (index) => {
    const { groupResponses } = this.state;
    groupResponses.splice(index, 1);
    const newGroupResponses = groupResponses.slice();
    this.setState({ groupResponses: newGroupResponses });
    const { item, setQuestionData } = this.props;
    setQuestionData({ ...item, groupResponses: newGroupResponses });
  };

  changeGroupRespTitle = (index, e) => {
    const { groupResponses } = this.state;
    const newGroupResponses = groupResponses.slice();
    newGroupResponses[index].title = e.target.value;
    this.setState({ groupResponses: newGroupResponses });
    const { item, setQuestionData } = this.props;
    setQuestionData({ ...item, groupResponses: newGroupResponses });
  };

  addNewGroupOption = (index) => {
    const { groupResponses } = this.state;
    const newGroupResponses = groupResponses.slice();
    newGroupResponses[index].options.push('New Choice');
    this.setState({ groupResponses: newGroupResponses });
    const { item, setQuestionData } = this.props;
    setQuestionData({ ...item, groupResponses: newGroupResponses });
  };

  editGroupOptions = (index, itemIndex, e) => {
    const { groupResponses } = this.state;
    const newGroupResponses = groupResponses.slice();
    newGroupResponses[index].options[itemIndex] = e.target.value;
    this.setState({ groupResponses: newGroupResponses });
    const { item, setQuestionData } = this.props;
    setQuestionData({ ...item, groupResponses: newGroupResponses });
  };

  removeGroupOptions = (index, itemIndex) => {
    const { groupResponses } = this.state;
    const newGroupResponses = groupResponses.slice();
    newGroupResponses[index].options.splice(itemIndex, 1);
    this.setState({ groupResponses: newGroupResponses });
    const { item, setQuestionData } = this.props;
    setQuestionData({ ...item, groupResponses: newGroupResponses });
  };

  onSortEndGroupOptions = () => {};

  render() {
    const { t, item } = this.props;
    const { hasGroupResponses, groupResponses } = this.state;
    return (
      <div>
        <PaddingDiv bottom={20}>
          <Subtitle>{t('component.clozeDragDrop.composequestion')}</Subtitle>
          <CustomQuillComponent
            toolbarId="stimulus"
            wrappedRef={(instance) => {
              this.stimulus = instance;
            }}
            placeholder={t('component.clozeDragDrop.thisisstem')}
            onChange={this.onChangeQuesiton}
            showResponseBtn={false}
            value={item.stimulus}
          />
          <Subtitle>{t('component.clozeDragDrop.templatemarkup')}</Subtitle>
          <CustomQuillComponent
            toolbarId="templatemarkup"
            wrappedRef={(instance) => {
              this.templatemarkup = instance;
            }}
            placeholder={t('component.clozeDragDrop.templatemarkupplaceholder')}
            onChange={this.onChangeMarkUp}
            firstFocus={!item.templateMarkUp}
            showResponseBtn
            clearOnFirstFocus
            value={item.templateMarkUp || defaultTemplateMarkup}
          />
          <PaddingDiv>
            <Subtitle>
              <input
                id="groupResponseCheckbox"
                type="checkbox"
                onChange={e => this.groupResponsesHandler(e)}
              />
              <label htmlFor="groupResponseCheckbox">
                {t('component.clozeDragDrop.grouppossibleresponses')}
              </label>
            </Subtitle>
          </PaddingDiv>
          {!hasGroupResponses && (
            <PaddingDiv>
              <div>{t('component.clozeDragDrop.choicesforresponse')}</div>
              <SortableList
                items={item.options}
                onSortEnd={this.onSortEnd}
                useDragHandle
                onRemove={this.remove}
                onChange={this.editOptions}
              />
              <div>
                <AddNewChoiceBtn onClick={this.addNewChoiceBtn}>
                  {t('component.clozeDragDrop.addnewchoice')}
                </AddNewChoiceBtn>
              </div>
            </PaddingDiv>
          )}
          {hasGroupResponses &&
            groupResponses.length > 0 &&
            groupResponses.map((group, index) => (
              <div key={index}>
                <fieldset
                  style={{
                    borderColor: '#eee',
                    borderRadius: 2,
                    padding: '0 20px',
                    marginBottom: 15,
                    border: 'solid 1px'
                  }}
                >
                  <legend style={{ padding: '0 20px', width: 'auto' }}>
                    {t('component.clozeDragDrop.group')} {index + 1}
                  </legend>
                  <div style={{ float: 'right' }}>
                    <Button onClick={() => this.removeGroup(index)} size="small" type="button">
                      <Icon type="close" />
                    </Button>
                  </div>
                  <PaddingDiv top={10} bottom={10}>
                    <div>Title</div>
                  </PaddingDiv>
                  <div>
                    <Input
                      size="large"
                      style={{ width: '100%' }}
                      onChange={e => this.changeGroupRespTitle(index, e)}
                      value={group.title}
                    />
                  </div>
                  <PaddingDiv top={20} bottom={10}>
                    <div>{t('component.clozeDragDrop.choicesforresponse')}</div>
                    <SortableList
                      items={group.options}
                      onSortEnd={params => this.onSortEndGroupOptions(index, ...params)}
                      useDragHandle
                      onRemove={itemIndex => this.removeGroupOptions(index, itemIndex)}
                      onChange={(itemIndex, e) => this.editGroupOptions(index, itemIndex, e)}
                    />
                    <PaddingDiv top={10} bottom={10}>
                      <AddNewChoiceBtn onClick={() => this.addNewGroupOption(index)}>
                        {t('component.clozeDragDrop.addnewchoice')}
                      </AddNewChoiceBtn>
                    </PaddingDiv>
                  </PaddingDiv>
                </fieldset>
              </div>
            ))}
          {hasGroupResponses && (
            <Button type="primary" onClick={this.addGroup} style={{ background: '#12a6e8' }}>
              {t('component.clozeDragDrop.addgroup')}
            </Button>
          )}
        </PaddingDiv>
      </div>
    );
  }
}

const enhance = compose(
  withRouter,
  withNamespaces('assessment'),
  connect(
    null,
    { setQuestionData: setQuestionDataAction }
  )
);

export default enhance(ClozeDragDropAuthoring);
