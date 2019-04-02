import React from 'react';
import { DragSource } from 'react-dnd';

import { white, grey, lightGreen, lightRed, red, green } from '@edulastic/colors';
import { IconCheck, IconClose } from '@edulastic/icons';
import { FlexContainer } from '@edulastic/common';

import { getStyles, IndexBox } from './StyledItem';

function collectSource(connector, monitor) {
  return {
    connectDragSource: connector.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const specSource = {
  beginDrag(props) {
    return { item: props.item };
  },

  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      return;
    }

    const itemCurrent = monitor.getItem();

    const itemTo = monitor.getDropResult();

    props.onDrop(itemCurrent, itemTo);
  }
};

const DragItem = ({ connectDragSource, item, isDragging, valid, preview, renderIndex }) =>
  item &&
  connectDragSource(
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        margin: '10px 15px 10px 15px',
        opacity: isDragging ? 0 : 1
      }}
    >
      {preview && valid !== undefined && (
        <IndexBox preview={preview} valid={valid}>
          {renderIndex + 1}
        </IndexBox>
      )}
      <div
        style={getStyles(
          isDragging,
          valid && preview ? lightGreen : preview && valid !== undefined ? lightRed : white,
          valid && preview ? lightGreen : preview && valid !== undefined ? lightRed : grey,
          preview && valid !== undefined
            ? {
              paddingRight: 15,
              paddingLeft: 15,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0
            }
            : { borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }
        )}
      >
        <FlexContainer
          alignItems="center"
          justifyContent="space-between"
          style={{ width: '100%', fontWeight: 600 }}
        >
          <div dangerouslySetInnerHTML={{ __html: item }} />
          {preview && valid !== undefined && (
            <div>
              {valid && <IconCheck color={green} width={12} height={10} />}
              {!valid && <IconClose color={red} width={10} height={10} />}
            </div>
          )}
        </FlexContainer>
      </div>
    </div>
  );

export default DragSource('item', specSource, collectSource)(DragItem);
