import React from 'react'
import Grid from '@material-ui/core/Grid';

const UserQuestionItem = (props) =>

    <>
    <
   <div style={{margin:10}}><h4>{props.question}</h4></div>
   <hr/>
   <div style={{marginLeft:35,marginRight:35}}>

   <div>
   {props.choices.map(choice => choice.correct ?
     <div style={{textAlign:'left', color:'green',margin:10}} key={choice.id} ><h5>{choice.choice}</h5></div>
     :
     <div style={{textAlign:'left', color:'red',margin:10}} key={choice.id} ><h5>{choice.choice}</h5></div>)}
    </div>
  <div>
  
    <hr/>
  <div style={{margin:10}}>
  <Grid container justify="center" >

   <Grid item xs={6}>
   <h5>Answers: {props.questionAnswers.length}</h5>
   </Grid>


   <Grid item xs={6}>
   <h5>Correct: {props.questionAnswers.filter(answer => answer.answerCorrect).length} ({
     props.questionAnswers.filter(answer =>
       answer.answerCorrect).length / props.questionAnswers.length > 0 ?
       Math.round(props.questionAnswers.filter(answer => answer.answerCorrect).length / props.questionAnswers.length*100)
       :
       0
   })%</h5>
   </Grid>
   </Grid>
   </div>
</>



export default UserQuestionItem
