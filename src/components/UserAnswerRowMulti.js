import React from 'react';
import '../css/App.css';


const UserAnswerRowMulti = props =>
<div>
  {props.answerCorrect ?
    <><h5>Your Answer</h5><h5 style={{color:'green'}} >{props.answer.choice}</h5></>
    :
    <>
    <><h5>Your Answer</h5><h5 style={{color:'red'}} >{props.answer.choice}</h5></>
    <><h5>Correct Answer</h5><h5 style={{color:'green'}} >{props.question.choices.filter(choice => choice.correct)[0].choice}</h5></>
    </>
}
</div>

export default UserAnswerRowMulti
