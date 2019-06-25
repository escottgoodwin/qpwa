import React,{Component} from 'react'
import '../css/App.css'

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardActionArea from '@material-ui/core/CardActionArea'
import blueGrey from '@material-ui/core/colors/blueGrey';

import { Mutation, Query } from "react-apollo"
import { QUESTION_QUERY, SEND_QUESTION_MUTATION } from '../ApolloQueries'

import ErrorSnack from '../components/ErrorSnack'
import ReviewQuestionMulti from '../components/ReviewQuestionMulti'
import ReviewQuestionShort from '../components/ReviewQuestionShort'


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
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,

  },
});

const Transition = props =>  <Slide direction="up" {...props} />

class ReviewQuestion extends Component {

  state = {
          graphQLError: '',
          isVisibleGraph:false,
          networkError:'',
          isVisibleNet:false,
      }

      handleChange = event => {
          this.setState({ value: event.target.value });
        };

      handleClickOpen = () => {
      this.setState({ open: true });
      };

      handleClose = () => {
        this.setState({ open: false });
      };

    render() {


      const { graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state

      const { classes } = this.props
      const { newQuestionId, oldQuestionId, testId } = this.props.location.state

      const selectedColor = blueGrey[200]

      return (

      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:50}}>



        <Query query={QUESTION_QUERY} variables={{ questionId: newQuestionId }} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { question, questionType, correctShortAnswer, panel, choices } = data.question

            return (
            <Fade in={!loading}>
              <Paper className={classes.paper}>

                <Avatar className={classes.avatar}>
                  <QuestionAnswerIcon />
                </Avatar>

                <h4>
                  Review Question
                </h4>

        <div style={{marginTop:20}}>

        <div style={{marginBottom:20}}>
        <Card onClick={this.handleClickOpen} className={styles.card}>
          <CardActionArea>
              <CardMedia
                  src={panel.link}
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
          Review Question
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{marginTop:60}}>

        <img style={{maxHeight:'100vw', maxWidth:'100vh', transform: 'translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%)) rotate(90deg)' }} src={panel.link} alt="Logo" />

        </div>

        </Dialog>

          <h3>
            {question}
          </h3>

        {
          questionType==="SHORT_ANSWER"?
          <ReviewQuestionShort {...data.question}/>
          :
          <ReviewQuestionMulti {...data.question} />
        }

        <div style={{margin:10}}>
        <Button
        fullWidth
        variant="contained"
        color="primary"
        size='large'
        className={classes.submit}
        onClick={() => this.props.history.push({
          pathname: `/edit_question`,
          state: { newQuestionId: newQuestionId, oldQuestionId: oldQuestionId, testId: testId }
        })}>Edit Question</Button>
        </div>

        <div style={{margin:10}}>
        <Mutation
            mutation={SEND_QUESTION_MUTATION}
            variables={{
              questionId: newQuestionId,
              testId: testId
            }}
            onCompleted={data => this._confirm(data)}
            onError={error => this._error (error)}
          >
            {mutation => (
              <Button
              fullWidth
              variant="contained"
              color="primary"
              size='large'
              className={classes.submit}
              onClick={mutation}>Send Question</Button>
            )}
        </Mutation>
        </div>

        </div>
        </Paper>
          </Fade>
          )
          }}
          </Query>

          <ErrorSnack handleClose={() => this.setState({isVisibleGraph:false})} classes={classes} open={isVisibleGraph} errorMsg={graphQLError} />

          <ErrorSnack handleClose={() => this.setState({isVisibleNet:false})} classes={classes} open={isVisibleNet} errorMsg={networkError.message} />

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
  _confirm = async data => {

    const { oldQuestionId } = this.props.location.state

    this.props.history.push({
      pathname: `/answer_question`,
      state: { questionId: oldQuestionId }
      })
    }

  }

export default withStyles(styles)(ReviewQuestion)
