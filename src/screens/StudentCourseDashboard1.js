import React,{Component} from 'react'
import '../css/App.css'
import * as Cookies from "js-cookie"
import CourseHeaderStudent from '../components/CourseHeaderStudent'
import StudentTestList from '../components/StudentTestList'
import { Query, Mutation } from "react-apollo"
import { Message } from 'semantic-ui-react'
import Button from '@material-ui/core/Button';
import Error from './Error'

import Loading from './Loading'

import {COURSE_QUERY} from '../ApolloQueries'

class StudentCourseDashboard extends Component {

  render() {

    const userid = Cookies.get('userid')
    const { course_id }= this.props.location.state

    return (

      <Query query={COURSE_QUERY} variables={{ courseid: course_id }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error {...error} />

              const courseToRender = data.course
              const tests1 = courseToRender.tests.filter(test => !test.deleted && test.published)

          return (
              <>
              <CourseHeaderStudent {...courseToRender} />
              <StudentTestList tests={tests1} courseId={course_id} />
            </>
        )
      }}
    </Query>
    )
  }

}


export default StudentCourseDashboard
