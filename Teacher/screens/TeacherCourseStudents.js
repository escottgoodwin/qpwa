import React,{Component} from 'react'
import '../css/App.css'

import Fade from '@material-ui/core/Fade';
import CssBaseline from '@material-ui/core/CssBaseline';

import CourseStudentList from '../components/CourseStudentList1'
import TeacherCourseHeader from '../components/TeacherCourseHeader'

import { Query } from "react-apollo"
import { COURSE_STUDENT_QUERY } from '../ApolloQueries'

class TeacherCourseStudents extends Component {

  render() {

    const { course_id } = this.props.location.state

    return (
      <>
      <CssBaseline />
      <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} >

      <div style={{marginBottom:50}}>
      <Query query={COURSE_STUDENT_QUERY} variables={{ courseId: course_id }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
            if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
            if (error) return <div> {JSON.stringify(error)} </div>

            const courseToRender = data.course

            const students = []
            courseToRender.students.forEach(function(element) {
              const item =  {
                id: element.id,
                firstName:element.firstName,
                lastName:element.lastName,
                percentCorrect: element.answers.filter(a => a.answerCorrect).length / element.answers.length > 0 ? element.answers.filter(a => a.answerCorrect).length / element.answers.length : 0.0
              }
              students.push(item)
            });

        return (
          <Fade in={!loading}>
              <>
              <div style={{margin:30}}>
              <TeacherCourseHeader courseid={course_id} />
              </div>

              <CourseStudentList students={students} />

              </>
            </Fade>
        )
      }}
    </Query>
    </div>


    </div>
    </>
    )
  }

}


export default TeacherCourseStudents
