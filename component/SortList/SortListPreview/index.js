import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { cloneDeep, isEqual } from 'lodash';
import styled from 'styled-components';

import { Paper, FlexContainer, Stimulus } from '@edulastic/common';
import { IconCarets } from '@edulastic/icons';
import { green, greenDark, secondaryTextColor } from '@edulastic/colors';
import { withNamespaces } from '@edulastic/localization';

import { DropContainer } from '../../common';
import ShowCorrect from '../ShowCorrect';
import { DragItem } from '../DragItem';
import { SHOW, CLEAR } from '../../../constants/constantsForQuestions';

const { IconCaretLeft, IconCaretRight, IconCaretUp, IconCaretDown } = IconCarets;

const styles = {
  dropContainerStyles: smallSize => ({ marginBottom: smallSize ? 6 : 20, borderRadius: 4 }),
  wrapperStyles: smallSize => ({ marginTop: smallSize ? 0 : 40 })
};
class SortListPreview extends PureComponent {
  static propTypes = {
    previewTab: PropTypes.string,
    t: PropTypes.func.isRequired,
    smallSize: PropTypes.bool,
    item: PropTypes.object,
    userAnswer: PropTypes.any.isRequired,
    saveAnswer: PropTypes.func.isRequired
  };

  static defaultProps = {
    previewTab: CLEAR,
    smallSize: false,
    item: {}
  };

  get getInitialState() {
    const {
      item: { source },
      userAnswer
    } = this.props;

    return {
      items: source.map((item, i) => {
        if (!userAnswer.includes(i)) {
          return item;
        }
        return null;
      }),
      selected:
        userAnswer.length > 0
          ? userAnswer.map(index => (index !== null ? source[index] : null))
          : Array.from({ length: source.length }).fill(null),
      active: ''
    };
  }

  state = this.getInitialState;

