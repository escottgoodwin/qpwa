import React,{Component} from 'react';
import '../css/App.css';
//import { Form, FormGroup, Label, Input, } from 'reactstrap';

import { Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'

import EditTestInput from '../components/EditTestInput'
import TestHeader from '../components/TestHeader'

import {TEST_QUERY} from '../ApolloQueries'

class EditTest extends Component {

render() {

  return (
    <div className="main">
    <div className="container">

    <TestHeader  testId={this.props.location.state.test_id} />
    <Query query={TEST_QUERY} variables={{ test_id: this.props.location.state.test_id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading/>
            if (error) return <Error {...error}/>

            const testToRender = data.test

        return (
            <div>
            <div style={{padding:"20px"}}>

            <h2>Edit Test</h2>
            </div>
            <div style={{paddingRight:'14em',paddingLeft:'14em'}}>
            <EditTestInput {...testToRender}/>
            </div>
            </div>
            )
          }}
        </Query>
        </div>
        </div>

      )
  }
}

export default EditTest ;
