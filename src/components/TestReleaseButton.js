import React, {Component} from 'react';
import '../css/App.css'
import moment from 'moment'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { Mutation } from "react-apollo"

import {RELEASE_QUESTIONS_MUTATION, TEST_QUERY} from '../ApolloQueries'

export default class PanelCountButton extends Component {

  render(){

    const now = new Date()
    
    return (
      {this.props.published ?

      this.props.release ?
        <Button disabled color="blue" >Released: {moment(this.props.releaseDate).format("MM-DD-YYYY")}</Button>
      :
      <Mutation
          mutation={RELEASE_QUESTIONS_MUTATION}
          variables={{ test_id: this.props.id, releaseDate: now }}
          onCompleted={data => this._confirm(data)}
          refetchQueries={() => {
             return [{
                query: TEST_QUERY,
                variables: { test_id: this.props.id }
            }]}}
        >
          {mutation => (
            <Button color="blue" onClick={mutation} >Release All Questions</Button>
          )}
        </Mutation>
      :
        <Button  color="blue" >Release All Questions</Button>
      }
    )
  }
}


export default AddPanelButton
