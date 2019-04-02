import React from 'react';
import { DragSource } from 'react-dnd';
import PropTypes from 'prop-types';

import { green, grey, red } from '@edulastic/colors';
import { IconCheck, IconClose } from '@edulastic/icons';

import {
  Container,
  Text,
  StyledDragHandle,
  TextEmpty,
  WithIndex,
  FlexCenter
} from './styled_components';
import DragHandle from '../DragHandle';
import { CHECK, SHOW, CLEAR } from '../../../constants/constantsForQuestions';

function collectSource(connector, monitor) {
  return {
    connectDragSource: connector.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const specSource = {
  beginDrag(props) {
    const item = { item: props.obj, index: props.index };
    props.onClick({});
    return item;
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }

    const itemCurrent = monitor.getItem();

    const itemTo = monitor.getDropResult();

    props.onDrop(itemCurrent, itemTo, props.flag);
  }
};

const DragItem = ({
  connectDragSource,
  obj,
  isDragging,
  onClick,
  active,
  smallSize,
  correct,
  previewTab,
  index
}) => {
  const showPreview = previewTab === CHECK || previewTab === SHOW;

  return obj ? (
    connectDragSource(
      <div
        onClick={() => (active ? onClick('') : onClick(obj))}
        style={{
          opacity: isDragging ? 0 : 1,
          background: active ? grey : 'transparent',
          borderRadius: 4
        }}
      >
        <Container smallSize={smallSize}>
          {!showPreview && (
            <StyledDragHandle smallSize={smallSize}>
              <DragHandle smallSize={smallSize} />
            </StyledDragHandle>
          )}

          <Text checkStyle={!active && showPreview} correct={correct} smallSize={smallSize}>
            <FlexCenter>
              {showPreview ? <WithIndex>{index + 1}</WithIndex> : ''}
              <div dangerouslySetInnerHTML={{ __html: obj }} />
            </FlexCenter>
            {showPreview && (
              <div>
                {correct && <IconCheck color={green} width={22} height={16} />}
                {!correct && <IconClose color={red} width={16} height={16} />}
              </div>
            )}
          </Text>
        </Container>
      </div>
    )
  ) : (
    <div>
      <TextEmpty smallSize={smallSize} />
    </div>
  );
};

DragItem.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  obj: PropTypes.any,
  isDragging: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  smallSize: PropTypes.bool.isRequired,
  correct: PropTypes.bool,
  previewTab: PropTypes.string,
  index: PropTypes.number.isRequired
};

DragItem.defaultProps = {
  obj: null,
  correct: false,
  previewTab: CLEAR
};

export default DragSource('item', specSource, collectSource)(DragItem);
