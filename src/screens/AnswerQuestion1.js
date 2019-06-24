import React,{Component} from 'react'
import '../css/App.css'

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import CardActionArea from '@material-ui/core/CardActionArea'
import blueGrey from '@material-ui/core/colors/blueGrey';

import { Mutation, Query } from "react-apollo"
import {ANSWER_QUESTION_QUERY, ANSWER_QUESTION_MUTATION} from '../ApolloQueries'

import ErrorSnack from '../components/ErrorSnack'

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
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,

  },
});

class AnswerQuestion extends Component {

      state = {
            answerChoiceId:'',
            button1:'white',
            button2:'white',
            button3:'white',
            button4:'white',
            graphQLError:'',
            isVisibleGraph:false,
            networkError:'',
            isVisibleNet:false,
          }

      handleChange = event => {
          this.setState({ value: event.target.value });
        };


    render() {

      const { answerChoiceId,
              button1,
              button2,
              button3,
              button4,
              graphQLError,
              networkError,
              isVisibleNet,
              isVisibleGraph } = this.state

      const { classes } = this.props
      const { questionId } = this.props.location.state
      const selectedColor = blueGrey[200]

      return (
      <div style={{height:'100vh',backgroundColor:'#e4f1fe'}}>
      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:50}}>


        <Query query={ANSWER_QUESTION_QUERY} variables={{ questionId: questionId }} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { question, choices } = data.question

            return (
              <Fade in={!loading}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <QuestionAnswerIcon />
                </Avatar>


        <div style={{marginTop:20}}>

          <h3>
            {question}
          </h3>

          <div style={{marginTop:20}}>
        <Card style={{backgroundColor:button1,
          minWidth: 275,
          position: 'relative',
        }} onClick={() => this.setState({
          answerChoiceId: choices[0].id,
          choiceCorrect1:true,
          choiceCorrect2:false,
          choiceCorrect3:false,
          choiceCorrect4:false,
          button1:selectedColor ,
          button2:'white',
          button3:'white',
          button4:'white'
        })} >
          <CardActionArea>
          <CardContent>

            <h5>
              {choices[0].choice}
            </h5>

            </CardContent>
          </CardActionArea>
        </Card>
        </div>

      <div style={{marginTop:20}}>
      <Card style={{backgroundColor:button2,
        minWidth: 275,
        position: 'relative',
      }} onClick={() => this.setState({
        answerChoiceId: choices[1].id,
        choiceCorrect1:false,
        choiceCorrect2:true,
        choiceCorrect3:false,
        choiceCorrect4:false,
        button1:'white',
        button2:selectedColor,
        button3:'white',
        button4:'white'
      })} >
        <CardActionArea>
        <CardContent>

          <h5>
            {choices[1].choice}
          </h5>

          </CardContent>
        </CardActionArea>
      </Card>
      </div>

    <div style={{marginTop:20}}>
    <Card style={{backgroundColor:button3,
      minWidth: 275,
      position: 'relative',
    }} onClick={() => this.setState({
      answerChoiceId: choices[2].id,
      choiceCorrect1:true,
      choiceCorrect2:false,
      choiceCorrect3:false,
      choiceCorrect4:false,
      button1:'white',
      button2:'white',
      button3:selectedColor,
      button4:'white'
    })} >
      <CardActionArea>
      <CardContent>

        <h5>
          {choices[2].choice}
        </h5>

        </CardContent>
      </CardActionArea>
    </Card>
    </div>

    <div style={{marginTop:20}}>
  <Card style={{backgroundColor:button4,
    minWidth: 275,
    position: 'relative',
  }} onClick={() => this.setState({
    answerChoiceId: choices[3].id,
    choiceCorrect1:true,
    choiceCorrect2:false,
    choiceCorrect3:false,
    choiceCorrect4:false,
    button1:'white',
    button2:'white',
    button3:'white',
    button4:selectedColor
  })} >
    <CardActionArea>
    <CardContent>

      <h5>
        {choices[3].choice}
      </h5>

      </CardContent>
    </CardActionArea>
  </Card>
  </div>

        <div style={{margin:10}}>
        <Mutation
            mutation={ANSWER_QUESTION_MUTATION}
            variables={{
              questionId,
              answerChoiceId
            }}
            onCompleted={data => this._confirm(data)}
            onError={error => this._error (error)}
          >
            {mutation => (
              <Button
              fullWidth
              variant="contained"
              color="primary"
              size='large'
              className={classes.submit}
              onClick={mutation}>Submit Answer</Button>
            )}
        </Mutation>
        </div>

        </div>
        </Paper>
        </Fade>
          )
          }}
          </Query>


        </div>
      </main>

      <ErrorSnack handleClose={() => this.setState({isVisibleGraph:false})} classes={classes} open={isVisibleGraph} errorMsg={graphQLError} />

      <ErrorSnack handleClose={() => this.setState({isVisibleNet:false})} classes={classes} open={isVisibleNet} errorMsg={networkError.message} />


      </div>

  )
}

_error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
    this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

    error.networkError &&
      this.setState({ isVisibleNet: true, networkError: error.networkError.message})

}
  _confirm = async data => {

    const { id } = data.addAnswer

    this.props.history.push({
      pathname: `/question_answered`,
      state: { answerId: id }
      })
    }

  }

export default withStyles(styles)(AnswerQuestion)
