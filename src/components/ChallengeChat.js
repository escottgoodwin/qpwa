import React, { Component } from "react";
import { database } from '../firebase'
import * as Cookies from "js-cookie"

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import SendIcon from '@material-ui/icons/Send';

import ChatItem from '../components/ChatItem';

const challenges = database.child('challenges')

const styles = theme => ({
  chat: {
    margin: theme.spacing.unit, // You might not need this now
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 3
  },
});

class ChallengeChat extends Component {

    state = {
      message:'',
    }

    handleKeyDown = ( e, firstName, lastName, id, message ) => {
      const { challengeId } = this.props
      const newChallenge = {
        firstName,
        lastName,
        message,
        timeAdded:new Date(),
        userId: id,
        challengeId
      }

      if (e.key === "Enter") {
        challenges.child(challengeId).push(newChallenge);
        this.setState({message:''});
      }
    };

    newMessage = ( firstName, lastName, id, message ) => {
      const { challengeId } = this.props

      const newChallenge = {
        firstName,
        lastName,
        message,
        timeAdded:new Date(),
        userId: id,
        challengeId
      }

      challenges.child(challengeId).push(newChallenge);
      this.setState({message:''});

    };

    render() {
      const { message } = this.state
      const user = Cookies.get('user')
      const { challenges } = this.props
      const { firstName, lastName, id } = JSON.parse(user)
      const { classes } = this.props

      return (
        <div >
              <div style={{margin:5}}>

                  <Paper style={{ overflow: 'auto'}} >
                  <List  className={classes.root}>

                  {challenges.map(challenge => <ChatItem classes={classes} userId1={id} {...challenge} />)}

                  </List>
                  </Paper>

              </div>

              <div className={styles.chat}>
                <Grid container alignItems="center" spacing={4}>
                <Grid item xs={10} >

                <TextField
                    id="outlined-full-width"
                    label="Message"
                    fullWidth
                    className={classes.textField}
                    value={message}
                    onChange={e => this.setState({ message: e.target.value })}
                    margin="normal"
                    onKeyDown={(e) => this.handleKeyDown(e, firstName, lastName, id, message)}
                  />

                </Grid>

                <Grid item xs={2} >

                <Button onClick={() => this.newMessage(firstName, lastName, id, message)} variant="contained" color="primary" className={classes.button}>
                  <SendIcon />
                </Button>

                </Grid>
                </Grid>
                </div>


        </div>
      );


    }

}

export default withStyles(styles)(ChallengeChat)
