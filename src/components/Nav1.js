import React from 'react';
import '../css/App.css';

import * as Cookies from "js-cookie"
import { withRouter } from 'react-router-dom'
import { withApollo } from 'react-apollo';
import { database } from '../firebase'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import green from '@material-ui/core/colors/green';

import SignInButton from './SignInButton'
import DashboardButton from './DashboardButton'

import { NEW_QUESTIONS } from '../ApolloQueries'

const collection = database.child('notifications')

class Nav1 extends React.Component {

  state = { open: false, notification:'', count:0 }

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  answerQuestion = (questionId) => {
    this.setState({ open: false });
    this.props.history.push({
     pathname: "/answer_question",
     state:
       { questionId }
     })
  }

  componentDidMount(){
    const userId = Cookies.get('userid')

    if (userId){

      this.props.client.query({
                  query: NEW_QUESTIONS,
                  variables: { userId }
                }).then(data => {
                  const { count } = data.data.questions
                  this.setState({count})

                }
                )



      const notifications = collection.child(userId)

      notifications.limitToLast(1).on('child_added', snapshot => {

      const timeAdded = new Date(snapshot.val().added)
      const now = new Date()
      const nowPlusTen = now.setSeconds(now.getSeconds() - 5);

      if (timeAdded >= nowPlusTen){

        const notification = snapshot.val()
        const newCount = this.state.count + 1
        this.setState({ notification, open:true, count: newCount })
      }

      });
    }

  }

  render() {
    const { classes } = this.props;
    const { open, notification, count } = this.state
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

            Quandrio {count}

        </Button>
        </Grid>

        <Grid item >
        <SignInButton />

        </Grid>
        </Grid>
        </Toolbar>
        <Drawer  anchor="bottom" open={open} onClose={() => this.setState({open:false})}>

            <div style={{backgroundColor:green[100],color:green[700],padding:5}}>
            <center>
            <div ><h5>New Question</h5> </div>
            <div style={{padding:5}}><h5>{notification.body} - {notification.title}</h5></div>
            <div style={{padding:5}}>
            <Grid container >

            <Grid item xs={6}>

            <Button onClick={()=> this.answerQuestion(notification.questionId)}
              variant="outlined" color="primary"  className={classes.button} >Answer</Button>
            </Grid>

            <Grid item xs={6}>

            <Button variant="outlined" color="secondary" className={classes.button} onClick={() => this.setState({open:false})}>Dismiss</Button>

            </Grid>

            </Grid>
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


export default withStyles(styles)(withApollo((withRouter(Nav1))))
