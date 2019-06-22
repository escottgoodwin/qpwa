import React,{Component} from 'react'
import '../css/App.css'

import { Message } from 'semantic-ui-react'

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';

import StudentChallengeList from '../components/StudentChallengeList';

import { Mutation, Query } from "react-apollo"
import { ANSWERED_QUESTION_QUERY, CREATE_CHALLENGE_MUTATION } from '../ApolloQueries'

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

class ChallengeQuestion extends Component {

  state = {
        open: false,
        challenge:'',
        graphQLError:'',
        isVisibleGraph:false,
        networkError:'',
        isVisibleNet:false,
      }

      handleClickOpen = () => {
      this.setState({ open: true });
      };

      handleClose = () => {
        this.setState({ open: false });
      };

    render() {

      const selectedColor = green[700]
      const wrong = red[700]

      const { classes } = this.props
      const { answerId, questionId } = this.props.location.state

      const { challenge, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state

      return (

      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:50}}>

      <Query query={ANSWERED_QUESTION_QUERY} variables={{ answerId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { answer, question } = data.answer

                const { choices } = question

                const button1 = choices[0].correct ? selectedColor : wrong
                const button2 = choices[1].correct ? selectedColor : wrong
                const button3 = choices[2].correct ? selectedColor : wrong
                const button4 = choices[3].correct ? selectedColor : wrong

            return (

              <Fade in={!loading}>

              <Paper className={classes.paper}>
              <div style={{marginTop:20}}>
              <div style={{marginBottom:20}}>
              {answer.correct ?
              <div >
              <center>

                <ThumbUpAltIcon fontSize='large' style={{color:green[400]}}/>

              </center>
              <Typography style={{color:green[400]}} component="h4" variant="h4">
                You got it right!
              </Typography>
              <div style={{margin:10}} >
              <Typography  component="h5" variant="h5">
                {answer.choice}
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
                {answer.choice}
              </Typography>
              </div>
              </div>
            }
            </div>
            <hr />

            <div style={{marginBottom:20}}>
            <Card onClick={this.handleClickOpen} className={styles.card}>
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
                test course
                </Typography>
              </Toolbar>
            </AppBar>

            <img style={{maxHeight:'100vw', maxWidth:'100vh', transform: 'translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%)) rotate(90deg)' }} src={question.panel.link} alt="Logo" />

            </Dialog>

              <Typography component="h4" variant="h4">
                {question.question}
              </Typography>

              <div style={{marginTop:20}}>
              <Card style={{backgroundColor:button1,
                minWidth: 275,
                position: 'relative',
              }} >

                <CardContent>

                  <h5>
                    {choices[0].choice}
                  </h5>

                  </CardContent>

              </Card>
              </div>

              <div style={{marginTop:20}}>
              <Card style={{backgroundColor:button2,
              minWidth: 275,
              position: 'relative',
              }}  >

              <CardContent>

                <h5>
                  {choices[1].choice}
                </h5>

                </CardContent>

              </Card>
              </div>

              <div style={{marginTop:20}}>
              <Card style={{backgroundColor:button3,
              minWidth: 275,
              position: 'relative',
              }} >

              <CardContent>

              <h5>
                {choices[2].choice}
              </h5>

              </CardContent>

              </Card>
              </div>

              <div style={{marginTop:20}}>
              <Card style={{backgroundColor:button4,
              minWidth: 275,
              position: 'relative',
              }} >

              <CardContent>

              <h5>
              {choices[3].choice}
              </h5>

              </CardContent>

              </Card>
              </div>

            <div style={{marginTop:20}}>
            <StudentChallengeList  questionId={questionId} />
            </div>

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
                mutation={CREATE_CHALLENGE_MUTATION}
                variables={{
                  challenge: challenge,
                  answerId: answerId
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
                  onClick={mutation}>Submit Challenge
                  </Button>
                  </div>

                )}
              </Mutation>
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
                <h5>{graphQLError}</h5>
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
              <h5>{networkError}</h5>
            </span>}
            action={[
              <IconButton key="close" aria-label="Close" color="inherit" onClick={() => this.setState({isVisibleNet:false})}>
                <CloseIcon className={classes.icon} />
              </IconButton>,
            ]}
          />

            <div style={{margin:10}}>
            <Button
            fullWidth
            variant="contained"
            color="primary"
            size='large'
            className={classes.submit}
            onClick={() => this.props.history.push({
              pathname: `/student_test_dashboard`,
              state: { test_id: question.test.id }
            })}>Test Dashboard</Button>
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

export default withStyles(styles)(ChallengeQuestion)
