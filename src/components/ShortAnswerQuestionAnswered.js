import React,{Component} from 'react'
import '../css/App.css'

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import CardActionArea from '@material-ui/core/CardActionArea'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import { Query } from "react-apollo"
import { ANSWERED_QUESTION_QUERY } from '../ApolloQueries'

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

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ShortAnswerQuestionAnswered extends Component {

  state = { open:false }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


    render() {

      const { classes, answer, question, answerCorrect, shortAnswerText } = this.props
      console.log(this.props)
      const { choices } = question

      const selectedColor = green[700]
      const wrong = red[700]

      return (
        <>

        <Card onClick={this.handleClickOpen} className={styles.card}>
        <CardActionArea>

              <CardMedia
                  src={question.panel.link}
                  component="img"
              />
              </CardActionArea>
          </Card>

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
              {question.test.testNumber} - {question.test.subject}
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{marginTop:60}}>

        <img style={{maxHeight:'100vw', maxWidth:'100vh', transform: 'translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%)) rotate(90deg)' }} src={question.panel.link} alt="Logo" />

        </div>
        </Dialog>

        <div style={{marginBottom:20, marginTop:20}}>

        {answerCorrect ?
        <div >

        <center>

          <ThumbUpAltIcon fontSize='large' style={{color:green[400]}}/>

        </center>

        <Typography style={{color:green[400]}} component="h4" variant="h4">
          You got it right!
        </Typography>

        <div style={{marginTop:20}}>
        <Card style={{backgroundColor:green[700],
        minWidth: 275,
        position: 'relative',
        }} >

        <CardContent>

        <h3>
        {shortAnswerText}
        </h3>

        </CardContent>

        </Card>
        </div>

        </div>
        :
        <div >
        <center>

          <ThumbDownAltIcon fontSize='large' style={{color:red[400]}}/>

        </center>

        <Typography style={{color:red[400]}} component="h4" variant="h4">
          You got it wrong!
        </Typography>

        <div style={{marginTop:20}}>
        <Card style={{backgroundColor:red[700],
        minWidth: 275,
        position: 'relative',
        }} >

        <CardContent>

        <h3>
        {shortAnswerText}
        </h3>

        </CardContent>

        </Card>
        </div>

        </div>
      }

      </div>

      <hr />

      <h3>
        {question.question}
      </h3>

      <div style={{marginTop:20}}>
      <Card style={{backgroundColor:green[700],
      minWidth: 275,
      position: 'relative',
      }} >

      <CardContent>

      <h3>
      {question.correctShortAnswer}
      </h3>

      </CardContent>

      </Card>
      </div>

      </>
  )
}
}

export default withStyles(styles)(ShortAnswerQuestionAnswered)
