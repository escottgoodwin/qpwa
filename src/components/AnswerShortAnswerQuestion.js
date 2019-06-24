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
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import CardActionArea from '@material-ui/core/CardActionArea'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import blueGrey from '@material-ui/core/colors/blueGrey';

import { Mutation } from "react-apollo"
import {ANSWER_SHORT_ANSWER_QUESTION_MUTATION} from '../ApolloQueries'

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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AnswerShortAnswerQuestion extends Component {

      state = {
            shortAnswerText:'',
            graphQLError:'',
            isVisibleGraph:false,
            networkError:'',
            isVisibleNet:false,
          }

          handleClickOpen = () => {
            this.setState({ open: true });
          };

          handleClose = () => {
            this.setState({ open: false });
          };


    render() {

      const { shortAnswerText,
              graphQLError,
              networkError,
              isVisibleNet,
              isVisibleGraph } = this.state

      const { classes, id, question, panel, test } = this.props
      const selectedColor = blueGrey[200]

      return (
        <>
        <Card onClick={this.handleClickOpen} className={styles.card}>
        <CardActionArea>

              <CardMedia
                  src={panel.link}
                  component="img"
              />
              </CardActionArea>
          </Card>

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
          {test.testNumber} - {test.subject}
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{marginTop:60}}>

        <img style={{maxHeight:'100vw', maxWidth:'100vh', transform: 'translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%)) rotate(90deg)' }} src={panel.link} alt="Logo" />

        </div>
        </Dialog>

        <div style={{marginTop:30,marginBottom:30}}>
        <h3>
          {question}
        </h3>
        </div>

        <Paper style={{marginTop:10,padding:10}}>
        <div ><h4>Answer</h4></div>
        <TextField
            id="outlined-full-width"
            label=""
            multiline
            rows="2"
            fullWidth
            value={shortAnswerText}
            onChange={e => this.setState({ shortAnswerText: e.target.value })}
            margin="normal"
            style={{padding:10}}
          />
          </Paper>

        <div style={{margin:10}}>
        <Mutation
            mutation={ANSWER_SHORT_ANSWER_QUESTION_MUTATION}
            variables={{
              questionId:id,
              shortAnswerText
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

    const { id } = data.addAnswer

    this.props.history.push({
      pathname: `/question_answered`,
      state: { answerId: id }
      })
    }

  }

export default withStyles(styles)(AnswerShortAnswerQuestion)
