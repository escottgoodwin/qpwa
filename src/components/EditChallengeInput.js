import React,{Component} from 'react'
import '../css/App.css'

import {withRouter} from "react-router-dom"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import { Mutation } from "react-apollo"
import {EDIT_CHALLENGE_MUTATION} from '../ApolloQueries'

import ErrorSnack from '../components/ErrorSnack'

class EditQuestionInput extends Component {

  state = {
        challenge:'',
        graphQLError:'',
        isVisibleGraph:false,
        networkError:'',
        isVisibleNet:false,
      }


componentDidMount(){
  const { challenge  } = this.props
  this.setState({ challenge })
}

render() {
  const { classes, id } = this.props
  const { challenge, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state

  return (
    <div>
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
        mutation={EDIT_CHALLENGE_MUTATION}
        variables={{
          challenge: challenge,
          challengeiId: id
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
          onClick={mutation}>Edit Challenge
          </Button>
          </div>

        )}
      </Mutation>
      </Paper>


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

    const { id } = data.updateChallenge

    this.props.history.push({
      pathname: `/challenge`,
      state: { challengeId: id }
      })
  }

}

export default withRouter(EditQuestionInput)
