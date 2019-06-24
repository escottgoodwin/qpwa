import React,{Component} from 'react'
import '../css/App.css'

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea'
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { Mutation } from "react-apollo"
import {CREATE_QUESTION_MUTATION} from '../ApolloQueries'

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
});

class CreateShortAnswerQuestion extends Component {

  state = {
        question:'',
        correctShortAnswer:'',
        graphQLError:'',
        isVisibleGraph:false,
        networkError:'',
        isVisibleNet:false,
      }

    render() {

      const { question,
              correctShortAnswer,
              graphQLError,
              networkError,
              isVisibleNet,
              isVisibleGraph } = this.state

      const { classes, panelId, testId, } = this.props

      return (
        <>
      <form className={classes.form}>

      <Paper className={classes.paper}>
      <TextField
          id="filled-multiline-flexible"
          label="Question"
          multiline
          rows="4"
          fullWidth
          className={classes.textField}
          value={question}
          onChange={e => this.setState({ question: e.target.value })}
          margin="normal"
        />
        </Paper>


      <Paper className={classes.paper}>
      <TextField
          id="outlined-full-width"
          label="Correct Answer"
          fullWidth
          className={classes.textField}
          value={correctShortAnswer}
          onChange={e => this.setState({ correctShortAnswer: e.target.value })}
          margin="normal"
        />
        </Paper>



        <div style={{margin:10}}>
        <Mutation
            mutation={CREATE_QUESTION_MUTATION}
            variables={{
              testId,
              panelId,
              question,
              correctShortAnswer,
            }}
            onCompleted={data => this._confirm(data)}
            onError={error => this._error (error)}
          >

            {mutation => (
              <Button
              fullWidth
              variant="contained"
              size='large'
              color="primary"
              className={classes.submit}
              onClick={mutation}>Review</Button>
            )}
        </Mutation>
        </div>

        </form>

          <ErrorSnack handleClose={() => this.setState({isVisibleGraph:false})} classes={classes} open={isVisibleGraph} errorMsg={graphQLError} />

          <ErrorSnack handleClose={() => this.setState({isVisibleNet:false})} classes={classes} open={isVisibleNet} errorMsg={networkError.message} />
          </>
  )
}

_error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
    this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

    error.networkError &&
      this.setState({ isVisibleNet: true, networkError: error.networkError.message})

}
  _confirm = async data => {

    const { questionId } = this.props.location.state

    const { id, test } = data.createQuestion
    this.props.history.push({
      pathname: `/review_question`,
      state: { newQuestionId: id, oldQuestionId: questionId, testId: test.id }
      })
  }

  }

export default withStyles(styles)(CreateShortAnswerQuestion)
