import React,{Component} from 'react';
import '../css/App.css';
import { Form, Button, Select, Image } from 'semantic-ui-react'
import {  DateTimeInput } from 'semantic-ui-calendar-react';
import moment from 'moment'

import { Mutation, Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'


import {PUBLISH_TEST_MUTATION, TEST_QUERY, PUBLISH_TEST_REFETCH_QUERY} from '../ApolloQueries'

import EditTestHeader from '../components/EditTestHeader'

class PublishTest extends Component {


    state = {
          startHour:'',
          endHour:'',
          testEndDate:'',
        }

    handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

    render() {
      const { test_id } = this.props.location.state
      const { startHour, endHour, testEndDate } = this.state
      const testEndDate1 = moment(testEndDate).format()

      const statStopNumbers = [
      {value:"6 AM",text:"6 AM"},
      {value:"7 AM",text:"7 AM"},
      {value:"8 AM",text:"8 AM"},
      {value:"9 AM",text:"9 AM"},
      {value:"10 AM",text:"10 AM"},
      {value:"11 AM",text:"11 AM"},
      {value:"12 PM",text:"12 PM"},
      {value:"1 PM",text:"1 PM"},
      {value:"2 PM",text:"2 PM"},
      {value:"3 PM",text:"3 PM"},
      {value:"4 PM",text:"4 PM"},
      {value:"5 PM",text:"5 PM"},
      {value:"6 PM",text:"6 PM"},
      {value:"7 PM",text:"7 PM"},
      {value:"8 PM",text:"8 PM"},
      {value:"9 PM",text:"9 PM"},
      {value:"10 PM",text:"10 PM"},
      {value:"11 PM",text:"11 PM"}
    ]

      return (
        <div className="main">
  <div className="dashboard">
    <div className="signin">

      <div style={{padding:"20px"}}>
      <Query query={TEST_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error/>

              const test = data.test

              return (
                <EditTestHeader  {...test} />
            )
          }}
        </Query>
      </div>

      <h2>Publish Test</h2>
      <Form size="big">

      <DateTimeInput
      label='Test End Date'
      dateFormat="MM-DD-YYYY"
      timeFormat="AMPM"
          name="testEndDate"
          placeholder="Test End Date"
          value={this.state.testEndDate}
          iconPosition="left"
          onChange={this.handleChange} />

      <Form.Group widths='equal'>

      <Form.Field
        id='startHour'
        control={Select}
        options={statStopNumbers}
        onChange={(event, {value}) => { this.setState({ startHour: value })}}
        label='Start Time'
        fluid
        selection
        placeholder='Select Start Time'
      />

      <Form.Field
        id='stopHour'
        control={Select}
        options={statStopNumbers}
        onChange={(event, {value}) => { this.setState({ stopHour: value })}}
        label='Stop Time'
        fluid
        selection
        placeholder='Select Stop Time'
      />
      </Form.Group>


      <Mutation
          mutation={PUBLISH_TEST_MUTATION}
          variables={{
            startHour:startHour,
            endHour:endHour,
            testEndDate:testEndDate1,
            published: true,
            testId: test_id
          }}
          onCompleted={data => this._confirm(data)}
          refetchQueries={() => {
             return [{
                query: PUBLISH_TEST_REFETCH_QUERY,
                variables: { test_id: test_id }
            }];
        }}
        >
          {mutation => (
            <Button  color='blue' onClick={mutation}>Submit</Button>
          )}
        </Mutation>

      </Form>
    </div>
  </div>
  </div>
)
}

_confirm = async data => {
  const { id } = data.publishTest
  this.props.history.push({
    pathname: `/test_dashboard`,
    state: { test_id: id  }
    })
  }
}

export default PublishTest
