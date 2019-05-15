import React,{Component} from 'react'
import * as Cookies from "js-cookie"
import '../css/App.css'
//import { Form, FormGroup, Label, Input, } from 'reactstrap'
import { Form, Input, Button, Select, Message } from 'semantic-ui-react'

import { Mutation } from "react-apollo"

import {ADD_COURSE_MUTATION, TEACHER_DASHBOARD_QUERY} from '../ApolloQueries'

class AddCourse extends Component {

  state = {
        institutionId:'',
        department1: '',
        name:'',
        schoolId:'',
        time:'',
        course_message:'',
        institutions:'',
        graphQLError: '',
        isVisibleGraph:false,
        networkError:false,
        isVisibleNet:false,
      }

render() {

  const user =  JSON.parse(sessionStorage.getItem('user'))
  const userid = Cookies.get('userid')
  const { name, schoolId, time, department1, institutionId, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state
  const institutions = user.teacherInstitutions.map(institution => ({value: institution.id, text: institution.name}))

  return (
  <div className="dashboard">
    <div className="signin">
      <h2>Add Course</h2>
      <h6 style={{color:'green',height:10,padding:5}}>{this.state.course_message}</h6>

      <Form size="big">

      <Form.Field
        id='name'
        control={Input}
        label='Course Name'
        value={name}
        onChange={e => this.setState({ name: e.target.value })}
        placeholder='Course Name'
      />
      <Form.Field
        id='schoolId'
        control={Input}
        label='Course Number'
        value={schoolId}
        onChange={e => this.setState({ schoolId: e.target.value })}
        placeholder='Course Number eg. BUS 101'
      />
      <Form.Field
        id='time'
        control={Input}
        label='Time'
        value={time}
        onChange={e => this.setState({ time: e.target.value })}
        placeholder='Time eg. MWF 12:00-1:20'
      />

      <Form.Field
        id='department1'
        control={Input}
        label='Department'
        value={department1}
        onChange={e => this.setState({ department1: e.target.value })}
        placeholder='eg. Biology'
      />

      <Form.Field
        id='institutionId'
        control={Select}
        options={institutions}
        onChange={(event, {value}) => { this.setState({ institutionId: value })}}
        label='Institution'
        fluid
        selection
        placeholder='Select Institution'
      />

      </ Form>

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


        <Mutation
            mutation={ADD_COURSE_MUTATION}
            variables={{ name: name,
              schoolId:schoolId,
              time: time,
              department1: department1,
              institutionId: institutionId
            }}
            onError={error => this._error (error)}
            onCompleted={data => this._confirm(data)}
            refetchQueries={() => { return [{
                query: TEACHER_DASHBOARD_QUERY,
                variables: { userid }}]
              }}
            >
            {mutation => (
              <div style={{padding:'15px'}}>
              <Button color='blue' onClick={mutation}>Submit</Button>
              </div>
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
      const { id } = data.addCourse
      this.props.history.push({
        pathname: `/course_dashboard`,
        state: { course_id: id  }
        })
    }

  }

export default AddCourse
