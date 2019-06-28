import React,{Component} from 'react';
import '../css/App.css';

import moment from 'moment'
import Button from '@material-ui/core/Button';
import {withRouter} from "react-router-dom"

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import MomentUtils from '@date-io/moment';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { Mutation } from "react-apollo";

import {NEW_PUBLISH_TEST_MUTATION, PUBLISH_TEST_REFETCH_QUERY}  from '../ApolloQueries'

import TeacherTestHeader from '../components/TeacherTestHeader'
import ErrorSnack from '../components/ErrorSnack'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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

class PublishTestMulti extends Component {


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
          open: false,
          graphQLError:'',
          isVisibleGraph:false,
          networkError:'',
          isVisibleNet:false,
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
      const { classes, test_id, startTime, endTime, endDate, panelId } = this.props

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
              graphQLError, networkError, isVisibleNet, isVisibleGraph
             } = this.state

      return (
        <>

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

        <Mutation
            mutation={NEW_PUBLISH_TEST_MUTATION}
            variables={{
              startTime:startTime,
              endTime:endTime,
              endDate:endDate,
              testId: test_id,
              panelId: panelId,
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
            refetchQueries={() => {
               return [{
                  query: PUBLISH_TEST_REFETCH_QUERY,
                  variables: { test_id: test_id }
              }];
          }}
          >
          {mutation => (
            <Button
            fullWidth
            variant="contained"
            size='large'
            color="primary"
            className={classes.submit}
            onClick={mutation}>Publish Test</Button>
          )}
        </Mutation>

        <div>

        <ErrorSnack handleClose={() => this.setState({isVisibleGraph:false})} classes={classes} open={isVisibleGraph} errorMsg={graphQLError} />

        <ErrorSnack handleClose={() => this.setState({isVisibleNet:false})} classes={classes} open={isVisibleNet} errorMsg={networkError.message} />

        </div>
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
  const { id } = data.publishTest
  const { test_id } = this.props
  this.props.history.push({
    pathname: `/test_dashboard`,
    state: { test_id  }
    })

  }

}

export default withStyles(styles)(withRouter(PublishTestMulti))
