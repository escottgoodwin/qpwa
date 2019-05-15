import React,{Component} from 'react';
import '../css/App.css';
import { Form, Button, Select, Input, Image, Message, Checkbox, Grid, Segment } from 'semantic-ui-react'
import { DateTimeInput } from 'semantic-ui-calendar-react';
import moment from 'moment'

import { Mutation, Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'

import TestHeader from '../components/TestHeader'

import {NEW_PUBLISH_TEST_MUTATION, TEST_QUERY, PUBLISH_TEST_REFETCH_QUERY} from '../ApolloQueries'

class PublishTest extends Component {

    state = {
          endDate:'',
          endTime:'',
          startTime:'',
          graphQLError: '',
          question:'',
          choice1:'',
          choiceCorrect1:false,
          choice2:'',
          choiceCorrect2:false,
          choice3:'',
          choiceCorrect3:false,
          choice4:'',
          choiceCorrect4:false,
          graphQLErrorL:false,
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
      const { test_id } = this.props.location.state

      const { endDate,
              endTime,
              startTime,
              question,
              choice1,
              choiceCorrect1,
              choice2,
              choiceCorrect2,
              choice3,
              choiceCorrect3,
              choice4,
              choiceCorrect4,
              graphQLError,
              networkError,
              isVisibleNet,
              isVisibleGraph } = this.state

              const statStopNumbers = [
              {value:"6",text:"6 AM"},
              {value:"7",text:"7 AM"},
              {value:"8",text:"8 AM"},
              {value:"9",text:"9 AM"},
              {value:"10",text:"10 AM"},
              {value:"11",text:"11 AM"},
              {value:"12",text:"12 PM"},
              {value:"13",text:"1 PM"},
              {value:"14",text:"2 PM"},
              {value:"15",text:"3 PM"},
              {value:"16",text:"4 PM"},
              {value:"17",text:"5 PM"},
              {value:"18",text:"6 PM"},
              {value:"19",text:"7 PM"},
              {value:"20",text:"8 PM"},
              {value:"21",text:"9 PM"},
              {value:"22",text:"10 PM"},
              {value:"23",text:"11 PM"}
            ]

      return (
        <div className="main">
        <div className="container">

      <Query query={TEST_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error/>

              const test = data.test
              const firstPanel = test.panels[0]
              return (
                <>
                <div style={{padding:"20px"}}>
                <TestHeader  {...test} />
                </div>

                <div style={{paddingRight:"150px",paddingLeft:"150px"}} >

      <h2>Publish Test</h2>

      <Form size="big">

      <DateTimeInput
      label='Test End Date'
      dateFormat="MM-DD-YYYY"
      timeFormat="AMPM"
      name="endDate"
      placeholder="Test End Date"
      value={this.state.endDate}
      iconPosition="left"
      onChange={this.handleChange} />

      <Form.Group widths='equal'>

      <Form.Field
        id='startTime:'
        control={Select}
        options={statStopNumbers}
        onChange={(event, {value}) => { this.setState({ startTime: value })}}
        label='Start Time'
        fluid
        selection
        placeholder='Select Start Time'
      />

      <Form.Field
        id='endTime'
        control={Select}
        options={statStopNumbers}
        onChange={(event, {value}) => { this.setState({ endTime: value })}}
        label='Stop Time'
        fluid
        selection
        placeholder='Select Stop Time'
      />
      </Form.Group>

      <h4>First Question</h4>

      <Image src={firstPanel.link} />

      <Form.Field
        id='question'
        control={Input}
        label='Question'
        value={question}
        onChange={e => this.setState({ question: e.target.value })}
        placeholder='Question...'
      />
      <div style={{margin:15}}>

      <Grid columns={2} >

      <Grid.Row >

      <Grid.Column width={14}>
      <Form.Field
        id='choice1'
        control={Input}
        label=''
        value={choice1}
        onChange={e => this.setState({ choice1: e.target.value })}
        placeholder='Choice 1'
      />
      </Grid.Column>

      <Grid.Column width={2}>
      <Segment>
      <Checkbox fitted
            checked={this.state.choiceCorrect1}
            onChange={() =>  this.setState({
              choiceCorrect1:true,
              choiceCorrect2:false,
              choiceCorrect3:false,
              choiceCorrect4:false
            }) }
          />
        </Segment>
        </Grid.Column>

        </Grid.Row >

      <Grid.Row >

      <Grid.Column width={14}>
      <Form.Field
        id='choice2'
        control={Input}
        label=''
        value={choice2}
        onChange={e => this.setState({ choice2: e.target.value })}
        placeholder='Choice 2'
      />
      </Grid.Column>

      <Grid.Column width={2}>
      <Segment>
      <Checkbox fitted
            checked={this.state.choiceCorrect2}
            onChange={() =>  this.setState({
              choiceCorrect1:false,
              choiceCorrect2:true,
              choiceCorrect3:false,
              choiceCorrect4:false
            }) }
          />
        </Segment>
      </Grid.Column>
      </Grid.Row>

      <Grid.Row >

      <Grid.Column width={14}>

      <Form.Field
        id='choice3'
        control={Input}
        label=''
        value={choice3}
        onChange={e => this.setState({ choice3: e.target.value })}
        placeholder='Choice 3'
      />

      </Grid.Column>

      <Grid.Column width={2}>
      <Segment>
      <Checkbox fitted
            checked={this.state.choiceCorrect3}
            onChange={() =>  this.setState({
              choiceCorrect1:false,
              choiceCorrect2:false,
              choiceCorrect3:true,
              choiceCorrect4:false
            }) }
          />
        </Segment>
      </Grid.Column>
      </Grid.Row>

      <Grid.Row >

      <Grid.Column width={14}>

      <Form.Field
        id='choice4'
        control={Input}
        label=''
        value={choice4}
        onChange={e => this.setState({ choice4: e.target.value })}
        placeholder='Choice 4'
      />

      </Grid.Column>

      <Grid.Column width={2}>
      <Segment>
      <Checkbox fitted
            checked={this.state.choiceCorrect4}
            onChange={() =>  this.setState({
              choiceCorrect1:false,
              choiceCorrect2:false,
              choiceCorrect3:false,
              choiceCorrect4:true
            }) }
          />
        </Segment>
      </Grid.Column>
      </Grid.Row>

        </Grid >
        </div>

      <div style={{padding:10}}>
      <Mutation
          mutation={NEW_PUBLISH_TEST_MUTATION}
          variables={{
            startTime:startTime,
            endTime:endTime,
            endDate:moment(endDate).format(),
            testId: test_id,
            panelId: firstPanel.id,
            question: question,
            choice1: choice1,
            choice2: choice2,
            choice3: choice3,
            choice4: choice4,
            choiceCorrect1: choiceCorrect1,
            choiceCorrect2: choiceCorrect2,
            choiceCorrect3: choiceCorrect3,
            choiceCorrect4: choiceCorrect4,
          }}
          onCompleted={data => this._confirm(data)}
          onError={error => this._error (error)}
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

      </Form>
      </div>
      </>
    )
  }}
</Query>
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
  const { id } = data.publishTest
  this.props.history.push({
    pathname: `/test_dashboard`,
    state: { test_id: id  }
    })
  }
}


export default PublishTest
