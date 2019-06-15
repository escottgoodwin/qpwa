import React from 'react';
import '../css/App.css';
import * as Cookies from "js-cookie"
import { withRouter } from 'react-router-dom'
import { database } from '../firebase'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

import SignInButton from './SignInButton'
import DashboardButton from './DashboardButton'

const collection = database.child('notifications')

class Nav1 extends React.Component {

  state = { open: false, notification:'' }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleAnswer = (questionId) => {
    this.setState({ open: false });
    this.props.history.push({
      pathname: `/create_question`,
      state: { questionId  }
      })
  };


  componentDidMount(){
    const userId = Cookies.get('userid')
    const notifications = collection.child(userId)

    notifications.on('child_added', snapshot => {
      console.log('snapshot',snapshot.val())

    if (snapshot.val() !== null){
      const notification = snapshot.val()

      this.setState({ notification, open:true })
    }

    });


  }

  render() {
    const { classes, history } = this.props;
    const { open, notification } = this.state
    return (

<div className={classes.root}>
      <AppBar style={{backgroundColor:'#21385b',color:'#2185d0'}} position="fixed" >
        <Toolbar>
        <Grid container justify="space-between">

        <Grid item >
        <DashboardButton />
        </Grid>

        <Grid item >
        <Button onClick={() => this.setState({open:true})} variant="outlined" color="inherit">

            Quandrio

        </Button>
        </Grid>

        <Grid item >
        <SignInButton />

        </Grid>
        </Grid>
        </Toolbar>
        <Drawer  anchor="top" open={open} onClose={() => this.setState({open:false})}>

            <div style={{backgroundColor:'green',padding:5}}>
            <center>
            <div><h5>New Question</h5> </div>
            <div><h5>{notification.body} - {notification.title}</h5></div>
            <div>
            <Button onClick={() => this.handleAnswer(notification.questionId)} variant="outlined" color="primary"  className={classes.button} >Answer</Button>

            <Button variant="outlined" color="secondary" className={classes.button} onClick={() => this.setState({open:false})}>Dismiss</Button>
            </div>
            </center>
            </div>

          </Drawer>
      </AppBar>
    </div>

  )
}
}

  const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

export default withStyles(styles)(withRouter(Nav1))
