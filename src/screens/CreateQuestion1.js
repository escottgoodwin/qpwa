import React,{Component} from 'react'
import '../css/App.css'

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea'
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { Query } from "react-apollo"
import {CREATE_QUESTION_QUERY} from '../ApolloQueries'

import ErrorSnack from '../components/ErrorSnack'
import CreateMultipleChoiceQuestion from '../components/CreateMultipleChoiceQuestion'
import CreateShortAnswerQuestion from '../components/CreateShortAnswerQuestion'

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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CreateQuestion extends Component {

  state = {
    open:false
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

    render() {

      const { classes, history } = this.props
      const { questionId } = this.props.location.state

      return (

      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:50}}>

        <Query query={CREATE_QUESTION_QUERY} variables={{ questionId }} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div> {JSON.stringify(error)} </div>

                const questionToRender = data.question

                const { sentPanel, test, questionType } = data.question

                const { subject, testNumber } = test

            return (
              <Fade in={!loading}>
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <QuestionAnswerIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Create Question
                </Typography>

        <div>

        <div style={{marginTop:10}}>
        <Card onClick={this.handleClickOpen} className={styles.card}>
        <CardActionArea>

              <CardMedia
                  src={sentPanel.link}
                  component="img"
              />
              </CardActionArea>
          </Card>
          </div>
          <Dialog
        fullScreen
        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
        >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
          {testNumber} - {subject}
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{marginTop:60}}>

        <img style={{maxHeight:'100vw', maxWidth:'100vh', transform: 'translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%)) rotate(90deg)' }} src={sentPanel.link} alt="Logo" />

        </div>
        </Dialog>

        {
          questionType==='SHORT_ANSWER' ?
          <CreateShortAnswerQuestion history={history} testId={test.id} questionId={questionId} panelId={sentPanel.id} classes={classes} />
          :
          <CreateMultipleChoiceQuestion history={history} testId={test.id} questionId={questionId} panelId={sentPanel.id} classes={classes} />
        }

        </div>
        </Paper>

        </Fade>

          )
          }}
          </Query>

        </div>
      </main>


    )
  }

}

export default withStyles(styles)(CreateQuestion)
