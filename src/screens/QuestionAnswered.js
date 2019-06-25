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

import MultipleChoiceQuestionAnswered from '../components/MultipleChoiceQuestionAnswered'
import ShortAnswerQuestionAnswered from '../components/ShortAnswerQuestionAnswered'


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

class QuestionAnswered extends Component {

  state = {
        answerChoiceId:'',
        choice1:'',
        choiceCorrect1:false,
        button1:'white',
        choice2:'',
        choiceCorrect2:false,
        button2:'white',
        choice3:'',
        choiceCorrect3:false,
        button3:'white',
        choice4:'',
        choiceCorrect4:false,
        button4:'white',
        choice1Id:'',
        choice2Id:'',
        choice3Id:'',
        choice4Id:'',
        graphQLError:'',
        isVisibleGraph:false,
        networkError:'',
        isVisibleNet:false,
      }

    render() {

      const { classes } = this.props
      const { answerId } = this.props.location.state
      const selectedColor = green[700]
      const wrong = red[700]

      return (
      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:50}}>

        <Query query={ANSWERED_QUESTION_QUERY} variables={{ answerId }} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { answer, question, answerCorrect } = data.answer


            return (
              <Fade in={!loading}>
              <Paper className={classes.paper}>
              <div style={{marginTop:20}}>

              { question.testType!=='SHORT_ANSWER' ?
                <ShortAnswerQuestionAnswered {...data.answer}/>
                :
                <MultipleChoiceQuestionAnswered {...data.answer}/>
              }

              <div style={{margin:10}}>
            <Button
            fullWidth
            variant="contained"
            color="primary"
            size='large'
            className={classes.submit}
            onClick={() => this.props.history.push({
              pathname: `/challenge_question`,
              state: { answerId: answerId, questionId: question.id }
            })}>
            Challenge Question
            </Button>
            </div>

            <div style={{margin:10}}>
            <Button
            fullWidth
            variant="contained"
            color="primary"
            size='large'
            className={classes.submit}
            onClick={() => this.props.history.push({
              pathname: `/student_test_dashboard`,
              state: { test_id: question.test.id }
            })}>Test Dashboard</Button>
            </div>

            </div>
            </Paper>
            </Fade>
          )
        }}
        </Query>


        </div>
      </main>


  )
}

_error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
    this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

    error.networkError &&
      this.setState({ isVisibleNet: true, networkError: error.networkError.message})

}
  _confirm = async data => {

    const { oldQuestionId } = this.props.location.state

    this.props.history.push({
      pathname: `/answer_question`,
      state: { questionId: oldQuestionId }
      })
    }

  }

export default withStyles(styles)(QuestionAnswered)
