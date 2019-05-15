import React,{Component} from 'react'
import '../css/App.css'
import * as Cookies from "js-cookie"
import CourseHeader from '../components/CourseHeader'
import TestList from '../components/TestList2'
import { Query, Mutation } from "react-apollo"
import { Button, Message, Loader } from 'semantic-ui-react'
import Error from './Error'
import Loading from './Loading'


import CoursePlaceholder from './CoursePlaceholder'

import {NEW_COURSE_DASHBOARD_QUERY,COURSE_DASHBOARD_QUERY, DELETE_COURSE_MUTATION, TEACHER_DASHBOARD_QUERY} from '../ApolloQueries'

class CourseDashboard extends Component {

  state = {
    graphQLError: '',
    isVisibleGraph:false,
    networkError:'',
    isVisibleNet:false,
  }

  render() {

    const userid = Cookies.get('userid')
    const { course_id }= this.props.location.state
    const { graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state

    return (
    <Query query={NEW_COURSE_DASHBOARD_QUERY} variables={{ courseId: course_id }} fetchPolicy="network-only">
          {({ loading, error, data }) => {
            if (loading) return <Loading />
            if (error) return <Error {...error}/>


            const courseToRender = data.courseDashboard
            const tests1 = courseToRender.courseTestList.filter(test => !test.deleted)

        return (

      <div className="main">
        <div className="container">

              <CourseHeader {...courseToRender} />
              <TestList tests={tests1} courseId={course_id} />
              <div >

              <Mutation
                  mutation={DELETE_COURSE_MUTATION}
                  variables={{ course_id }}
                  onCompleted={data => this._confirm(data)}
                  onError={error => this._error(error)}
                  refetchQueries={() => { return [{
                    query: TEACHER_DASHBOARD_QUERY,
                    variables: { userid }
                  }]
                }}>
                  {mutation => (
                    <Button  color='red' onClick={mutation}>Delete Course</Button>
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
    this.props.history.push(`/teacher_dashboard`)
  }
}


export default CourseDashboard
