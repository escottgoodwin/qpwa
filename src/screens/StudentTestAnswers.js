import React,{Component} from 'react'
import '../css/App.css'

import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import StudentTestHeader from '../components/StudentTestHeader'
import UserAnswerStats from '../components/UserAnswerStats'

import { Query } from "react-apollo"
import { USER_ANSWERS_QUERY } from '../ApolloQueries'

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
    backgroundColor: theme.palette.primary.main,
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
});

class StudentTestAnswers extends Component {

  render() {

    const { testId } = this.props.location.state
    const { classes } = this.props

      return (

        <main className={classes.main}>

        <div style={{marginBottom:50}}>

      <Query query={USER_ANSWERS_QUERY} variables={{ testId: testId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

              const { total, totalCorrect, percentCorrect, answers } = data.userAnswers1


              return (
                <Fade in={!loading}>
                <div  >

                <StudentTestHeader classes={classes} test_id={testId} />

                <UserAnswerStats classes={classes} testId={testId} />

                {
                  answers.length>0 &&


                <Paper style={{padding:25,marginTop:10}}>
                <hr />
                {
                  answers.map(item =>
                    <>
                    <h5  >
                     {item.question.question}
                    </h5>

                    {item.answerCorrect ?
                      <h5 style={{color:'green'}} >{item.answer.choice}</h5>
                      :
                      <>
                      <h5 style={{color:'red'}} >{item.answer.choice}</h5>
                      <h5 style={{color:'green'}} >{item.question.choices.filter(choice => choice.correct)[0].choice}</h5>
                      </>
                    }
                    <hr />
                    </>
                  )
                }
                </Paper>
                }
                </div>

                </Fade>

            )
          }}
          </Query>
          </div>

          </main>


            )
      }
    }

export default withStyles(styles)(StudentTestAnswers)
