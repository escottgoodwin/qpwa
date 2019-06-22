import React,{Component} from 'react'
import '../css/App.css'
import { Message } from 'semantic-ui-react'

import {withRouter} from "react-router-dom"

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import { Mutation } from "react-apollo"
import { EDIT_QUESTION_MUTATION } from '../ApolloQueries'

class EditQuestionInput extends Component {

  state = {
        question:'',
        choice1:'',
        choiceCorrect1:false,
        button1:'outlined',
        choice2:'',
        choiceCorrect2:false,
        button2:'outlined',
        choice3:'',
        choiceCorrect3:false,
        button3:'outlined',
        choice4:'',
        choiceCorrect4:false,
        button4:'outlined',
        choice1Id:'',
        choice2Id:'',
        choice3Id:'',
        choice4Id:'',
        graphQLError:'',
        isVisibleGraph:false,
        networkError:'',
        isVisibleNet:false,
      }

  handleChange = (event, {name, value}) => {
  if (this.state.hasOwnProperty(name)) {
    this.setState({ [name]: value });
  }
}

correctButton = (choiceCorrect1,choiceCorrect2,choiceCorrect3,choiceCorrect4) => {
  if (choiceCorrect1){
  this.setState({
  button1:'contained',
  button2:'outlined',
  button3:'outlined',
  button4:'outlined'})
  }

  if (choiceCorrect2){
    this.setState({
    button1:'outlined',
    button2:'contained',
    button3:'outlined',
    button4:'outlined'})
  }

  if (choiceCorrect3){
    this.setState({
    button1:'outlined',
    button2:'outlined',
    button3:'contained',
    button4:'outlined'})
  }

  if (choiceCorrect4){
    this.setState({
    button1:'outlined',
    button2:'outlined',
    button3:'outlined',
    button4:'contained'})
  }

}

componentDidMount(){
  const { question, choices } = this.props

  console.log(choices)

  const choice1 = choices[0].choice
  const choiceCorrect1 = choices[0].correct
  const choice1Id = choices[0].id

  const choice2 = choices[1].choice
  const choiceCorrect2 = choices[1].correct
  const choice2Id = choices[1].id

  const choice3 = choices[2].choice
  const choiceCorrect3 = choices[2].correct
  const choice3Id = choices[2].id

  const choice4 = choices[3].choice
  const choiceCorrect4 = choices[3].correct
  const choice4Id = choices[3].id

  this.setState({ question, choice1, choiceCorrect1, choice2, choiceCorrect2, choice3, choiceCorrect3, choice4, choiceCorrect4, choice1Id, choice2Id, choice3Id, choice4Id })

  this.correctButton(choiceCorrect1, choiceCorrect2, choiceCorrect3, choiceCorrect4)
}

render() {
  const { classes } = this.props
  const { question,
          choice1,
          choiceCorrect1,
          choice2,
          choiceCorrect2,
          choice3,
          choiceCorrect3,
          choice4,
          choiceCorrect4,
          choice1Id,
          choice2Id,
          choice3Id,
          choice4Id,
          graphQLError,
          networkError,
          isVisibleNet,
          isVisibleGraph } = this.state

          const { id, oldQuestionId, test } = this.props
            console.log(this.state)

  return (

    <div>

    <form className={classes.form}>
  <Paper className={classes.paper}>
  <TextField
      id="filled-multiline-flexible"
      label="Question"
      multiline
      rows="4"
      fullWidth
      className={classes.textField}
      value={question}
      onChange={e => this.setState({ question: e.target.value })}
      margin="normal"
    />

    </Paper>


  <Paper className={classes.paper}>
  <TextField
      id="outlined-full-width"
      label="Choice 1"
      fullWidth
      className={classes.textField}
      value={choice1}
      onChange={e => this.setState({ choice1: e.target.value })}
      margin="normal"
    />

    <Button
    fullWidth
    variant={this.state.button1}
    color="primary"
    className={classes.submit}
    onClick={() => this.setState({
      choiceCorrect1:true,
      choiceCorrect2:false,
      choiceCorrect3:false,
      choiceCorrect4:false,
      button1:'contained',
      button2:'outlined',
      button3:'outlined',
      button4:'outlined'
    })}>Correct</Button>
    </Paper>


  <Paper className={classes.paper}>

  <TextField
      id="outlined-full-width"
      label="Choice 2"
      fullWidth
      className={classes.textField}
      value={choice2}
      onChange={e => this.setState({ choice2: e.target.value })}
      margin="normal"
    />

    <Button
    fullWidth
    variant={this.state.button2}
    color="primary"
    className={classes.submit}
    onClick={() => this.setState({
      choiceCorrect1:false,
      choiceCorrect2:true,
      choiceCorrect3:false,
      choiceCorrect4:false,
      button1:'outlined',
      button2:'contained',
      button3:'outlined',
      button4:'outlined'
    })}>
    Correct
    </Button>
    </Paper>


  <Paper className={classes.paper}>

    <TextField
        id="outlined-full-width"
        label="Choice 3"
        fullWidth
        className={classes.textField}
        value={choice3}
        onChange={e => this.setState({ choice3: e.target.value })}
        margin="normal"
      />

      <Button
      fullWidth
      variant={this.state.button3}
      color="primary"
      className={classes.submit}
      onClick={() => this.setState({
        choiceCorrect1:false,
        choiceCorrect2:false,
        choiceCorrect3:true,
        choiceCorrect4:false,
        button1:'outlined',
        button2:'outlined',
        button3:'contained',
        button4:'outlined'
      })}>
      Correct
      </Button>
      </Paper>


    <Paper className={classes.paper}>
    <TextField
        id="outlined-full-width"
        label="Choice 4"
        fullWidth
        className={classes.textField}
        value={choice4}
        onChange={e => this.setState({ choice4: e.target.value })}
        margin="normal"
      />

      <Button
      fullWidth
      variant={this.state.button4}
      color="primary"
      className={classes.submit}
      onClick={() => this.setState({
        choiceCorrect1:false,
        choiceCorrect2:false,
        choiceCorrect3:false,
        choiceCorrect4:true,
        button1:'outlined',
        button2:'outlined',
        button3:'outlined',
        button4:'contained'
      })}>
      Correct
      </Button>
      </Paper>

      <div style={{margin:10}}>
      <Button
      fullWidth
      variant="contained"
      size='large'
      color="primary"
      className={classes.submit}
      onClick={() => this.props.history.push({
        pathname: `/review_question`,
        state: { newQuestionId: id, oldQuestionId: oldQuestionId, testId: test.id }
      })}>Cancel</Button>
      </div>

    <div style={{margin:10}}>
    <Mutation
        mutation={EDIT_QUESTION_MUTATION}
        variables={{
          id:id,
          question: question,
          choice1: choice1,
          choice2: choice2,
          choice3: choice3,
          choice4: choice4,
          choiceCorrect1: choiceCorrect1,
          choiceCorrect2: choiceCorrect2,
          choiceCorrect3: choiceCorrect3,
          choiceCorrect4: choiceCorrect4,
          choice1Id:choice1Id,
  	      choice2Id:choice2Id,
  	      choice3Id:choice3Id,
  	      choice4Id:choice4Id,
        }}
        onCompleted={data => this._confirm(data)}
        onError={error => this._error (error)}
      >

        {mutation => (
          <Button
          fullWidth
          variant="contained"
          size='large'
          color="primary"
          className={classes.submit}
          onClick={mutation}>
          Submit
          </Button>
        )}
    </Mutation>
    </div>

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

    </form>
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

    const { oldQuestionId } = this.props
    const { id, test } = data.updateQuestion

    this.props.history.push({
      pathname: `/review_question`,
      state: { newQuestionId: id, oldQuestionId: oldQuestionId, testId: test.id }
      })
  }

}

export default withRouter(EditQuestionInput)
