import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable, Droppable } from 'react-drag-and-drop';
import { cloneDeep } from 'lodash';
import { InstructorStimulus } from '@edulastic/common';

import QuestionHeader from '../common/QuestionHeader';
import ResponseContainer from './ResponseContainer';
import ResponseBoxLayout from './ResponseBoxLayout';
import CheckboxTemplateBoxLayout from './CheckboxResponseBoxLayout';
import CorrectAnswerBoxLayout from './CorrectAnswerBoxLayout';

/* eslint-disable */
const defaultTemplateMarkup =
  '<p>"It\'s all clear" he</p><p class="response-btn" contenteditable="false"><span class="index">1</span><span class="text">Response</span></p><p>Have you the </p><p class="response-btn" contenteditable="false"><span class="index">1</span><span class="text">Response</span></p><p> and the bags? <br /> Great Scott!!! Jump, archie, jump, and I\'ll swing for it</p>';

class ClozeDragDropDisplay extends Component {
  constructor(props) {
    super(props);
    const { templateParts, respLength } = this.getTemplateParts(props);
    let userAnswers = new Array(respLength).fill(false);
    props.userSelections.map((userSelection, index) => {
      userAnswers[index] = userSelection;
    });
    const possibleResponses = this.getInitialResponses(props);

    this.state = {
      templateParts,
      userAnswers,
      possibleResponses
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state !== undefined) {
      const possibleResponses = this.getInitialResponses(nextProps);
      const { templateParts, respLength } = this.getTemplateParts(nextProps);
      this.setState({
        userAnswers: nextProps.userSelections ? [...nextProps.userSelections] : [],
        possibleResponses,
        templateParts
      });
    }
  }

