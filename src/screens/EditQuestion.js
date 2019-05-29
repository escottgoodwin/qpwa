import React,{Component} from 'react'
import '../css/App.css'

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardActionArea from '@material-ui/core/CardActionArea'

import EditQuestionInput from '../components/EditQuestionInput'

import { Query } from "react-apollo"
import {EDIT_QUESTION_QUERY} from '../ApolloQueries'

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

const Transition = props =>  <Slide direction="up" {...props} />

class EditQuestion extends Component {

  state = { open: false }

  handleClickOpen = () => {
  this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

    render() {

      const { classes } = this.props
      const { newQuestionId, oldQuestionId, testId } = this.props.location.state

      return (
      <div style={{height:'100%',backgroundColor:'#e4f1fe'}}>
      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:50}}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <QuestionAnswerIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Question
        </Typography>


        <Query query={EDIT_QUESTION_QUERY} variables={{ questionId: newQuestionId }} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <div>Loading...</div>
                if (error) return <div> {JSON.stringify(error)} </div>

                const { panel } = data.question

            return (

        <div>

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
              Edit Question
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{marginTop:60}}>

        <img style={{maxHeight:'100vw', maxWidth:'100vh', transform: 'translatex(calc(50vw - 50%)) translatey(calc(50vh - 50%)) rotate(90deg)' }} src={panel.link} alt="Logo" />

        </div>

        </Dialog>

      <EditQuestionInput classes={classes} oldQuestionId={oldQuestionId} testId={testId} {...data.question}/>

        </div>
          )
          }}
          </Query>

        </Paper>
        </div>
      </main>



      </div>

    )
  }
}

export default withStyles(styles)(EditQuestion)
