import React,{Component} from 'react'
import * as Cookies from "js-cookie"
import '../css/App.css'
//import { Button, Form, FormGroup, Label, Input,} from 'reactstrap'
import { Message } from 'semantic-ui-react'

import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Fade from '@material-ui/core/Fade';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
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

class ChallengeQuestion extends Component {

  state = {
        challenge:'',
        graphQLError:'',
        isVisibleGraph:false,
        networkError:'',
        isVisibleNet:false,
      }

    render() {

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

                const { id, answer, question } = data.answer

                const currValue = question.choices.filter(choice => choice.correct)[0].id

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
            <Card className={styles.card}>

                  <CardMedia
                      src={question.panel.link}
                      component="img"
                  />

              </Card>
              </div>

              <Typography component="h4" variant="h4">
                {question.question}
              </Typography>

            <FormControl component="fieldset" className={classes.formControl}>

              <RadioGroup
                aria-label="Choices"
                name="choices"
                className={classes.group}
                value={currValue}
                onChange={this.handleChange}
              >

              {question.choices.map(choice => <FormControlLabel value={choice.id} control={<Radio color='primary' />} label={choice.choice} />)}

            </RadioGroup>
            </FormControl>

            <StudentChallengeList  questionId={questionId} />

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
