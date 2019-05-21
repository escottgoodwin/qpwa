import React,{Component} from 'react'
import '../css/App.css'

import StudentCourseHeader from '../components/StudentCourseHeader'
import StudentTestList from '../components/StudentTestList'
import { Query } from "react-apollo"

import Error from './Error'
import Loading from './Loading'

import {COURSE_QUERY} from '../ApolloQueries'

class StudentCourseDashboard extends Component {

  render() {

    const { course_id }= this.props.location.state

    return (
    <Query query={COURSE_QUERY} variables={{ courseid: course_id }} fetchPolicy="cache-and-network">
          {({ loading, error, data }) => {
            if (loading) return <Loading />
            if (error) return <Error {...error} />

            const courseToRender = data.course
            const tests1 = courseToRender.tests.filter(test => !test.deleted && test.published)

        return (

      <div className="main">
        <div className="container">

              <StudentCourseHeader {...courseToRender} />
              <StudentTestList tests={tests1} courseId={course_id} />
              <div >

              </div>
            </div>
            </div>
        )
      }}
    </Query>
    )
  }

}

export default StudentCourseDashboard