  componentDidUpdate() {
    const {
      item: { source },
      userAnswer
    } = this.props;

    const { items, selected } = this.state;

    const newItems = source.map((item, i) => {
      if (!userAnswer.includes(i)) {
        return item;
      }
      return null;
    });

    const newSelected =
      userAnswer.length > 0
        ? userAnswer.map(index => (index !== null ? source[index] : null))
        : Array.from({ length: source.length }).fill(null);

    if (!isEqual(items, newItems)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ items: newItems, active: '' });
    }

    if (!isEqual(selected, newSelected)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ selected: newSelected, active: '' });
    }
  }

  onDrop = (itemCurrent, itemTo, flag) => {
    const data = cloneDeep(this.state);
    const { saveAnswer, item } = this.props;

    let tmp = [];

    [tmp] = data[flag].splice(itemCurrent.index, 1, data[itemTo.flag][itemTo.index]);

    data[itemTo.flag][itemTo.index] = tmp;

    this.setState(data);

    saveAnswer(
      data.selected.map(currentAns => (currentAns ? item.source.indexOf(currentAns) : null))
    );
  };

  setActive = (item) => {
    this.setState({ active: typeof item === 'string' ? item : '' });
  };

  onRightLeftClick = () => {
    const { items, selected, active } = cloneDeep(this.state);
    const { saveAnswer, item } = this.props;

    if (items.includes(active)) {
      items.splice(items.indexOf(active), 1, null);
      selected.splice(selected.indexOf(null), 1, active);
    } else if (active && Object.keys(active).length !== 0) {
      selected.splice(selected.indexOf(active), 1, null);
      items.splice(items.indexOf(null), 1, active);
    }

    if (active) {
      this.setState({
        items,
        selected,
        active: ''
      });
      saveAnswer(selected.map(currentAns => (currentAns ? item.source.indexOf(currentAns) : null)));
    }
  };

  onUpDownClick = indicator => () => {
    const { selected, active } = cloneDeep(this.state);
    const { saveAnswer, item } = this.props;

    let tmp;

    if (selected.includes(active)) {
      const activeIndex = selected.indexOf(active);
      if (indicator === 'Up' && activeIndex !== 0) {
        tmp = selected[activeIndex - 1];
        selected[activeIndex - 1] = selected[activeIndex];
        selected[activeIndex] = tmp;
      }
      if (indicator === 'Down' && activeIndex !== selected.length - 1) {
        tmp = selected[activeIndex + 1];
        selected[activeIndex + 1] = selected[activeIndex];
        selected[activeIndex] = tmp;
      }
      this.setState({
        selected,
        active
      });
      saveAnswer(selected.map(currentAns => (currentAns ? item.source.indexOf(currentAns) : null)));
    }
  };

  drop = ({ obj, index, flag }) => ({ obj, index, flag });

  render() {
    const {
      previewTab,
      item,
      t,
      smallSize,
      item: { validation }
    } = this.props;

    let valid_response = validation && validation.valid_response && validation.valid_response.value;
    valid_response = valid_response || [];
    let alt_responses = validation && validation.alt_responses && validation.alt_responses;
    alt_responses = alt_responses || [];
    const { items, selected, active } = this.state;

    const inCorrectList = selected
      .filter((selectedItem, i) => selectedItem && selectedItem !== item.source[valid_response[i]])
      .concat(items.filter(i => i !== null));

    const validRespCorrect = selected.filter(
      (selectedItem, i) => selectedItem && selectedItem === item.source[valid_response[i]]
    );

    let altRespCorrect = [...validRespCorrect];

    alt_responses.forEach((ob) => {
      const alt = selected.filter(
        (selectedItem, i) => selectedItem && selectedItem === item.source[ob.value[i]]
      );
      if (alt.length > altRespCorrect.length) {
        altRespCorrect = [...alt];
      }
    });

    return (
      <Paper padding={smallSize} boxShadow={smallSize ? 'none' : ''}>
        {!smallSize && (
          <Stimulus>
            <div dangerouslySetInnerHTML={{ __html: item.stimulus }} />
          </Stimulus>
        )}
        <FlexContainer alignItems="flex-start" style={styles.wrapperStyles(smallSize)}>
          <FullWidthContainer>
            {!smallSize && (
              <Title smallSize={smallSize}>{t('component.sortList.containerSourcePreview')}</Title>
            )}
            {items.map((draggableItem, i) => (
              <DropContainer
                key={i}
                noBorder={!!draggableItem}
                style={styles.dropContainerStyles(smallSize)}
                index={i}
                flag="items"
                obj={draggableItem}
                drop={this.drop}
              >
                <DragItem
                  index={i}
                  smallSize={smallSize}
                  active={isEqual(active, draggableItem)}
                  onClick={this.setActive}
                  flag="items"
                  onDrop={this.onDrop}
                  obj={draggableItem}
                />
              </DropContainer>
            ))}
          </FullWidthContainer>

          <FlexWithMargins smallSize={smallSize}>
            <IconLeft smallSize={smallSize} onClick={this.onRightLeftClick} />
            <IconRight smallSize={smallSize} onClick={this.onRightLeftClick} />
          </FlexWithMargins>

          <FullWidthContainer>
            {!smallSize && (
              <Title smallSize={smallSize}>{t('component.sortList.containerTargetPreview')}</Title>
            )}
            {selected.map((selectedItem, i) => (
              <DropContainer
                key={i}
                noBorder={!!selectedItem}
                style={styles.dropContainerStyles(smallSize)}
                index={i}
                flag="selected"
                obj={selectedItem}
                drop={this.drop}
              >
                <DragItem
                  index={i}
                  correct={altRespCorrect.includes(selectedItem)}
                  smallSize={smallSize}
                  previewTab={previewTab}
                  flag="selected"
                  active={isEqual(active, selectedItem)}
                  onClick={this.setActive}
                  onDrop={this.onDrop}
                  obj={selectedItem}
                />
              </DropContainer>
            ))}
          </FullWidthContainer>

          <FlexCol smallSize={smallSize}>
            <IconUp smallSize={smallSize} onClick={this.onUpDownClick('Up')} />
            <IconDown smallSize={smallSize} onClick={this.onUpDownClick('Down')} />
          </FlexCol>
        </FlexContainer>

        {previewTab === SHOW && inCorrectList.length > 0 && (
          <ShowCorrect source={item.source} list={inCorrectList} correctList={valid_response} />
        )}
      </Paper>
    );
  }
}

export default withNamespaces('assessment')(SortListPreview);

const Title = styled.p`
  text-align: center;
  width: 100%;
  font-weight: 600;
  margin-bottom: ${({ smallSize }) => (smallSize ? 5 : 15)}px;
  font-size: 13px;
  color: ${secondaryTextColor};
  text-transform: uppercase;
`;

const IconDown = styled(IconCaretDown)`
  color: ${green};
  margin: 0;
  font-size: ${({ smallSize }) => (smallSize ? 10 : 20)}px;
`;
const IconUp = styled(IconCaretUp)`
  color: ${green};
  margin: 0;
  font-size: ${({ smallSize }) => (smallSize ? 10 : 20)}px;
`;
const IconLeft = styled(IconCaretLeft)`
  color: ${green};
  margin: 0;
  font-size: ${({ smallSize }) => (smallSize ? 10 : 20)}px;
`;
const IconRight = styled(IconCaretRight)`
  color: ${green};
  margin: 0;
  font-size: ${({ smallSize }) => (smallSize ? 10 : 20)}px;
`;

const FlexWithMargins = styled(FlexContainer)`
  margin-top: ${({ smallSize }) => (smallSize ? -10 : 10)}px;
  margin-right: ${({ smallSize }) => (smallSize ? 5 : 30)}px;
  margin-left: ${({ smallSize }) => (smallSize ? 5 : 30)}px;
  align-self: center;
  & ${IconLeft}:hover, ${IconRight}:hover, ${IconUp}:hover, ${IconDown}:hover {
    color: ${greenDark};
    cursor: pointer;
  }
`;

const FlexCol = styled(FlexWithMargins)`
  flex-direction: column;
`;

const FullWidthContainer = styled.div`
  width: 100%;
  margin-right: 0;
`;
