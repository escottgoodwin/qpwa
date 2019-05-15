import React,{Component} from 'react'
import '../css/App.css'

import CourseHeader from '../components/CourseHeader'
import { Query, Mutation, } from "react-apollo"
import { Button, Form, TextArea, Message } from 'semantic-ui-react'
import Error from './Error'
import Loading from './Loading'

import {COURSE_DASHBOARD_QUERY, SEND_INVITES_MUTATION} from '../ApolloQueries'

class CourseInvitation extends Component {

  state = {
        emails:'',
        graphQLError: '',
        isVisibleGraph:false,
        networkError:'',
        isVisibleNet:false,
      }

  render() {

    const { course_id }= this.props.location.state
    const { graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state


    return (
    <Query query={COURSE_DASHBOARD_QUERY} variables={{ courseid: course_id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading/>
            if (error) return <Error {...error}/>

            const courseToRender = data.course


        return (

      <div className="main">
        <div className="container">

              <CourseHeader {...courseToRender} />
              <div style={{width:'75%',margin:'auto'}}>
              <div>
                <h4>Send Student Invitations</h4>
              </div>
              <Form>
              <Form.Field
              control={TextArea}
              style={{ minHeight: 200 }}
              label='Emails'
              value={this.state.emails}
              placeholder='Email list...'
              onChange={e => this.setState({ emails: e.target.value })}
              />

              </Form>
              <div style={{padding:"15px"}}>
              <Mutation
                  mutation={SEND_INVITES_MUTATION}
                  variables={{ course_id: course_id, emails: this.state.emails }}
                  onError={error => this._error (error)}
                  onCompleted={data => this._confirm(data)}
                >
                  {mutation => (
                    <Button color='blue' onClick={mutation}>Send Invitations</Button>
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
              </div>
            </div>


        )
      }}
    </Query>
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
      state: { course_id: this.props.location.state.course_id  }
      })
  }
}


export default CourseInvitation
