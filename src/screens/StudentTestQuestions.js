import React,{Component} from 'react'
import '../css/App.css'
import { Query } from "react-apollo"

import { USER_QUESTIONS_QUERY, USER_QUESTION_STATS_QUERY } from '../ApolloQueries'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';

import TestHeaderStudent from '../components/TestHeaderStudent'
import PanelList from '../components/PanelList1'
import Error from '../components/Error'
import StudentTestHeader from '../components/StudentTestHeader'

import UserQuestionItem from '../components/UserQuestionItem'

import Loading from './Loading'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

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

class StudentTestQuestions extends Component {

  render() {

    const { testId } = this.props.location.state
    const { classes } = this.props

      return (

    <Query query={USER_QUESTIONS_QUERY} variables={{ testId }} fetchPolicy="cache-and-network">
          {({ loading, error, data }) => {
            if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
            if (error) return <div>{JSON.stringify(error)}</div>

            const { totalQuestions, answers, totalCorrect, percentCorrect, questions } = data.userQuestions1

        return (
          <Fade in={!loading}>
          <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} >
          <main className={classes.main}>

          <div style={{marginBottom:50}}>
          <StudentTestHeader classes={classes} test_id={testId} />
          <Paper style={{padding:15}}>
          <Typography variant="h" component="h4">
          Your Questions
          </Typography>

          <hr />

          <Grid container justify="center" spacing={24}>
          <Grid  item>
          <Typography variant="h" component="h5">
          Questions : {totalQuestions}
          </Typography>
          </Grid >

          <Grid  item>
          <Typography variant="h" component="h5">
            Answers: {answers}
          </Typography>
          </Grid >

          <Grid  item>

          <Typography variant="h" component="h5">
            Correct: {totalCorrect} ({Math.round(percentCorrect*100)}%)
          </Typography>

          </Grid >

          </Grid>
          </Paper>

          {
            questions.length >0 &&
            <Paper style={{padding:10,marginTop:10}}>
            {
              questions.map(uq => <UserQuestionItem {...uq} />)
            }
            </Paper>
          }
          </div>
          </main>
          </div>
          </Fade>
          )
        }}
        </Query>
        )
      }
    }

export default withStyles(styles)(StudentTestQuestions)
