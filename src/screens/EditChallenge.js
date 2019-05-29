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
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import EditChallengeInput from '../components/EditChallengeInput';

import {Query } from "react-apollo"

import { CHALLENGE_QUERY } from '../ApolloQueries'

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

class EditChallenge extends Component {

  state = {
        challenge:'',
        open:false,
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

      const { classes } = this.props
      const { challengeId } = this.props.location.state
      const selectedColor = green[200]
      const wrong = red[200]

      return (
      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:50}}>

      <Query query={CHALLENGE_QUERY} variables={{ challengeId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { answer } = data.challenge

                const question  = answer.answer.question

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

            <EditChallengeInput classes={classes} {...data.challenge}/>

            <div style={{margin:10}}>
            <Button
            fullWidth
            variant="contained"
            color="primary"
            size='large'
            className={classes.submit}
            onClick={() => this.props.history.push({
              pathname: `/challenge`,
              state: { challengeId: challengeId }
            })}>Cancel</Button>
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

export default withStyles(styles)(EditChallenge)
