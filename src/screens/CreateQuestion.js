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

import { Mutation, Query } from "react-apollo"
import {CREATE_QUESTION_QUERY,CREATE_QUESTION_MUTATION} from '../ApolloQueries'

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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CreateQuestion extends Component {

  state = {
        question:'',
        choice1:'',
        choiceCorrect1:false,
        button1:'outlined',
        choice2:'',
        choiceCorrect2:false,
        button2:'outlined',
        choice3:'',
        choiceCorrect3:false,
        button3:'outlined',
        choice4:'',
        choiceCorrect4:false,
        button4:'outlined',
        graphQLError:'',
        isVisibleGraph:false,
        networkError:'',
        isVisibleNet:false,
        open: false
      }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

    render() {

      const { question,
              choice1,
              choiceCorrect1,
              choice2,
              choiceCorrect2,
              choice3,
              choiceCorrect3,
              choice4,
              choiceCorrect4,
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

      return (

      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:50}}>

        <Query query={CREATE_QUESTION_QUERY} variables={{ questionId: questionId }} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div> {JSON.stringify(error)} </div>

                const questionToRender = data.question

                const { sentPanel, test } = data.question

                const { subject, testNumber } = test

            return (
              <Fade in={!loading}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <QuestionAnswerIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Create Question
                </Typography>

        <div>

        <div style={{marginTop:10}}>
        <Card onClick={this.handleClickOpen} className={styles.card}>
        <CardActionArea>

              <CardMedia
                  src={sentPanel.link}
                  component="img"
              />
              </CardActionArea>
          </Card>
          </div>
          <Dialog
        fullScreen
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
        >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
          {testNumber} - {subject}
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{marginTop:60}}>

        <img style={{maxHeight:'100vw', maxWidth:'100vh', transform: 'translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%)) rotate(90deg)' }} src={sentPanel.link} alt="Logo" />

        </div>
        </Dialog>

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
          label="Choice 1"
          fullWidth
          className={classes.textField}
          value={choice1}
          onChange={e => this.setState({ choice1: e.target.value })}
          margin="normal"
        />


        <Button
        fullWidth
        variant={button1}
        color="primary"
        className={classes.submit}
        onClick={() => this.setState({
          choiceCorrect1:true,
          choiceCorrect2:false,
          choiceCorrect3:false,
          choiceCorrect4:false,
          button1:'contained',
          button2:'outlined',
          button3:'outlined',
          button4:'outlined'
        })}>Correct</Button>
        </Paper>


      <Paper className={classes.paper}>
      <TextField
          id="outlined-full-width"
          label="Choice 2"
          fullWidth
          className={classes.textField}
          value={choice2}
          onChange={e => this.setState({ choice2: e.target.value })}
          margin="normal"
        />

        <Button
        fullWidth
        variant={button2}
        color="primary"
        className={classes.submit}
        onClick={() => this.setState({
          choiceCorrect1:false,
          choiceCorrect2:true,
          choiceCorrect3:false,
          choiceCorrect4:false,
          button1:'outlined',
          button2:'contained',
          button3:'outlined',
          button4:'outlined'
        })}>
        Correct
        </Button>
        </Paper>

        <Paper className={classes.paper}>
        <TextField
            id="outlined-full-width"
            label="Choice 3"
            fullWidth
            className={classes.textField}
            value={choice3}
            onChange={e => this.setState({ choice3: e.target.value })}
            margin="normal"
          />

          <Button
          fullWidth
          variant={button3}
          color="primary"
          className={classes.submit}
          onClick={() => this.setState({
            choiceCorrect1:false,
            choiceCorrect2:false,
            choiceCorrect3:true,
            choiceCorrect4:false,
            button1:'outlined',
            button2:'outlined',
            button3:'contained',
            button4:'outlined'
          })}>
          Correct
          </Button>
          </Paper>

        <Paper className={classes.paper}>
        <TextField
            id="outlined-full-width"
            label="Choice 4"
            fullWidth
            className={classes.textField}
            value={choice4}
            onChange={e => this.setState({ choice4: e.target.value })}
            margin="normal"
          />

          <Button
          fullWidth
          variant={button4}
          color="primary"
          className={classes.submit}
          onClick={() => this.setState({
            choiceCorrect1:false,
            choiceCorrect2:false,
            choiceCorrect3:false,
            choiceCorrect4:true,
            button1:'outlined',
            button2:'outlined',
            button3:'outlined',
            button4:'contained'
          })}>
          Correct
          </Button>
          </Paper>

        <div style={{margin:10}}>
        <Mutation
            mutation={CREATE_QUESTION_MUTATION}
            variables={{
              testId: questionToRender.test.id,
              panelId: questionToRender.sentPanel.id,
              question: question,
              choice1: choice1,
              choice2: choice2,
              choice3: choice3,
              choice4: choice4,
              choiceCorrect1: choiceCorrect1,
              choiceCorrect2: choiceCorrect2,
              choiceCorrect3: choiceCorrect3,
              choiceCorrect4: choiceCorrect4,
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
        </div>
        </Paper>

        </Fade>

          )
          }}
          </Query>
          <div>

          <ErrorSnack handleClose={() => this.setState({isVisibleGraph:false})} classes={classes} open={isVisibleGraph} errorMsg={graphQLError} />

          <ErrorSnack handleClose={() => this.setState({isVisibleNet:false})} classes={classes} open={isVisibleNet} errorMsg={networkError.message} />

          </div>
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

    const { questionId } = this.props.location.state

    const { id, test } = data.createQuestion
    this.props.history.push({
      pathname: `/review_question`,
      state: { newQuestionId: id, oldQuestionId: questionId, testId: test.id }
      })
  }

  }

export default withStyles(styles)(CreateQuestion)
