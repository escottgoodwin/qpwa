import React,{Component} from 'react'
import '../css/App.css'

import CourseHeader from '../components/CourseHeader'
import Loading from './Loading'
import CourseStudentList from '../components/CourseStudentList'
import { Query } from "react-apollo"
import Error from './Error'

import {COURSE_STUDENT_QUERY} from '../ApolloQueries'

export default class CourseStudents extends Component {

  render() {

    const { course_id }= this.props.location.state

    return (
    <Query query={COURSE_STUDENT_QUERY} variables={{ courseId: course_id }} fetchPolicy="cache-and-network">
          {({ loading, error, data }) => {
            if (loading) return <Loading />
            if (error) return <Error {...error}/>

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

      <div className="main">
        <div className="container">
          <CourseHeader {...courseToRender} />
          <CourseStudentList students={students} courseId={course_id} />
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
