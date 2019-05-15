import { FETCH_QUESTIONS, ANSWER_UPDATE } from '../actions/types';

const initialState = {
    questions:[],
    qid:0,
    loading:true
}
//assign downloaded questions to 'questions', loading to false, and qid 0 for restarts in store
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading:false,
        qid:0
      };
      // reassign updated questions array with +/- to questions and add 1 to qid to advance to the next question
    case ANSWER_UPDATE:
      return {
        ...state,
        questions: action.payload.questions,
        qid: action.payload.qid+1
      };
    default:
      return state;
  }
}
