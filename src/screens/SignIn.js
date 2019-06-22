import React,{Component} from 'react'
import * as Cookies from "js-cookie"
import '../css/App.css'
import { messaging } from '../firebase'

import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';

import { Mutation } from "react-apollo"
import {MOBILE_LOGIN_MUTATION} from '../ApolloQueries'


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
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
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
});

class SignIn extends Component {

    state = {
      email: '',
      password: '',
      pushToken:'',
      graphQLError: '',
      isVisibleGraph:false,
      networkError:false,
      isVisibleNet:false,
      isVisible:false,
      errorMsg:'',
      loginError:'',
      showPassword:false
    }

    handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

    componentDidMount(){

      messaging.getToken().then(currentToken => {
        if (currentToken) {
        this.setState({pushToken:currentToken})
      } else {

      }
      }).catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
      })

    }

    render() {
      const { email, password, pushToken, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state
      const { classes } = this.props
      console.log(pushToken)

      return (
      <div style={{height:'100vh',backgroundColor:'#e4f1fe'}}>
      <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form}>

      <TextField
          id="outlined-full-width"
          label="Email"
          fullWidth
          className={classes.textField}
          value={email}
          onChange={e => this.setState({ email: e.target.value })}
          margin="normal"

        />

          <TextField
          id="outlined-adornment-password"
          className={classNames(classes.margin, classes.textField)}
          fullWidth
          type={this.state.showPassword ? 'text' : 'password'}
          label="Password"
          value={password}
          onChange={e => this.setState({ password: e.target.value })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div style={{margin:10}}>
      <Mutation
          mutation={MOBILE_LOGIN_MUTATION}
          variables={{ email, password, pushToken }}
          onCompleted={data => this._confirm(data)}
          onError={error => this._error (error)}
        >

          {mutation => (
            <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={mutation}>Login</Button>
          )}
        </Mutation>
        </div>

        <div>

        </div>

        </form>
        </Paper>

        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isVisibleGraph}
        autoHideDuration={6000}
        >
        <SnackbarContent
        className={classes.error}
        message={
        <span id="client-snackbar" className={classes.message}>
          <ErrorIcon style={{margin:5}}/>
          {graphQLError}
        </span>}
        action={[
          <IconButton key="close" aria-label="Close" color="inherit" onClick={() => this.setState({isVisibleGraph:false})}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
      </Snackbar>
      <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={isVisibleNet}
      autoHideDuration={6000}
      onClose={() => this.setState({isVisibleNet:false})}
      className={classes.margin}
      message={
      <span id="client-snackbar" className={classes.message}>
        <ErrorIcon />
        {networkError}
      </span>}
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={() => this.setState({isVisibleNet:false})}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
    />


      </main>

      </div>

  )
}

_error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
    this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

    error.networkError &&
      this.setState({ isVisibleNet: true, networkError: error.networkError.message})

}

  _confirm = async data => {
    const { token } = data.mobileLogin
    const user = data.mobileLogin.user
    this._saveUserData(token, user)

    if (user.role === "TEACHER") {
      this.props.history.push(`/teacher_dashboard`)
    }

    if (user.role === "STUDENT") {
      this.props.history.push(`/student_dashboard`)
    }

    if (user.role === "ADMIN") {
      this.props.history.push(`/admin_dashboard`)
    }

    if (user.role === "QUANDRIA") {
      this.props.history.push(`/quandria_dashboard`)
    }

  }

  _saveUserData = (token, user) => {
    sessionStorage.setItem('auth_token', token)
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('userid', user.id)
    sessionStorage.setItem('online', user.online)

    Cookies.set('auth_token', token)
    Cookies.set('user', JSON.stringify(user))
    Cookies.set('userid', user.id)
    Cookies.set('online', user.online)

    if (user.role === "ADMIN") {
      sessionStorage.setItem('institutionId', user.adminInstitutions[0].id)
      Cookies.set('institutionId', user.adminInstitutions[0].id)
    }

  }

}

export default withStyles(styles)(SignIn)
