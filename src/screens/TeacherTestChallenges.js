import React,{Component} from 'react'
import '../css/App.css'
import moment from 'moment'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import TeacherTestHeader from '../components/TeacherTestHeader'

import { Query } from "react-apollo"
import { CHALLENGE_DASHBOARD2_QUERY } from '../ApolloQueries'

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

class TeacherTestChallenges extends Component {

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
    const { classes, history } = this.props

      return (

        <main className={classes.main}>
        <div style={{marginBottom:50}}>

        <Query query={CHALLENGE_DASHBOARD2_QUERY} variables={{ testId: testId }} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
              if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

                const { challenges } = data.challenges

              return (
                <Fade in={!loading}>
                <>
                <TeacherTestHeader classes={classes} test_id={testId} />

                <Paper style={{padding:10}}>

                <div style={{margin:10}}><h4>Test Challenges </h4></div>

                {challenges.map(item =>

                  <Card style={{margin:10}} key={item.id}
                  onClick={()=>history.push({
                    pathname: "/challenge",
                    state:
                      { challengeId: item.id, role:'TEACHER'  }
                    })}
                    className={classes.card} >

                  <CardActionArea>
                  <CardContent>

                  <div><b>Challenge</b></div>

                  {item.challenge}

                  <div style={{fontSize:12,color:'lightgrey'}}>
                  {item.addedBy.firstName} {item.addedBy.lastName} {moment(item.addedDate).calendar()}
                  </div>

                  </CardContent>

                  <hr/>

                  <CardContent>

                  <div><b>Question</b></div>

                  {item.answer.question.question}

                  <div><b>Answer</b></div>

                  {item.answer.answer.choice}

                  </CardContent>

                </CardActionArea>
                </Card>
                )}

                </Paper>
                </>
                </Fade>

            )
          }}
          </Query>
          </div>
          </main>

        )
      }
    }

export default withStyles(styles)(TeacherTestChallenges)
