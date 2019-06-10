import React,{Component} from 'react'
import '../css/App.css'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import TeacherTestHeader from '../components/TeacherTestHeader'

import { Query } from "react-apollo"
import { TEST_QUESTIONS_QUERY } from '../ApolloQueries'

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

class TeacherTestAllQuestions extends Component {

  answerRandom = (questions) =>  {
    const randomInt = Math.floor(Math.random() * questions.length)
    const randomId = questions[randomInt].id
    this.props.history.push({
      pathname: "/answer_question",
      state:
        { questionId: randomId }
      })
    }

  render() {

    const { testId } = this.props.location.state
    const { classes } = this.props

      return (

        <Query query={TEST_QUESTIONS_QUERY} variables={{ testId: testId }} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
              if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

                const { questions } = data.test

              return (
                <Fade in={!loading}>
                <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} >
                <main className={classes.main}>
                <div style={{marginBottom:50}}>
                <TeacherTestHeader classes={classes} test_id={testId} />

                <Paper style={{padding:25,marginTop:10}}>

                {
                  questions.map(item =>

                    <Link  to={{
                      pathname: "/teacher_question",
                      state:
                        { questionId: item.id,
                          testId }
                      }} >

                    <h5 key={item.id}>
                      {item.question}
                    </h5>

                    </Link>

                  )
                }
                </Paper>
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

export default withStyles(styles)(TeacherTestAllQuestions)
