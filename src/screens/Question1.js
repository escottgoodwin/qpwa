import React,{Component} from 'react'
import '../css/App.css'

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Fade from '@material-ui/core/Fade';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import { Query } from "react-apollo"
import { QUESTION_QUERY } from '../ApolloQueries'

import QuestionShort from '../components/QuestionShort'
import QuestionMulti from '../components/QuestionMulti'

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


class Question extends Component {

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

    render() {

      const { classes } = this.props
      const { questionId } = this.props.location.state

      const selectedColor = green[700]
      const wrong = red[700]

      return (

      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:50}}>

      <Query query={QUESTION_QUERY} variables={{ questionId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { question, questionType, correctShortAnswer, panel, choices, test } = data.question

                console.log(data.question)
            return (

              <Fade in={!loading}>
              <Paper className={classes.paper}>

            <div style={{marginTop:20}}>
            <div style={{marginBottom:20}}>
            <center>
            <Avatar className={classes.avatar}>
              <QuestionAnswerIcon />
            </Avatar>
            </center>

            <h4>{question}</h4>
            </div>
            <hr />

            <div style={{marginBottom:20}}>
            <Card onClick={this.handleClickOpen2} className={styles.card}>
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

            <img style={{maxHeight:'100vw', maxWidth:'100vh', transform: 'translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%)) rotate(90deg)' }} src={panel.link} alt="Logo" />

            </Dialog>

              <Typography component="h4" variant="h4">
                {question.question}
              </Typography>

              {
                questionType==='SHORT_ANSWER' ?
                  <QuestionShort {...data.question} />
                  :
                  <QuestionMulti {...data.question} />
              }

            <div style={{margin:10}}>
            <Button
            fullWidth
            variant="contained"
            color="primary"
            size='large'
            className={classes.submit}
            onClick={() => this.props.history.push({
              pathname: '/student_test_dashboard',
              state: { test_id: test.id }
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

  }

export default withStyles(styles)(Question)
