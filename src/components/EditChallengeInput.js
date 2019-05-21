import React,{Component} from 'react'
import '../css/App.css'
import { Message } from 'semantic-ui-react'
import {  DateTimeInput } from 'semantic-ui-calendar-react';
import { Mutation } from "react-apollo"
import {withRouter} from "react-router-dom"
import moment from 'moment'

import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';


import {EDIT_CHALLENGE_MUTATION} from '../ApolloQueries'

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
    //backgroundColor: theme.palette.primary.main,

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

class EditQuestionInput extends Component {

  state = {
        challenge:'',
        graphQLError:'',
        isVisibleGraph:false,
        networkError:'',
        isVisibleNet:false,
      }


componentDidMount(){
  const { challenge  } = this.props
  this.setState({ challenge })
}

render() {
  const { classes } = this.props
  const { challenge } = this.state

  const { id } = this.props

  return (
    <Paper className={classes.paper}>
    <TextField
        id="filled-multiline-flexible"
        label="Challenge"
        multiline
        rows="4"
        fullWidth
        className={classes.textField}
        value={challenge}
        onChange={e => this.setState({ challenge: e.target.value })}
        margin="normal"
      />

    <Mutation
        mutation={EDIT_CHALLENGE_MUTATION}
        variables={{
          challenge: challenge,
          challengeId: id
        }}
        onCompleted={data => this._confirm(data)}
        onError={error => this._error (error)}
      >
        {mutation => (

          <div style={{margin:10}}>
          <Button
          fullWidth
          variant="contained"
          color="primary"
          size='large'
          className={classes.submit}
          onClick={mutation}>Edit Challenge
          </Button>
          </div>

        )}
      </Mutation>
      </Paper>

)
}

_error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
    this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

    error.networkError &&
      this.setState({ isVisibleNet: true, networkError: error.networkError.message})

}
  _confirm = async data => {

    const { id } = data.updateChallenge

    this.props.history.push({
      pathname: `/challenge`,
      state: { challengeId: id }
      })
  }

}

export default withRouter(EditQuestionInput)
