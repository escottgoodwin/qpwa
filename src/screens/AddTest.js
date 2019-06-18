import React,{Component} from 'react';
import '../css/App.css';

import moment from 'moment'

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import MomentUtils from '@date-io/moment';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { Mutation } from "react-apollo";

import { ADD_TEST_MUTATION } from '../ApolloQueries'

import TeacherCourseHeader from '../components/TeacherCourseHeader'

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

class AddTest extends Component {

    state = {
          testNumber:'',
          subject:'',
          testDate:new Date(),
          testType:'',
          graphQLError: '',
          isVisibleGraph:false,
          networkError:false,
          isVisibleNet:false,
        }

    render() {
      const { course_id } = this.props.location.state
      const { classes } = this.props
      const { testNumber, subject, testDate, testType, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state

      return (
        <main className={classes.main}>

        <div style={{marginBottom:50}}>

          <TeacherCourseHeader courseid={course_id} />

          <Paper style={{alignItems: 'center',padding:15}}>
            <center>
            <Avatar className={classes.avatar}>
              <ImportContactsIcon />
            </Avatar>
            </center>
          <h2>Add Test</h2>

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

        <Mutation
            mutation={ADD_TEST_MUTATION}
            variables={{
              subject,
              testDate,
              testNumber,
              published: false,
              release:false,
              courseId: course_id,
              testType
            }}
            onCompleted={data => this._confirm(data)}
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

          </Paper>
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
    const { id } = data.addTest
    this.props.history.push({
      pathname: `/test_dashboard`,
      state: { test_id: id  }
      })
    }
}

export default withStyles(styles)(AddTest)
