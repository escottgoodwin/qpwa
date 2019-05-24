import React,{Component} from 'react'
import '../css/App.css'
import { Query } from "react-apollo"

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { USER_ANSWERS_QUERY, USER_ANSWERED_QUERY } from '../ApolloQueries'

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

class StudentTestAnswers extends Component {

  render() {

    const { testId } = this.props.location.state
    const { classes } = this.props

      return (

        <main className={classes.main}>

        <div style={{marginBottom:50}}>

        <Query query={USER_ANSWERED_QUERY} variables={{ testId: testId }} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <div>Loading...</div>
                if (error) return <div> {JSON.stringify(error)} </div>

                const userAnsweredStats = data.userAnsweredStats

            return (
              <Paper style={{padding:10}}>
              <h5>Your Answers</h5>
              <div>Total: {userAnsweredStats.total} </div>
              <div>Correct: {userAnsweredStats.totalCorrect} </div>
              <div>{Math.round(userAnsweredStats.percentCorrect*100)}% </div>
              </Paper>
            )
          }}
      </Query>


      <Paper style={{padding:10,margin:10}}>
      <Query query={USER_ANSWERS_QUERY} variables={{ testId: testId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>
              if (error) return <div> {JSON.stringify(error)} </div>

              const answersToRender = data.userAnswers

              return (

                <div>

                {
                  answersToRender.map(item =>
                    <>
                    <h5  >
                     {item.question.question}
                    </h5>

                    {item.answerCorrect ?
                      <h5 style={{color:'green'}} >{item.answer.choice}</h5>
                      :
                      <h5 style={{color:'red'}} >{item.answer.choice}</h5>}
                    <hr />
                    </>
                  )
                }

                </div>

            )
          }}
          </Query>


          </Paper>
              </div>
              </main>

            )
      }
    }

export default withStyles(styles)(StudentTestAnswers)
