import PropTypes from 'prop-types';
import React from 'react';

import QuestionListItem from './QuestionListItem';

const SidebarQuestionList = ({ questions, selectedQuestion, gotoQuestion }) => (
  <div>
    {questions.map((item, index) => {
      const active = selectedQuestion === index;
      const beforeSelection = selectedQuestion >= index;
      return (
        <QuestionListItem
          index={index}
          active={active}
          beforeSelection={beforeSelection}
          key={index}
          gotoQuestion={gotoQuestion}
        />
      );
    })}
  </div>
);

SidebarQuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  selectedQuestion: PropTypes.number.isRequired,
  gotoQuestion: PropTypes.func.isRequired
};

export default SidebarQuestionList;
