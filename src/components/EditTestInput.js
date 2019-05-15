import React,{Component} from 'react'
import '../css/App.css'
import { Form, Input, Button, Select, Message } from 'semantic-ui-react'
import {  DateTimeInput } from 'semantic-ui-calendar-react';
import { Mutation } from "react-apollo"
import {withRouter} from "react-router-dom"
import moment from 'moment'

import {TEST_COURSE_MUTATION} from '../ApolloQueries'

class EditTestInput extends Component {

      state = {
            subject: this.props.subject,
            testDate:moment(this.props.testDate).format(),
            testNumber:this.props.testNumber,
            testType:this.props.testType,
            graphQLError: '',
            isVisibleGraph:false,
            networkError:false,
            isVisibleNet:false,
  }

  handleChange = (event, {name, value}) => {
  if (this.state.hasOwnProperty(name)) {
    this.setState({ [name]: value });
  }
}

render() {

  const { subject, testDate, testNumber, testType ,graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state
  const testnumbers = [{value:"Test 1",text:"Test 1"}, {value:"Test 2",text:"Test 2"}, {value:"Test 3",text:"Test 3"}, {value:"Test 4",text:"Test 4"}, {value:"Test 5",text:"Test 5"}, {value:"Test 6",text:"Test 6"}]
  const testTypes = [{value:"CLASS",text:"CLASS"},{value:"LAB",text:"LAB"}]

  const testDate1 = moment(testDate).format()
  return (

    <div>

    <Form size='big'>

    <Form.Field
      control={Input}
      label='Subject'
      value={subject}
      onChange={e => this.setState({ subject: e.target.value })}
      placeholder='Subject'
    />
    <Form.Group widths='equal'>

    <DateTimeInput
    label='Test Date'
    dateFormat="MM-DD-YYYY"
    timeFormat="AMPM"
        name="testDate"
        placeholder="Date Time"
        value={this.state.testDate}
        iconPosition="left"
        onChange={this.handleChange} />

    <Form.Field
      id='institutionId'
      control={Select}
      options={testnumbers}
      value={this.state.testNumber}
      onChange={(event, {value}) => { this.setState({ testNumber: value })}}
      label='Test Number'
      fluid
      selection
      placeholder='Select Test Number'
    />

    <Form.Field
    width={4}
      id='type'
      control={Select}
      options={testTypes}
      value={this.state.testType}
      onChange={(event, {value}) => { this.setState({ testType: value })}}
      label='Test Type'
      fluid
      selection
      placeholder='Select'
    />

    </Form.Group>

          </Form>

            <Mutation
                mutation={TEST_COURSE_MUTATION}
                variables={{
                  subject: subject,
                  testNumber: testNumber,
                  testDate: testDate1,
                  testType: testType,
                  id: this.props.id
                 }}
                onCompleted={data => this._confirm(data)}
                onError={error => this._error (error)}
                optimisticResponse={{
                  __typename: "Mutation",
                  updateTest: {
                    id: this.props.id,
                    __typename: "Test",
                    subject: subject,
                    testNumber: testNumber,
                    testDate: testDate1,
                    testType: testType
                  }
                }}
              >
                {mutation => (
                  <Button  color='blue' onClick={mutation}>Submit</Button>
                )}
              </Mutation>

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


)
}

_error = async error => {

    const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
    this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

    error.networkError &&
      this.setState({ isVisibleNet: true, networkError: error.networkError.message})

}

_confirm = async data => {
  this.props.history.push({
    pathname: `/test_dashboard`,
    state: { test_id: this.props.id  }
    })
}

}

export default withRouter(EditTestInput)
