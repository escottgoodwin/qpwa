import React,{Component} from 'react'
import '../css/App.css'
import { Query } from "react-apollo"

import { USER_QUESTIONS_QUERY, USER_QUESTION_STATS_QUERY } from '../ApolloQueries'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import TestHeaderStudent from '../components/TestHeaderStudent'
import PanelList from '../components/PanelList1'
import Error from '../components/Error'
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

        <main className={classes.main}>

        <div style={{marginBottom:50}}>

        <Query query={USER_QUESTION_STATS_QUERY} variables={{ testId  }} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

              const userQuestionStats = data.userQuestionStats

          return (

      <>
      <Paper style={{padding:10}}>
      <div>Questions : {userQuestionStats.totalQuestions} </div>
      <div>Answers: {userQuestionStats.answers} </div>

      <div>Correct: {userQuestionStats.totalCorrect} </div>
      <div>Percent: {Math.round(userQuestionStats.percentCorrect*100)}% </div>
      </Paper>
      </>
      )
    }}
    </Query>

    <Query query={USER_QUESTIONS_QUERY} variables={{ testId }} fetchPolicy="cache-and-network">
          {({ loading, error, data }) => {
            if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
            if (error) return <div>{JSON.stringify(error)}</div>

            const userQuestions = data.userQuestions
            console.log(userQuestions)

        return (

          <Paper style={{padding:10,margin:10}}>

          {
            userQuestions.map(uq => <UserQuestionItem {...uq} />)
          }
          </Paper>
          )
        }}
        </Query>

          </div>
          </main>

        )
      }
    }

export default withStyles(styles)(StudentTestQuestions)
