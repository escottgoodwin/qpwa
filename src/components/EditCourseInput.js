import React,{Component} from 'react'
import '../css/App.css'
import { Mutation } from "react-apollo"
import {withRouter} from "react-router-dom"
import moment from 'moment'

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea'
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import { EDIT_COURSE_MUTATION } from '../ApolloQueries'

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


class EditCourseInput extends Component {

  state = {
        department1: '',
        name:'',
        courseNumber:'',
        time:'',
        graphQLError: '',
        isVisibleGraph:false,
        networkError:'',
        isVisibleNet:false,
      }

  componentDidMount(){
    const { name, courseNumber, time, department1 } = this.props

    this.setState({
    name,
    courseNumber,
    time,
    department1,
    })
  }

render() {
  const { id, classes } = this.props
  const { name, courseNumber, time, department1, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state

  return (
    <>
    <Paper className={classes.paper}>
    <InputLabel  htmlFor="testNumber">Course Name</InputLabel>
    <TextField
        id="outlined-full-width"
        label="Name"
        fullWidth
        className={classes.textField}
        value={name}
        onChange={e => this.setState({ name: e.target.value })}
        margin="normal"
      />
      </Paper>

      <Paper className={classes.paper}>
      <InputLabel  htmlFor="testNumber">Course Number</InputLabel>
      <TextField
          id="outlined-full-width"
          label="Course Number"
          fullWidth
          className={classes.textField}
          value={courseNumber}
          onChange={e => this.setState({ courseNumber: e.target.value })}
          margin="normal"
        />
      </Paper>

      <Paper className={classes.paper}>
      <InputLabel  htmlFor="testNumber">Time</InputLabel>
      <TextField
          id="outlined-full-width"
          label="Time"
          fullWidth
          className={classes.textField}
          value={time}
          onChange={e => this.setState({ time: e.target.value })}
          margin="normal"
        />
      </Paper>

      <Paper className={classes.paper}>
      <InputLabel  htmlFor="testNumber">Department</InputLabel>
      <TextField
          id="outlined-full-width"
          label="Department"
          fullWidth
          className={classes.textField}
          value={department1}
          onChange={e => this.setState({ department1: e.target.value })}
          margin="normal"
        />
      </Paper>

      <Mutation
          mutation={EDIT_COURSE_MUTATION}
          variables={{
            name,
            courseNumber,
            time,
            department1,
            id
           }}
          onCompleted={data => this._confirm(data)}
          onError={error => this._error (error)}
          optimisticResponse={{
            __typename: "Mutation",
            updateCourse: {
              id,
              __typename: "Course",
              name,
              courseNumber,
              time,
              department1,
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
    pathname: `/course_dashboard`,
    state: { course_id: this.props.id  }
    })
}

}

export default withStyles(styles)(withRouter(EditCourseInput))
