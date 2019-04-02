import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IconPlus } from '@edulastic/icons';
import { white } from '@edulastic/colors';
import { withNamespaces } from '@edulastic/localization';
import { compose } from 'redux';
import { Button, Tab, Tabs, TabContainer } from '@edulastic/common';
import { cloneDeep } from 'lodash';

import CorrectAnswer from './CorrectAnswer';
import { Subtitle } from '../common';

import { setQuestionDataAction } from '../../../../../author/src/actions/question';
import { getQuestionDataSelector } from '../../../../../author/src/selectors/question';

class CorrectAnswers extends Component {
  state = {
    value: 0
  };

  handleTabChange = (value) => {
    this.setState({ value });
  };

  removeAltResponse = (evt, index) => {
    evt.stopPropagation();
    const { onRemoveAltResponses } = this.props;
    const { value } = this.state;
    if (value === index + 1) {
      this.setState({
        value: index
      });
    }
    onRemoveAltResponses(index);
  }

  renderAltResponses = () => {
    const { validation, t } = this.props;

    if (validation.alt_responses && validation.alt_responses.length) {
      return validation.alt_responses.map((res, i) => (
        <Tab
          key={i}
          label={`${t('component.correctanswers.alternate')} ${i + 1}`}
          close
          onClose={(evt) => { this.removeAltResponse(evt, i); }}
        />
      ));
    }
    return null;
  };

  renderPlusButton = () => {
    const { onAddAltResponses, validation } = this.props;

    return (
      <Button
        style={{ minWidth: 70, minHeight: 25 }}
        icon={<IconPlus color={white} width={10} height={10} />}
        onClick={() => {
          this.handleTabChange(validation.alt_responses.length + 1);
          onAddAltResponses();
        }}
        color="primary"
        variant="extendedFab"
      />
    );
  };

  updateCorrectValidationAnswers = (answers) => {
    const { question, setQuestionData } = this.props;
    const newData = cloneDeep(question);
    const updatedValidation = {
      ...question.data,
      valid_response: {
        score: question.validation.valid_response.score,
        value: answers
      }
    };
    newData.validation.valid_response = updatedValidation.valid_response;
    setQuestionData(newData);
  };

  updateAltCorrectValidationAnswers = (answers, tabIndex) => {
    const { question, setQuestionData } = this.props;
    const newData = cloneDeep(question);

    const updatedAltResponses = newData.validation.alt_responses;
    updatedAltResponses[tabIndex] = {
      score: newData.validation.alt_responses[tabIndex].score,
      value: answers
    };

    newData.validation.alt_responses = updatedAltResponses;
    setQuestionData(newData);
  };

  handleUpdateCorrectScore = (points) => {
    const { question, setQuestionData } = this.props;
    const newData = cloneDeep(question);

    newData.validation.valid_response.score = points;

    setQuestionData(newData);
  };

  handleUpdateAltValidationScore = i => (points) => {
    const { question, setQuestionData } = this.props;
    const newData = cloneDeep(question);

    newData.validation.alt_responses[i].score = points;

    setQuestionData(newData);
  };

  render() {
    /* eslint-disable max-len */
    const {
      validation,
      stimulus,
      options,
      t,
      templateMarkUp,
      hasGroupResponses,
      configureOptions,
      uiStyle
    } = this.props;
    const { value } = this.state;
    return (
      <div>
        <Subtitle>{t('component.correctanswers.setcorrectanswers')}</Subtitle>
        <div>
          <Tabs
            value={value}
            onChange={this.handleTabChange}
            extra={this.renderPlusButton()}
          >
            <Tab label={t('component.correctanswers.correct')} />
            {this.renderAltResponses()}
          </Tabs>
          {value === 0 && (
            <TabContainer>
              <CorrectAnswer
                key={options}
                response={validation.valid_response}
                stimulus={stimulus}
                options={options}
                uiStyle={uiStyle}
                templateMarkUp={templateMarkUp}
                configureOptions={configureOptions}
                hasGroupResponses={hasGroupResponses}
                onUpdateValidationValue={this.updateCorrectValidationAnswers}
                onUpdatePoints={this.handleUpdateCorrectScore}
              />
            </TabContainer>
          )}
          {validation.alt_responses &&
            !!validation.alt_responses.length &&
            validation.alt_responses.map((alter, i) => {
              if (i + 1 === value) {
                return (
                  <TabContainer key={i}>
                    <CorrectAnswer
                      key={options}
                      response={alter}
                      stimulus={stimulus}
                      options={options}
                      configureOptions={configureOptions}
                      hasGroupResponses={hasGroupResponses}
                      templateMarkUp={templateMarkUp}
                      uiStyle={uiStyle}
                      onUpdateValidationValue={answers =>
                        this.updateAltCorrectValidationAnswers(answers, i)
                      }
                      onUpdatePoints={this.handleUpdateAltValidationScore(i)}
                    />
                  </TabContainer>
                );
              }
              return null;
            })}
        </div>
      </div>
    );
  }
}

CorrectAnswers.propTypes = {
  onAddAltResponses: PropTypes.func.isRequired,
  onRemoveAltResponses: PropTypes.func.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  validation: PropTypes.object,
  t: PropTypes.func.isRequired,
  stimulus: PropTypes.string,
  options: PropTypes.array,
  templateMarkUp: PropTypes.string,
  question: PropTypes.object.isRequired,
  hasGroupResponses: PropTypes.bool,
  configureOptions: PropTypes.object.isRequired,
  uiStyle: PropTypes.object
};

CorrectAnswers.defaultProps = {
  stimulus: '',
  options: [],
  validation: {},
  hasGroupResponses: false,
  templateMarkUp: '',
  uiStyle: {
    responsecontainerposition: 'bottom',
    fontsize: 'normal',
    stemnumeration: '',
    widthpx: 0,
    heightpx: 0,
    wordwrap: false
  }
};

const enhance = compose(
  withNamespaces('assessment'),
  connect(
    state => ({
      question: getQuestionDataSelector(state)
    }),
    { setQuestionData: setQuestionDataAction }
  )
);

export default enhance(CorrectAnswers);
