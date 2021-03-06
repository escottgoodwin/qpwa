import React,{Component} from 'react'
import * as Cookies from "js-cookie"
import '../css/App.css'

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

import { Mutation, Query } from "react-apollo"
import {ANSWER_QUESTION_QUERY, ANSWER_QUESTION_MUTATION} from '../ApolloQueries'

import ErrorSnack from '../components/ErrorSnack'

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

class AnswerQuestion extends Component {

  state = {
          answerChoiceId: '',
          chosenLabel:'',
          value:'clinical tests',
          graphQLError: '',
          isVisibleGraph:false,
          networkError:'',
          isVisibleNet:false,
      }

      _onSelect = ( item ) => {
        this.setState({
          answerChoiceId:item.value,
          chosenLabel:item.label,
        })
      }

      handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };


    render() {

      const {answerChoiceId, chosenLabel, graphQLError, networkError, isVisibleNet, isVisibleGraph} = this.state

      const { classes } = this.props
      const { questionId } = this.props.location.state

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
          Answer Question
        </Typography>


        <Query query={ANSWER_QUESTION_QUERY} variables={{ questionId: questionId }} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <div>Loading... </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { id, question, panel, choices } = data.question

            return (

        <div>

        <div style={{marginTop:10}}>
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

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Choices</FormLabel>
          <RadioGroup
            aria-label="Choices"
            name="choices"
            className={classes.group}
            value={answerChoiceId}
            onChange={this.handleChange}
          >

          {choices.map(choice => <FormControlLabel value={choice.choice} control={<Radio />} label={choice.choice} />)}

          </RadioGroup>
        </FormControl>

        <div style={{margin:10}}>
        <Mutation
            mutation={ANSWER_QUESTION_MUTATION}
            variables={{
              questionId: questionId,
              answerChoiceId: this.state.answerChoiceId
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
              onClick={mutation}>Submit Answer</Button>
            )}
        </Mutation>
        </div>

        </div>
          )
          }}
          </Query>

        </Paper>
        </div>
      </main>

      <ErrorSnack handleClose={() => this.setState({isVisibleGraph:false})} classes={classes} open={isVisibleGraph} errorMsg={graphQLError} />

      <ErrorSnack handleClose={() => this.setState({isVisibleNet:false})} classes={classes} open={isVisibleNet} errorMsg={networkError.message} />

      </div>

  )
}

_error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
    this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

    error.networkError &&
      this.setState({ isVisibleNet: true, networkError: error.networkError.message})

}
  _confirm = async data => {

    const { id } = data.addAnswer

    this.props.history.push({
      pathname: `/question_answered`,
      state: { answerId: id }
      })
    }

  }

export default withStyles(styles)(AnswerQuestion)
