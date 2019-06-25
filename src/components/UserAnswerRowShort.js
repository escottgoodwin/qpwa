import React from 'react';
import '../css/App.css';


const UserAnswerRowShort = props =>
<div>
  {props.answerCorrect ?
    <><h5>Your Answer</h5><h5 style={{color:'green'}} >{props.question.correctShortAnswer}</h5></>
    :
    <>
    <><h5>Your Answer</h5><h5 style={{color:'red'}} >{props.shortAnswerText}</h5></>
    <><h5>Correct Answer</h5><h5 style={{color:'green'}} >{props.question.correctShortAnswer}</h5></>
    </>
}
</div>

export default UserAnswerRowShort
