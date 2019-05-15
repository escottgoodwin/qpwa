import React,{Component} from 'react';
import '../css/App.css';
import { Form, Input, Button, Select, Message } from 'semantic-ui-react'
import {  DateTimeInput } from 'semantic-ui-calendar-react';
import moment from 'moment'

import { Mutation } from "react-apollo";

import { ADD_TEST_MUTATION } from '../ApolloQueries'

import EditCourseHeader from '../components/EditCourseHeader'

class AddTest extends Component {


    state = {
          testNumber:'',
          subject:'',
          testDate:'',
          testType:'',
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
      const { course_id } = this.props.location.state
      const { testNumber, subject, testDate, testType, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state
      const testDate1 = moment(testDate).format()
      const testnumbers = [{value:"Test 1",text:"Test 1"}, {value:"Test 2",text:"Test 2"}, {value:"Test 3",text:"Test 3"}, {value:"Test 4",text:"Test 4"}, {value:"Test 5",text:"Test 5"}, {value:"Test 6",text:"Test 6"}]
      const testTypes = [{value:"CLASS",text:"CLASS"},{value:"LAB",text:"LAB"}]

      return (
        <div className="main">
        <div style={{marginLeft:'20%', marginRight:'20%'}}>
          <div >

                <EditCourseHeader course_id={course_id} />

        <h2>Add Test</h2>

      <Form size="big">

      <Form.Field
        control={Input}
        label='Subject'
        value={subject}
        onChange={e => this.setState({ subject: e.target.value })}
        placeholder='Subject'
      />
      <Form.Group widths='equal'>

      <DateTimeInput
      autoComplete="off"
      width={8}
      label='Test Date'
      dateFormat="MM-DD-YYYY"
      timeFormat="AMPM"
          name="testDate"
          placeholder="Date Time"
          value={this.state.testDate}
          iconPosition="left"
          onChange={this.handleChange} />

      <Form.Field
      width={4}
        id='institutionId'
        control={Select}
        options={testnumbers}
        onChange={(event, {value}) => { this.setState({ testNumber: value })}}
        label='Test Number'
        fluid
        selection
        placeholder='Select'
      />

      <Form.Field
      width={4}
        id='type'
        control={Select}
        options={testTypes}
        onChange={(event, {value}) => { this.setState({ testType: value })}}
        label='Test Type'
        fluid
        selection
        placeholder='Select'
      />
      </Form.Group>

      <Mutation
          mutation={ADD_TEST_MUTATION}
          variables={{
            subject: subject,
            testDate:testDate1,
            testNumber: testNumber,
            published: false,
            release:false,
            courseId: course_id,
            testType: testType
          }}
          onCompleted={data => this._confirm(data)}
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

      </Form>
    </div>
  </div>
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
  const { id } = data.addTest
  this.props.history.push({
    pathname: `/test_dashboard`,
    state: { test_id: id  }
    })
  }
}

export default AddTest
