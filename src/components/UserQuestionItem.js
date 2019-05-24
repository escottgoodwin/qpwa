import React from 'react'

import PropTypes from 'prop-types'

const UserQuestionItem = (props) =>

    <>
   <div>{props.question}</div>

   {props.choices.map(choice => choice.correct ?
     <div key={choice.id} >{choice.choice}</div>
     :
     <div key={choice.id} >{choice.choice}</div>)}


   <div >
   Number: {props.questionAnswers.length}
   </div>

   <div>
   Correct: {props.questionAnswers.filter(answer => answer.answerCorrect).length}
   </div>

   <div >
   {
     props.questionAnswers.filter(answer =>
       answer.answerCorrect).length / props.questionAnswers.length > 0 ?
       Math.round(props.questionAnswers.filter(answer => answer.answerCorrect).length / props.questionAnswers.length*100)
       :
       0
   }%
   </div>
</>



export default UserQuestionItem
