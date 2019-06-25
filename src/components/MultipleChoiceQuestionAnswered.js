import React,{Component} from 'react'
import '../css/App.css'

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import { Query } from "react-apollo"
import { ANSWERED_QUESTION_QUERY } from '../ApolloQueries'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    //backgroundColor: theme.palette.primary.main,

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    minWidth: 275,
    position: 'relative',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,

  },
});

class MultipleChoiceQuestionAnswered extends Component {

    render() {

      const { classes, answer, question, answerCorrect } = this.props

      const { choices } = question

      const selectedColor = green[700]
      const wrong = red[700]


      const button1 = choices[0].correct ? selectedColor : wrong
      const button2 = choices[1].correct ? selectedColor : wrong
      const button3 = choices[2].correct ? selectedColor : wrong
      const button4 = choices[3].correct ? selectedColor : wrong

      return (
        <>
        <div style={{marginBottom:20}}>

        {answer.answerCorrect ?
        <div >

        <center>

          <ThumbUpAltIcon fontSize='large' style={{color:green[400]}}/>

        </center>

        <Typography style={{color:green[400]}} component="h4" variant="h4">
          You got it right!
        </Typography>

        <div style={{margin:10}} >

        <h4>
          {answer.choice}
        </h4>

        </div>

        </div>
        :
        <div >
        <center>

          <ThumbDownAltIcon fontSize='large' style={{color:red[400]}}/>

        </center>

        <Typography style={{color:red[400]}} component="h4" variant="h4">
          You got it wrong!
        </Typography>

        <div style={{margin:10}} >

        <h4>
          {answer.choice}
        </h4>

        </div>

        </div>
      }

      </div>

      <hr />

      <h3>
        {question.question}
      </h3>

      <div style={{marginTop:20}}>
      <Card style={{backgroundColor:button1,
        minWidth: 275,
        position: 'relative',
      }} >

        <CardContent>

          <h5>
            {choices[0].choice}
          </h5>

          </CardContent>

      </Card>
      </div>

      <div style={{marginTop:20}}>
      <Card style={{backgroundColor:button2,
      minWidth: 275,
      position: 'relative',
      }}  >

      <CardContent>

        <h5>
          {choices[1].choice}
        </h5>

        </CardContent>

      </Card>
      </div>

      <div style={{marginTop:20}}>
      <Card style={{backgroundColor:button3,
      minWidth: 275,
      position: 'relative',
      }} >

      <CardContent>

      <h5>
        {choices[2].choice}
      </h5>

      </CardContent>

      </Card>
      </div>

      <div style={{marginTop:20}}>
      <Card style={{backgroundColor:button4,
      minWidth: 275,
      position: 'relative',
      }} >

      <CardContent>

      <h5>
      {choices[3].choice}
      </h5>

      </CardContent>

      </Card>
      </div>
      </>
  )
}
}

export default withStyles(styles)(MultipleChoiceQuestionAnswered)
