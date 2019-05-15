import React,{Component} from 'react';
import '../css/App.css';
import { Form, Input, Button, Message } from 'semantic-ui-react'
import { Mutation } from "react-apollo";
import {withRouter} from "react-router-dom"

import {EDIT_COURSE_MUTATION} from '../ApolloQueries'

class EditCourseInput extends Component {

      state = {
            department1: this.props.department1,
            name:this.props.name,
            courseNumber:this.props.courseNumber,
            time:this.props.time,
            graphQLError: '',
            isVisibleGraph:false,
            networkError:false,
            isVisibleNet:false,
  }

render() {
  const { name, courseNumber, time, department1, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state

  return (

    <div>

          <Form size='big'>

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
            value={courseNumber}
            onChange={e => this.setState({ courseNumber: e.target.value })}
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
          </Form>
          <div style={{padding:'50px'}}>
            <Mutation
                mutation={EDIT_COURSE_MUTATION}
                variables={{ name: name,
                  courseNumber: courseNumber,
                  time: time,
                  department1: department1,
                  id: this.props.id
                 }}
                onCompleted={data => this._confirm(data)}
                onError={error => this._error (error)}
                optimisticResponse={{
                  __typename: "Mutation",
                  updateCourse: {
                    id: this.props.id,
                    __typename: "Course",
                    name: name,
                    courseNumber: courseNumber,
                    time: time,
                    department1: department1,
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
    pathname: `/course_dashboard`,
    state: { course_id: this.props.id  }
    })
}

}

export default withRouter(EditCourseInput)
