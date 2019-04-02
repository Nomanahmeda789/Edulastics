import React, { memo } from 'react';

const QuestionAttempt = memo(({ current, total }) => (
  <p>
    {current}/{total}
  </p>
));

export default QuestionAttempt;
