import React,{ useState } from 'react';
import '../css/App.css';
import { useMutation } from 'react-apollo-hooks';

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

import { ADD_TEST_MUTATION } from '../ApolloQueries'

import ErrorSnack from '../components/ErrorSnack'
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

const AddTest = props  => {

  const now = new Date()

  const [testNumber, setTestNumber] = useState();
  const [subject, setSubject] = useState();
  const [testDate, setTestDate] = useState(now);
  const [testType, setTestType] = useState();
  const [graphQLError, setGraphQLError] = useState();
  const [networkError, setNetworkError] = useState();
  const [errorOpen, setErrorOpen] = useState(false);

  const { classes, location, history } = props
  const { course_id } = location.state

  const addTestMutation = useMutation(ADD_TEST_MUTATION, {
    variables: { subject,
    testDate,
    testNumber,
    published: false,
    release:false,
    courseId: course_id,
    testType },
  });

  async function addTest(props) {
    let result;
    try {
      result = await addTestMutation()

      _confirm(result.data)
    } catch (error) {
      _error(error)
    }
  }

 const closeSnack = () => setErrorOpen(false)

  function _error(error){

      const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
      setGraphQLError(gerrorMessage)
      setErrorOpen(true)

      error.networkError &&
        setNetworkError(error.networkError.message)
        setErrorOpen(true)
  }

  function _confirm(data) {
    const { id } = data.addTest

    history.push({
      pathname: `/test_dashboard`,
      state: { test_id: id  }
      })
    }

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
              onChange={e => setSubject(e.target.value)}
              margin="normal"
            />
            </Paper>

            <Paper className={classes.paper}>
            <InputLabel  htmlFor="testNumber">Test Number</InputLabel>
            <Select
              fullWidth
              value={testNumber}
              onChange={e => setTestNumber(e.target.value)}
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
              onChange={e => setTestType(e.target.value)}
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
          onChange={(date) => setTestDate(date)}
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
          onChange={(date) => setTestDate(date)}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />


        </MuiPickersUtilsProvider>

        </Paper>
              <Button
              fullWidth
              variant="contained"
              size='large'
              color="primary"
              className={classes.submit}
              onClick={addTest}>
              Submit
              </Button>

          </Paper>

          <ErrorSnack handleClose={closeSnack} classes={classes} open={errorOpen} errorMsg={graphQLError} />

          <ErrorSnack handleClose={closeSnack} classes={classes} open={errorOpen} errorMsg={networkError} />

      </div>
      </main>

  )
}

export default withStyles(styles)(AddTest)
