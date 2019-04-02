import {
  LOAD_QUESTIONS,
  GOTO_QUESTION,
  ADD_ANSWER,
  ADD_EVALUATION,
} from '../constants/actions';

const initialState = {
  currentQuestion: 0,
  questions: [],
};

const question = (state, action) => {
  switch (action.type) {
    case ADD_ANSWER:
      // eslint-disable-next-line
      if (action.payload.qid === state._id) {
        const { answer } = action.payload;
        const evaluation =
          answer === state.answer ? state.evaluation : undefined;
        return {
          ...state,
          answer,
          evaluation,
        };
      }
      return state;
    case ADD_EVALUATION:
      // eslint-disable-next-line
      if (action.payload.qid === state._id) {
        return {
          ...state,
          evaluation: action.payload.answer,
        };
      }
      return state;
    default:
      return state;
  }
};

const questions = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_QUESTIONS:
      return {
        ...state,
        questions: action.payload.questions,
      };
    case GOTO_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload.question,
      };
    case ADD_ANSWER:
      return {
        ...state,
        questions: state.questions.slice().map(q => question(q, action)),
      };
    case ADD_EVALUATION:
      return {
        ...state,
        questions: state.questions.slice().map(q => question(q, action)),
      };
    default:
      return state;
  }
};

export default questions;
