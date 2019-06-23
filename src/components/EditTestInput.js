import React,{Component} from 'react'
import '../css/App.css'
import { Mutation } from "react-apollo"
import {withRouter} from "react-router-dom"
import moment from 'moment'

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import MomentUtils from '@date-io/moment';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


import { TEST_COURSE_MUTATION } from '../ApolloQueries'

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


class EditTestInput extends Component {

      state = {
            subject: '',
            testDate:'',
            testNumber:'',
            testType:'',
            startTime:'',
            endTime:'',
            endDate:'',
            graphQLError: '',
            isVisibleGraph:false,
            networkError:'',
            isVisibleNet:false,
  }

  handleChange = (event, {name, value}) => {
  if (this.state.hasOwnProperty(name)) {
    this.setState({ [name]: value });
  }
}

  componentDidMount(){
    const { subject, testDate, testType, testNumber, startTime, endTime, endDate } = this.props

    this.setState({subject,
    testDate,
    testNumber,
    testType,
    startTime,
    endTime,
    endDate
    })
  }

render() {
  const { id, classes } = this.props
  const { testNumber, subject, testDate, testType, startTime, endTime, endDate, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state
  console.log(this.state)
  return (
    <>
    <Paper style={{alignItems: 'center',padding:15,marginBottom:15}}>
    <center>
    <Avatar className={classes.avatar}>
      <ImportContactsIcon />
    </Avatar>
    </center>
  <h2>Edit Test</h2>

    <Paper className={classes.paper}>
    <TextField
        id="outlined-full-width"
        label="Subject"
        fullWidth
        className={classes.textField}
        value={subject}
        onChange={e => this.setState({ subject: e.target.value })}
        margin="normal"
      />
      </Paper>

      <Paper className={classes.paper}>
      <InputLabel  htmlFor="testNumber">Test Number</InputLabel>
      <Select
        fullWidth
        value={testNumber}
        onChange={e => this.setState({ testNumber: e.target.value })}
        inputProps={{
          name: 'testNumber',
          id: 'testNumber',
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={"Test 1"}>Test 1</MenuItem>
        <MenuItem value={"Test 2"}>Test 2</MenuItem>
        <MenuItem value={"Test 3"}>Test 3</MenuItem>
        <MenuItem value={"Test 4"}>Test 4</MenuItem>
        <MenuItem value={"Test 5"}>Test 5</MenuItem>
        <MenuItem value={"Test 6"}>Test 6</MenuItem>
      </Select>
      </Paper>

      <Paper className={classes.paper}>
      <InputLabel  htmlFor="testType">Test Type</InputLabel>
      <Select
        fullWidth
        value={testType}
        onChange={e => this.setState({ testType: e.target.value })}
        inputProps={{
          name: 'testType',
          id: 'testType',
        }}
      >
        <MenuItem value="">
          <em>Test Type</em>
        </MenuItem>
        <MenuItem value={"CLASS"}>Lecture</MenuItem>
        <MenuItem value={"LAB"}>Lab</MenuItem>

      </Select>
      </Paper>

  <Paper className={classes.paper}>
  <InputLabel  htmlFor="testType">Test Date</InputLabel>
  {moment(testDate).format('MMMM Do YYYY, h:mm a')}
  <MuiPickersUtilsProvider utils={MomentUtils}>

  <KeyboardDatePicker
  fullWidth
    margin="normal"
    id="mui-pickers-date"
    label="Date picker"
    value={testDate}
    onChange={(date) => this.setState({testDate:date})}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  />

  <KeyboardTimePicker
  fullWidth
    margin="normal"
    id="mui-pickers-time"
    label="Time picker"
    value={testDate}
    onChange={(date) => this.setState({testDate:date})}
    KeyboardButtonProps={{
      'aria-label': 'change time',
    }}
  />


  </MuiPickersUtilsProvider>
  </Paper>
  </Paper>

  <Paper style={{alignItems: 'center',padding:15}}>

    <Typography component="h1" variant="h5">
      Edit Publish Test
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

  <Mutation
      mutation={TEST_COURSE_MUTATION}
      variables={{
        subject,
        testNumber,
        testDate,
        testType,
        startTime,
        endTime,
        endDate,
        id
       }}
      onCompleted={data => this._confirm(data)}
      onError={error => this._error (error)}
      optimisticResponse={{
        __typename: "Mutation",
        updateTest: {
          id: id,
          __typename: "Test",
          subject,
          testNumber,
          testDate,
          testType,
          startTime,
          endTime,
          endDate
        }
      }}
    >
      {mutation => (

        <Button
        fullWidth
        variant="contained"
        size='large'
        color="primary"
        className={classes.submit}
        onClick={mutation}>
        Submit
        </Button>

      )}
    </Mutation>

    {isVisibleGraph &&
      <div>
        <p><b>{graphQLError}</b></p>
      </div>
    }

    {isVisibleNet &&
      <div>
        <p><b>{networkError}</b></p>
      </div>
    }
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
  this.props.history.push({
    pathname: `/teacher_test_dashboard`,
    state: { test_id: this.props.id  }
    })
}

}

export default withStyles(styles)(withRouter(EditTestInput))
