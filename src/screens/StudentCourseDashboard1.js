import React,{Component} from 'react'
import '../css/App.css'

import Fade from '@material-ui/core/Fade';

import CourseHeaderStudent from '../components/CourseHeaderStudent'
import StudentTestList from '../components/StudentTestList'

import { Query } from "react-apollo"
import { COURSE_QUERY } from '../ApolloQueries'

class StudentCourseDashboard extends Component {

  render() {

    const { course_id }= this.props.location.state

    return (

      <Query query={COURSE_QUERY} variables={{ courseid: course_id }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

              const courseToRender = data.course
              const tests1 = courseToRender.tests.filter(test => !test.deleted && test.published)

          return (
            <Fade in={!loading}>
              <div >
              <CourseHeaderStudent {...courseToRender} />
              <StudentTestList tests={tests1} courseId={course_id} />
            </div>
            </Fade >
        )
      }}
    </Query>
    )
  }

}


export default StudentCourseDashboard
