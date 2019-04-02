import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-drag-and-drop';

const ResponseBoxLayout = ({ smallSize, hasGroupResponses, responses, fontSize, dragHandler }) => {
  const handleMove = (e) => {
    if (e.clientY < 100) {
      window.scrollTo(window.pageXOffset, window.pageYOffset - 10);
    } else if (e.clientY > window.innerHeight - 100) {
      window.scrollTo(window.pageXOffset, window.pageYOffset + 10);
    }
  };

  useEffect(() => {
    document.body.addEventListener('dragover', handleMove);
    return () => {
      document.body.removeEventListener('dragover', handleMove);
    };
  }, []);

  return (
    <div
      className="responses_box"
      style={{
        padding: smallSize ? '5px 10px' : 16,
        borderRadius: smallSize ? 0 : 10,
        justifyContent: smallSize ? 'space-around' : 'flex-start'
      }}
    >
      {hasGroupResponses &&
        responses.map((groupResponse, index) => {
          if (groupResponse !== null && typeof groupResponse === 'object') {
            return (
              <div key={index} className="group">
                <h3>{groupResponse.title}</h3>
                {groupResponse.options &&
                  groupResponse.options.map((option, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="draggable_box"
                      style={{ fontSize: smallSize ? 10 : fontSize }}
                    >
                      {!dragHandler && (
                        <Draggable type="metal" data={`${option}_${index}`}>
                          {option}
                        </Draggable>
                      )}
                      {dragHandler && (
                        <React.Fragment>
                          <Draggable type="metal" data={`${option}_${index}`}>
                            <i className="fa fa-arrows-alt" style={{ fontSize: 12 }} />
                            <span>{option}</span>
                          </Draggable>
                        </React.Fragment>
                      )}
                    </div>
                  ))}
              </div>
            );
          }
          return <React.Fragment key={index} />;
        })}
      {!hasGroupResponses &&
        responses.map((option, index) => (
          <div
            key={index}
            className="draggable_box"
            style={{ fontSize: smallSize ? 11 : fontSize, fontWeight: smallSize ? 600 : 300 }}
          >
            {!dragHandler && (
              <Draggable type="metal" data={option}>
                {option}
              </Draggable>
            )}
            {dragHandler && (
              <React.Fragment>
                <Draggable type="metal" data={option}>
                  <i className="fa fa-arrows-alt" style={{ fontSize: 12 }} />
                  <span>{option}</span>
                </Draggable>
              </React.Fragment>
            )}
          </div>
        ))}
    </div>
  );
};

ResponseBoxLayout.propTypes = {
  responses: PropTypes.array,
  fontSize: PropTypes.string,
  hasGroupResponses: PropTypes.bool,
  smallSize: PropTypes.bool,
  dragHandler: PropTypes.bool
};

ResponseBoxLayout.defaultProps = {
  responses: [],
  fontSize: '13px',
  smallSize: false,
  hasGroupResponses: false,
  dragHandler: false
};

export default React.memo(ResponseBoxLayout);
