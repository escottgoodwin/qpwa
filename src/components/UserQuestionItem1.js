import React from 'react'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

const UserQuestionItem = (props) =>

    <>
    <Card onClick={()=> props.history.push({
      pathname: "/question",
      state:
        { questionId: props.id }
      })}
      style={{marginBottom:10}}
    >
    <CardActionArea>
    <CardContent >

   <h4>{props.question}</h4>
   <hr/>
   </CardContent >

   <CardContent >
   <div >

   {props.questionType==='SHORT_ANSWER' ?
    <div style={{textAlign:'left', color:'green'}} style={{color:'green'}} key={props.id}>
    <h5>{props.correctShortAnswer}</h5>
    </div>
   :
   <div>
   {props.choices.map(choice => choice.correct ?
     <div style={{textAlign:'left', color:'green'}} key={choice.id} ><h5>{choice.choice}</h5></div>
     :
     <div style={{textAlign:'left', color:'red'}} key={choice.id} ><h5>{choice.choice}</h5></div>)
   }
   </div>

 }
 </div>
 </CardContent >
  <CardContent >
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
   </CardContent>
   </CardActionArea>
   </Card>
</>



export default UserQuestionItem
