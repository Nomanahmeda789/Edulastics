import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from '@edulastic/localization';

import { Header, PointField } from './styled_components';
import MultipleChoiceDisplay from '../Display';

class CorrectAnswer extends Component {
  static propTypes = {
    response: PropTypes.object.isRequired,
    onUpdatePoints: PropTypes.func.isRequired,
    onUpdateValidationValue: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    stimulus: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    multipleResponses: PropTypes.bool.isRequired,
    uiStyle: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const userSelections = Array(props.options.length).fill(false);
    if (props.response) {
      props.response.value.forEach((answer) => {
        userSelections[answer] = true;
      });

      this.state = {
        responseScore: props.response && props.response.score,
        userSelections
      };
    }
  }

  updateScore = (e) => {
    const { onUpdatePoints } = this.props;
    if (e.target.value < 0) e.target.value = 0;
    this.setState({ responseScore: e.target.value });
    onUpdatePoints(parseFloat(e.target.value, 10));
  };

  handleMultiSelect = (index) => {
    const { onUpdateValidationValue, multipleResponses } = this.props;
    let { userSelections } = this.state;
    const changedOption = parseInt(index, 10);

    userSelections[changedOption] = !userSelections[changedOption];
    if (!multipleResponses) {
      userSelections = userSelections.map((it, i) => {
        if (changedOption !== i) return false;
        return true;
      });
    }
    this.setState({ userSelections });

    onUpdateValidationValue(userSelections);
  };

  render() {
    const { t, options, stimulus, response, uiStyle } = this.props;
    const { responseScore } = this.state;
    return (
      <div>
        <Header>
          <PointField
            type="number"
            data-cy="points"
            value={responseScore}
            onChange={this.updateScore}
            onBlur={this.updateScore}
            disabled={false}
            min={0}
            step={0.5}
          />
          <span>{t('component.correctanswers.points')}</span>
        </Header>
        <MultipleChoiceDisplay
          preview
          setAnswers
          uiStyle={uiStyle}
          options={options}
          question={stimulus}
          userSelections={response.value}
          onChange={this.handleMultiSelect}
        />
      </div>
    );
  }
}

export default withNamespaces('assessment')(CorrectAnswer);
