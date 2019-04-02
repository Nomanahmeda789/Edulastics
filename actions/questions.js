import {
  LOAD_QUESTIONS,
  GOTO_QUESTION,
  AUTHOR_QUESTION,
  ADD_ANSWER
} from '../constants/actions';

export const loadQuestions = questions => ({
  type: LOAD_QUESTIONS,
  payload: {
    questions
  }
});

export const gotoQuestion = question => ({
  type: GOTO_QUESTION,
  payload: {
    question
  }
});

export const addQuestion = question => ({
  type: AUTHOR_QUESTION,
  payload: {
    ...question
  }
});

export const addAnswer = (qid, answer) => ({
  type: ADD_ANSWER,
  payload: {
    qid,
    answer
  }
});
