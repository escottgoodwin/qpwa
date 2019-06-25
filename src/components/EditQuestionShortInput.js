import React,{Component} from 'react'
import '../css/App.css'

import {withRouter} from "react-router-dom"

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import { Mutation } from "react-apollo"
import { EDIT_SHORT_QUESTION_MUTATION } from '../ApolloQueries'

import ErrorSnack from '../components/ErrorSnack'

class EditQuestionShortInput extends Component {

  state = {
        question:'',
        correctShortAnswer:'',
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


componentDidMount(){
  const { question, correctShortAnswer } = this.props

  this.setState({ question, correctShortAnswer })

}

render() {
  const { classes } = this.props
  const { question,
          correctShortAnswer,
          graphQLError,
          networkError,
          isVisibleNet,
          isVisibleGraph } = this.state

          const { id, oldQuestionId, test } = this.props


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
        id="filled-multiline-flexible"
        label="Answer"
        multiline
        rows="2"
        fullWidth
        className={classes.textField}
        value={correctShortAnswer}
        onChange={e => this.setState({ correctShortAnswer: e.target.value })}
        margin="normal"
      />

      </Paper>

    <div style={{margin:10}}>
    <Mutation
        mutation={EDIT_SHORT_QUESTION_MUTATION}
        variables={{
          id,
          correctShortAnswer,
          question,
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


    <ErrorSnack handleClose={() => this.setState({isVisibleGraph:false})} classes={classes} open={isVisibleGraph} errorMsg={graphQLError} />

    <ErrorSnack handleClose={() => this.setState({isVisibleNet:false})} classes={classes} open={isVisibleNet} errorMsg={networkError.message} />

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
    const { id, test } = data.updateShortQuestion

    this.props.history.push({
      pathname: `/review_question`,
      state: { newQuestionId: id, oldQuestionId: oldQuestionId, testId: test.id }
      })
  }

}

export default withRouter(EditQuestionShortInput)
