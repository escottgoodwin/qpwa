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
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
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
import teal from '@material-ui/core/colors/teal';

import { Mutation, Query } from "react-apollo"
import { QUESTION_QUERY, SEND_QUESTION_MUTATION } from '../ApolloQueries'

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

class ReviewQuestion extends Component {

  state = {
          value:'',
          answerChoiceId: '',
          chosenLabel:'',
          graphQLError: '',
          isVisibleGraph:false,
          networkError:'',
          isVisibleNet:false,
      }

      handleChange = event => {
          this.setState({ value: event.target.value });
        };


    render() {


      const {value, answerChoiceId, chosenLabel, graphQLError, networkError, isVisibleNet, isVisibleGraph} = this.state

      const { classes } = this.props
      const { newQuestionId, oldQuestionId, testId } = this.props.location.state

      const selectedColor = teal[200]



      return (

      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:50}}>



        <Query query={QUESTION_QUERY} variables={{ questionId: newQuestionId }} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { id, question, panel, choices, sentPanel } = data.question

                const button1 = choices[0].correct ? selectedColor : 'white'
                const button2 = choices[1].correct ? selectedColor : 'white'
                const button3 = choices[2].correct ? selectedColor : 'white'
                const button4 = choices[3].correct ? selectedColor : 'white'

            return (
            <Fade in={!loading}>
              <Paper className={classes.paper}>

                <Avatar className={classes.avatar}>
                  <QuestionAnswerIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                  Review Question
                </Typography>

        <div style={{marginTop:20}}>

        <div style={{marginBottom:20}}>
        <Card className={styles.card}>

              <CardMedia
                  src={panel.link}
                  component="img"
              />

          </Card>
          </div>

          <Typography component="h4" variant="h4">
            {question}
          </Typography>

          <div style={{marginTop:20}}>
          <Card style={{backgroundColor:button1,
            minWidth: 275,
            position: 'relative',
          }} >

            <CardContent>

              <Typography  component="h6" variant="h6">
                {choices[0].choice}
              </Typography>

              </CardContent>

          </Card>
          </div>

          <div style={{marginTop:20}}>
          <Card style={{backgroundColor:button2,
          minWidth: 275,
          position: 'relative',
          }}  >

          <CardContent>

            <Typography  component="h6" variant="h6">
              {choices[1].choice}
            </Typography>

            </CardContent>

          </Card>
          </div>

          <div style={{marginTop:20}}>
          <Card style={{backgroundColor:button3,
          minWidth: 275,
          position: 'relative',
          }} >

          <CardContent>

          <Typography  component="h6" variant="h6">
            {choices[2].choice}
          </Typography>

          </CardContent>

          </Card>
          </div>

          <div style={{marginTop:20}}>
          <Card style={{backgroundColor:button4,
          minWidth: 275,
          position: 'relative',
          }} >

          <CardContent>

          <Typography  component="h6" variant="h6">
          {choices[3].choice}
          </Typography>

          </CardContent>

          </Card>
          </div>

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

          {isVisibleGraph &&
            <Message negative>
              <p><b>{graphQLError}</b></p>
            </Message>
          }

          {isVisibleNet &&
            <Message negative>
              <p><b>{networkError}</b></p>
            </Message>
          }
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