  getTemplateParts = props => {
    const { templateMarkUp } = props;
    let templateMarkUpStr = templateMarkUp;
    if (!templateMarkUpStr) {
      templateMarkUpStr = defaultTemplateMarkup;
    }
    const templateParts = templateMarkUpStr.match(/<p.*?<\/p>/g);
    const responseParts = templateMarkUpStr.match(/<p class="response-btn.*?<\/p>/g);
    const respLength = responseParts !== null ? responseParts.length : 0;
    return { templateParts, respLength };
  };

  onDrop = (data, index) => {
    const { userAnswers: newAnswers, possibleResponses } = this.state;
    const {
      onChange: changeAnswers,
      hasGroupResponses,
      userSelections,
      configureOptions
    } = this.props;
    const { duplicatedResponses: isDuplicated } = configureOptions;
    const newResponses = cloneDeep(possibleResponses);

    // Remove duplicated responses if duplicated option is disable
    if (!isDuplicated) {
      if (hasGroupResponses) {
        const groupIndex = data.metal.split('_')[1];
        const groupData = data.metal.split('_')[0];
        const sourceIndex = data.metal.split('_')[2];
        const fromResp = data.metal.split('_')[3];
        if (fromResp) {
          const temp = newAnswers[sourceIndex];
          newAnswers[sourceIndex] = newAnswers[index];
          newAnswers[index] = temp;
        } else {
          for (let i = 0; i < newResponses[groupIndex].options.length; i++) {
            if (newResponses[groupIndex].options[i] === groupData) {
              if (
                userSelections &&
                userSelections[index] !== null &&
                typeof userSelections[index] === 'object'
              ) {
                newResponses[userSelections[index].group].options.push(userSelections[index].data);
              }
              newResponses[groupIndex].options.splice(i, 1);
              break;
            }
          }
        }
        newAnswers[index] = {
          group: groupIndex,
          data: groupData
        };
      } else {
        const sourceIndex = data.metal.split('_')[1];
        const sourceData = data.metal.split('_')[0];
        const fromResp = data.metal.split('_')[2];
        if (fromResp) {
          const temp = newAnswers[sourceIndex];
          newAnswers[sourceIndex] = newAnswers[index];
          newAnswers[index] = temp;
        } else {
          newAnswers[index] = sourceData;
          for (let i = 0; i < newResponses.length; i++) {
            if (newResponses[i] === sourceData) {
              newResponses.splice(i, 1);
              break;
            }
          }
        }
      }
    } else {
      if (hasGroupResponses) {
        const groupIndex = data.metal.split('_')[1];
        const groupData = data.metal.split('_')[0];
        const sourceIndex = data.metal.split('_')[2];
        const fromResp = data.metal.split('_')[3];

        if (fromResp) {
          const temp = newAnswers[sourceIndex];
          newAnswers[sourceIndex] = newAnswers[index];
          newAnswers[index] = temp;
        }
        newAnswers[index] = {
          group: groupIndex,
          data: groupData
        };
      } else {
        const value = data.metal.split('_')[0];
        const sourceIndex = data.metal.split('_')[1];
        const fromResp = data.metal.split('_')[2];
        if (fromResp) {
          const temp = newAnswers[sourceIndex];
          newAnswers[sourceIndex] = newAnswers[index];
          newAnswers[index] = temp;
        }
        newAnswers[index] = value;
      }
    }
    this.setState({ userAnswers: newAnswers, possibleResponses: newResponses });
    changeAnswers(newAnswers);
  };

  shuffle = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  shuffleGroup = data => {
    return data.map(arr => {
      arr.options = this.shuffle(arr.options);
      return arr;
    });
  };

  getInitialResponses = props => {
    const {
      hasGroupResponses,
      configureOptions,
      userSelections: userSelectionsProp,
      options
    } = props;
    const { duplicatedResponses: isDuplicated } = configureOptions;
    let userSelections = userSelectionsProp || [];

    let possibleResps = [];
    possibleResps = cloneDeep(options);
    if (!isDuplicated) {
      if (hasGroupResponses) {
        userSelections.forEach(userSelection => {
          if (userSelection !== null && typeof userSelection === 'object') {
            for (let i = 0; i < possibleResps[userSelection.group].options.length; i++) {
              if (possibleResps[userSelection.group].options[i] === userSelection.data) {
                possibleResps[userSelection.group].options.splice(i, 1);
                break;
              }
            }
          }
        });
      } else {
        for (let j = 0; j < userSelections.length; j++) {
          for (let i = 0; i < possibleResps.length; i++) {
            if (possibleResps[i] === userSelections[j]) {
              possibleResps.splice(i, 1);
              break;
            }
          }
        }
      }
    }
    return possibleResps;
  };

  getFontSize = size => {
    switch (size) {
      case 'small':
        return '10px';
      case 'normal':
        return '13px';
      case 'large':
        return '17px';
      case 'xlarge':
        return '20px';
      case 'xxlarge':
        return '24px';
      default:
        return '12px';
    }
  };

  render() {
    const {
      userSelections,
      smallSize,
      question,
      configureOptions,
      hasGroupResponses,
      preview,
      options,
      uiStyle,
      showAnswer,
      checkAnswer,
      validation,
      evaluation,
      item
    } = this.props;
    const { templateParts, userAnswers, possibleResponses } = this.state;
    const { showDraghandle: dragHandler, shuffleOptions } = configureOptions;
    let responseIndex = 0;
    let responses = cloneDeep(possibleResponses);
    if (preview && shuffleOptions) {
      if (hasGroupResponses) {
        responses = this.shuffleGroup(possibleResponses);
      } else {
        responses = this.shuffle(possibleResponses);
      }
    }

    // Layout Options
    const fontSize = this.getFontSize(uiStyle.fontsize);
    const {
      widthpx,
      heightpx,
      wordwrap,
      responsecontainerposition,
      responsecontainerindividuals,
      stemnumeration
    } = uiStyle;

    const responseBtnStyle = {
      widthpx: widthpx !== 0 ? widthpx : 'auto',
      heightpx: heightpx !== 0 ? heightpx : 'auto',
      whiteSpace: wordwrap ? 'inherit' : 'nowrap'
    };
    const previewTemplateBoxLayout = (
      <div
        className={`template_box ${smallSize ? 'small' : ''}`}
        style={{ fontSize: smallSize ? 14 : fontSize }}
      >
        {templateParts.map((templatePart, index) => {
          if (templatePart.indexOf('class="response-btn"') !== -1) {
            const dropTargetIndex = responseIndex;
            responseIndex++;
            let btnStyle = {
              width: 0,
              height: 0,
              widthpx: 0,
              heightpx: 0,
              whiteSpace: undefined,
              wordwrap: undefined
            };
            if (responsecontainerindividuals && responsecontainerindividuals[dropTargetIndex]) {
              const { widthpx, heightpx, wordwrap } = responsecontainerindividuals[dropTargetIndex];
              btnStyle.width = widthpx;
              btnStyle.height = heightpx;
              btnStyle.whiteSpace = wordwrap;
              btnStyle.widthpx = widthpx;
              btnStyle.heightpx = heightpx;
              btnStyle.wordwrap = wordwrap;
            }
            if (btnStyle && btnStyle.width === 0) {
              btnStyle['width'] = responseBtnStyle.widthpx;
            } else {
              btnStyle.width = btnStyle.widthpx;
            }
            if (btnStyle && btnStyle.height === 0) {
              btnStyle['height'] = responseBtnStyle.heightpx;
            } else {
              btnStyle['height'] = btnStyle.heightpx;
            }
            if (btnStyle && btnStyle.whiteSpace === undefined) {
              btnStyle['whiteSpace'] = responseBtnStyle.whiteSpace;
            } else {
              btnStyle['whiteSpace'] = btnStyle.wordwrap;
            }
            return (
              <Droppable
                key={index}
                types={['metal']} // <= allowed drop types
                style={{ top: -5 }}
                onDrop={data => this.onDrop(data, dropTargetIndex)}
              >
                {!hasGroupResponses && (
                  <ResponseContainer style={btnStyle} smallSize={smallSize}>
                    <Draggable
                      className="content"
                      type="metal"
                      data={`${userAnswers[dropTargetIndex]}_${dropTargetIndex}_fromResp`}
                    >
                      {userAnswers[dropTargetIndex]}
                    </Draggable>
                    &nbsp;
                  </ResponseContainer>
                )}
                {hasGroupResponses && (
                  <ResponseContainer style={btnStyle} smallSize={smallSize}>
                    <Draggable
                      className="content"
                      type="metal"
                      data={`${userAnswers[dropTargetIndex] &&
                        userAnswers[dropTargetIndex].data}_${userAnswers[dropTargetIndex] &&
                        userAnswers[dropTargetIndex].group}_${dropTargetIndex}_fromResp`}
                    >
                      {userAnswers[dropTargetIndex] && userAnswers[dropTargetIndex].data}
                    </Draggable>
                    &nbsp;
                  </ResponseContainer>
                )}
              </Droppable>
            );
          }
          return (
            <span
              style={{ userSelect: 'none' }}
              key={index}
              dangerouslySetInnerHTML={{ __html: templatePart }}
            />
          );
        })}
      </div>
    );

    const checkboxTemplateBoxLayout = (
      <CheckboxTemplateBoxLayout
        templateParts={templateParts}
        responsecontainerindividuals={responsecontainerindividuals}
        responseBtnStyle={responseBtnStyle}
        stemNumeration={stemnumeration}
        hasGroupResponses={hasGroupResponses}
        fontSize={fontSize}
        showAnswer={showAnswer}
        userSelections={userAnswers}
        evaluation={evaluation}
        onDropHandler={this.onDrop}
      />
    );
    const templateBoxLayout =
      showAnswer || checkAnswer ? checkboxTemplateBoxLayout : previewTemplateBoxLayout;
    const previewResponseBoxLayout = (
      <ResponseBoxLayout
        smallSize={smallSize}
        hasGroupResponses={hasGroupResponses}
        responses={responses}
        fontSize={fontSize}
        dragHandler={dragHandler}
      />
    );
    const correctAnswerBoxLayout = showAnswer ? (
      <CorrectAnswerBoxLayout
        hasGroupResponses={hasGroupResponses}
        fontSize={fontSize}
        groupResponses={options}
        userAnswers={validation.valid_response && validation.valid_response.value}
      />
    ) : (
      <div />
    );
    const responseBoxLayout = showAnswer ? <div /> : previewResponseBoxLayout;
    const answerBox = showAnswer ? correctAnswerBoxLayout : <div />;
    return (
      <div style={{ fontSize: fontSize }}>
        <QuestionHeader smallSize={smallSize} dangerouslySetInnerHTML={{ __html: question }} />
        <div>
          {responsecontainerposition === 'top' && (
            <React.Fragment>
              <div style={{ margin: 15, borderRadius: 10 }}>{responseBoxLayout}</div>
              <div style={{ margin: 15, borderRadius: 10 }}>{templateBoxLayout}</div>
            </React.Fragment>
          )}
          {responsecontainerposition === 'bottom' && (
            <React.Fragment>
              <div
                style={{
                  margin: smallSize ? '-18px -20px 10px' : 15,
                  borderRadius: smallSize ? 0 : 10
                }}
              >
                {item.instructor_stimulus && (
                  <InstructorStimulus
                    dangerouslySetInnerHTML={{ __html: item.instructor_stimulus }}
                  />
                )}

                {templateBoxLayout}
              </div>
              <div
                style={{
                  margin: smallSize ? '0 -40px -20px' : 15,
                  borderRadius: smallSize ? 0 : 10
                }}
              >
                {responseBoxLayout}
              </div>
            </React.Fragment>
          )}
          {responsecontainerposition === 'left' && (
            <AnswerContainer position={responsecontainerposition}>
              <div
                hidden={checkAnswer || showAnswer}
                style={{
                  height: '100%',
                  maxWidth: '30%',
                  margin: 15,
                  borderRadius: 10,
                  background: 'lightgray',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                {responseBoxLayout}
              </div>
              <div style={{ margin: 15, borderRadius: 10, flex: 1 }}>{templateBoxLayout}</div>
            </AnswerContainer>
          )}
          {responsecontainerposition === 'right' && (
            <AnswerContainer position={responsecontainerposition}>
              <div style={{ flex: 1, margin: 15, borderRadius: 10 }}>{templateBoxLayout}</div>
              <div
                hidden={checkAnswer || showAnswer}
                style={{
                  height: '100%',
                  maxWidth: '30%',
                  margin: 15,
                  borderRadius: 10,
                  background: 'lightgray',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                {responseBoxLayout}
              </div>
            </AnswerContainer>
          )}
        </div>
        {answerBox}
      </div>
    );
  }
}

ClozeDragDropDisplay.propTypes = {
  options: PropTypes.array,
  item: PropTypes.object,
  onChange: PropTypes.func,
  preview: PropTypes.bool,
  showAnswer: PropTypes.bool,
  userSelections: PropTypes.array,
  smallSize: PropTypes.bool,
  checkAnswer: PropTypes.bool,
  templateMarkUp: PropTypes.string,
  question: PropTypes.string.isRequired,
  hasGroupResponses: PropTypes.bool,
  configureOptions: PropTypes.object,
  validation: PropTypes.object,
  evaluation: PropTypes.array,
  uiStyle: PropTypes.object.isRequired
};

ClozeDragDropDisplay.defaultProps = {
  options: [],
  onChange: () => {},
  preview: true,
  item: {},
  showAnswer: false,
  userSelections: [],
  evaluation: [],
  checkAnswer: false,
  templateMarkUp: defaultTemplateMarkup,
  smallSize: false,
  hasGroupResponses: false,
  validation: {},
  configureOptions: {
    showDraghandle: false,
    duplicatedResponses: false,
    shuffleOptions: false
  },
  uiStyle: {
    responsecontainerposition: 'bottom',
    fontsize: 'normal',
    stemnumeration: 'numerical',
    widthpx: 0,
    heightpx: 0,
    wordwrap: false,
    responsecontainerindividuals: []
  }
};

export default ClozeDragDropDisplay;

const AnswerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: ${props => (['left', 'right'].includes(props.position) ? 'nowrap' : 'wrap')};
`;
