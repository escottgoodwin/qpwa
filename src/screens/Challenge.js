import React,{Component} from 'react'
import '../css/App.css'

import { database } from '../firebase'

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Fade from '@material-ui/core/Fade';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import ChallengeChat from '../components/ChallengeChat';
import ChallengeQuestionMulti from '../components/ChallengeQuestionMulti';
import ChallengeQuestionShort from '../components/ChallengeQuestionShort';


import { Query } from "react-apollo"
import { CHALLENGE_QUERY } from '../ApolloQueries'

const collection = database.collection('challenges')

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
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class Challenge extends Component {

    state = { open: false, open2: false, challenges:[] }

    handleClickOpen = () => {
    this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    handleClickOpen2 = () => {
    this.setState({ open2: true });
    };

    handleClose2 = () => {
      this.setState({ open2: false });
    };

    componentDidMount(){

      const { challengeId } = this.props.location.state

      const challenges = collection.child(challengeId)

      challenges.on('value', snapshot => {

      const challenges = snapshot.val() !== null ? Object.values(snapshot.val()) : []
        this.setState({ challenges })
      })

    }

    componentWillUnmount() {
      collection.off();
    }

    render() {

      const { classes, history } = this.props
      const { challengeId, role } = this.props.location.state
      const { challenges } = this.state
      const userId = sessionStorage.getItem('userid')

      const testPath = role==='TEACHER' ? '/teacher_test_dashboard' : '/student_test_dashboard'

      const selectedColor = green[700]
      const wrong = red[700]

      return (

      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:50}}>

      <Query query={CHALLENGE_QUERY} variables={{ challengeId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { challenge, addedBy } = data.challenge

                const { answer, question, shortAnswerText, answerCorrect } = data.challenge.answer
              
            return (

              <Fade in={!loading}>
              <Paper className={classes.paper}>

            <div style={{marginTop:20}}>
            <div style={{marginBottom:20}}>

            <div>
            <Typography component="h5" variant="h5">
              Challenge
            </Typography>
            <hr />
            <Typography component="h4" variant="h4">
              {challenge}
            </Typography>

            <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleClickOpen}>
            Chat Messages {challenges.length}
            </Button>

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
                Challenge: {challenge}
              </Typography>
            </Toolbar>
          </AppBar>

          <ChallengeChat classes={classes} challengeId={challengeId} challenges={challenges}/>
        </Dialog>

            </div>
            <hr />
            {answerCorrect ?
              <div >
              <center>

                <ThumbUpAltIcon fontSize='large' style={{color:green[400]}}/>

              </center>
              <Typography style={{color:green[400]}} component="h4" variant="h4">
                You got it right!
              </Typography>
              <div style={{margin:10}} >
              <Typography  component="h5" variant="h5">
              {shortAnswerText !== null ? shortAnswerText : answer.choice }
              </Typography>
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
              <div style={{margin:10}} >
              <Typography  component="h5" variant="h5">
              {shortAnswerText !== null ? shortAnswerText : answer.choice }
              </Typography>
              </div>
              </div>
            }
            </div>
            <hr />

            <div style={{marginBottom:20}}>
            <Card onClick={this.handleClickOpen2} className={styles.card}>
              <CardActionArea>
                  <CardMedia
                      src={question.panel.link}
                      component="img"
                  />
              </CardActionArea>
            </Card>
              </div>

            <Dialog
            fullScreen
            open={this.state.open2}
            onClose={this.handleClose2}
            TransitionComponent={Transition}
            >

            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleClose2} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.flex}>
                test course
                </Typography>
              </Toolbar>
            </AppBar>

            <img style={{maxHeight:'100vw', maxWidth:'100vh', transform: 'translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%)) rotate(90deg)' }} src={question.panel.link} alt="Logo" />

            </Dialog>

              <Typography component="h4" variant="h4">
                {question.question}
              </Typography>


              {
                question.questionType==='SHORT_ANSWER' ?

                <ChallengeQuestionShort {...data.challenge.answer}/>
                :
                <ChallengeQuestionMulti {...data.challenge.answer}/>
              }


          { userId === addedBy.id &&
            <div style={{margin:10}}>
            <Button
            fullWidth
            variant="contained"
            color="primary"
            size='large'
            className={classes.submit}
            onClick={() => this.props.history.push({
              pathname: `/edit_challenge`,
              state: { challengeId }
            })}>Edit Challenge
            </Button>
            </div>
          }

          {role==='TEACHER' &&
          <div style={{margin:10}}>
          <Button
          fullWidth
          variant="contained"
          color="primary"
          size='large'
          className={classes.submit}
          onClick={() => history.push({
            pathname: '/teacher_challenges',
            state: { testId: answer.answer.question.test.id }
          })}>
          Test Challenges
          </Button>
          </div>
        }



            <div style={{margin:10}}>
            <Button
            fullWidth
            variant="contained"
            color="primary"
            size='large'
            className={classes.submit}
            onClick={() => this.props.history.push({
              pathname: testPath,
              state: { test_id: question.test.id }
            })}>
            Test Dashboard
            </Button>
            </div>

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

_error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
    this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

    error.networkError &&
      this.setState({ isVisibleNet: true, networkError: error.networkError.message})

}

_confirm = (data) => {
  const { id } = data.addChallenge

  this.props.history.push({
    pathname: `/challenge`,
    state: { challengeId: id }
    })
  }

  }

export default withStyles(styles)(Challenge)
