import React, { Component } from 'react';
import '../css/App.css';
import { withRouter } from "react-router";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';

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

class ErrorSnack extends Component{

  state={
    open:false
  }

 componentDidMount(){
   const { open } = this.props
   this.setState({open})
 }

render() {

  const { classes, errorMsg } = this.props
  const { open } = this.state

  return (

    <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    onClose={this.props.handleClose}
    open={this.props.open}
    autoHideDuration={6000}
    >

    <SnackbarContent
    className={classes.error}
    message={
    <span id="client-snackbar" className={classes.message}>
      <ErrorIcon style={{margin:5}}/>
      {errorMsg}
    </span>}
    action={[
      <IconButton key="close" aria-label="Close" color="inherit" onClick={this.props.handleClose}>
        <CloseIcon className={classes.icon} />
      </IconButton>,
    ]}
    />

    </Snackbar>

    )
  }
}

export default withStyles(styles)(ErrorSnack)
