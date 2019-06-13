import React,{Component} from 'react';
import '../css/App.css';

import {  DateTimeInput } from 'semantic-ui-calendar-react';
import moment from 'moment'

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
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import MomentUtils from '@date-io/moment';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { Mutation, Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'


import {NEW_PUBLISH_TEST_MUTATION, TEST_QUERY, PUBLISH_TEST_REFETCH_QUERY}  from '../ApolloQueries'

import TeacherTestHeader from '../components/TeacherTestHeader'

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

class PublishTest extends Component {


    state = {
          startTime:'',
          endTime:'',
          endDate:new Date(),
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
      const { classes } = this.props
      const { test_id } = this.props.location.state
      const { startTime, endTime, endDate, question,
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

      return (
        <main className={classes.main}>

        <div style={{marginBottom:50}}>

        <Query query={TEST_QUERY} variables={{ test_id: test_id }}>
              {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <Error/>

                const test = data.test
                const firstPanel = test.panels[0]
                return (
      <Fade in={!loading}>
      <>
      <TeacherTestHeader classes={classes} test_id={test_id} />

      <Paper style={{alignItems: 'center',padding:15}}>
        <center>
        <Avatar className={classes.avatar}>
          <QuestionAnswerIcon />
        </Avatar>
        </center>
        <Typography component="h1" variant="h5">
          Publish Test
        </Typography>

          <Paper className={classes.paper}>
          <InputLabel  htmlFor="startHour">Start Time</InputLabel>
          <Select
            fullWidth
            value={startTime}
            onChange={e => this.setState({ startTime: e.target.value })}
            inputProps={{
              name: 'startTime',
              id: 'startTime',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"6 AM"}>6 AM</MenuItem>
            <MenuItem value={"7 AM"}>7 AM</MenuItem>
            <MenuItem value={"8 AM"}>8 AM</MenuItem>
            <MenuItem value={"9 AM"}>9 AM</MenuItem>
            <MenuItem value={"10 AM"}>10 AM</MenuItem>
            <MenuItem value={"11 AM"}>11 AM</MenuItem>
            <MenuItem value={"12 PM"}>12 PM</MenuItem>
            <MenuItem value={"1 PM"}>1 PM</MenuItem>
            <MenuItem value={"2 PM"}>2 PM</MenuItem>
            <MenuItem value={"3 PM"}>3 PM</MenuItem>
            <MenuItem value={"4 PM"}>4 PM</MenuItem>
            <MenuItem value={"5 PM"}>5 PM</MenuItem>
            <MenuItem value={"6 PM"}>6 PM</MenuItem>
            <MenuItem value={"7 PM"}>7 PM</MenuItem>
            <MenuItem value={"8 PM"}>8 PM</MenuItem>
            <MenuItem value={"9 PM"}>9 PM</MenuItem>
            <MenuItem value={"10 PM"}>10 PM</MenuItem>
            <MenuItem value={"11 PM"}>11 PM</MenuItem>
          </Select>
          </Paper>

          <Paper className={classes.paper}>
          <InputLabel  htmlFor="startHour">End Time</InputLabel>
          <Select
            fullWidth
            value={endTime}
            onChange={e => this.setState({ endTime: e.target.value })}
            inputProps={{
              name: 'endTime',
              id: 'endTime',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"6 AM"}>6 AM</MenuItem>
            <MenuItem value={"7 AM"}>7 AM</MenuItem>
            <MenuItem value={"8 AM"}>8 AM</MenuItem>
            <MenuItem value={"9 AM"}>9 AM</MenuItem>
            <MenuItem value={"10 AM"}>10 AM</MenuItem>
            <MenuItem value={"11 AM"}>11 AM</MenuItem>
            <MenuItem value={"12 PM"}>12 PM</MenuItem>
            <MenuItem value={"1 PM"}>1 PM</MenuItem>
            <MenuItem value={"2 PM"}>2 PM</MenuItem>
            <MenuItem value={"3 PM"}>3 PM</MenuItem>
            <MenuItem value={"4 PM"}>4 PM</MenuItem>
            <MenuItem value={"5 PM"}>5 PM</MenuItem>
            <MenuItem value={"6 PM"}>6 PM</MenuItem>
            <MenuItem value={"7 PM"}>7 PM</MenuItem>
            <MenuItem value={"8 PM"}>8 PM</MenuItem>
            <MenuItem value={"9 PM"}>9 PM</MenuItem>
            <MenuItem value={"10 PM"}>10 PM</MenuItem>
            <MenuItem value={"11 PM"}>11 PM</MenuItem>
          </Select>
          </Paper>


          <Paper className={classes.paper}>
          <InputLabel  htmlFor="endDate">End Date</InputLabel>
          {moment(endDate).format('MMMM Do YYYY, h:mm a')}
          <MuiPickersUtilsProvider utils={MomentUtils}>

          <KeyboardDatePicker
          fullWidth
            margin="normal"
            id="mui-pickers-date"
            label="Date picker"
            value={endDate}
            onChange={(date) => this.setState({endDate:date})}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />

          <KeyboardTimePicker
          fullWidth
            margin="normal"
            id="mui-pickers-time"
            label="Time picker"
            value={endDate}
            onChange={(date) => this.setState({endDate:date})}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />

          </MuiPickersUtilsProvider>
          </Paper>

      </Paper>


      <Paper style={{marginTop:20,alignItems: 'center',padding:15}}>
      <center>
      <Avatar className={classes.avatar}>
        <QuestionAnswerIcon />
      </Avatar>
      </center>
      <Typography component="h1" variant="h5">
        Create First Question
      </Typography>

      <div style={{marginTop:10}}>
      <Card onClick={this.handleClickOpen} className={styles.card}>
      <CardActionArea>

            <CardMedia
                src={firstPanel.link}
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
        First Question
          </Typography>
        </Toolbar>
      </AppBar>

      <div style={{marginTop:60}}>

      <img style={{maxHeight:'100vw', maxWidth:'100vh', transform: 'translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%)) rotate(90deg)' }} src={firstPanel.link} alt="Logo" />

      </div>
      </Dialog>



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

        </Paper>

        <Mutation
            mutation={NEW_PUBLISH_TEST_MUTATION}
            variables={{
              startTime:startTime,
              endTime:endTime,
              endDate:endDate,
              testId: test_id,
              panelId: firstPanel.id,
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

      </>
      </Fade>
    )
  }}
</Query>
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
  const { id } = data.publishTest
  this.props.history.push({
    pathname: `/test_dashboard`,
    state: { test_id: id  }
    })
  }

}

export default withStyles(styles)(PublishTest)
