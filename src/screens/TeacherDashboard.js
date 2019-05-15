import React,{Component} from 'react'
import * as Cookies from "js-cookie"
import '../css/App.css'
import { Query } from "react-apollo"

import TeacherHeader from '../components/TeacherHeader'
import CourseList from '../components/CourseList'
import Loading from './Loading'


import {TEACHER_DASHBOARD_QUERY} from '../ApolloQueries'

import Error from './Error'

class TeacherDashboard extends Component {

  render() {

    const userid = Cookies.get('userid')

    return (

        <Query query={TEACHER_DASHBOARD_QUERY} variables={{ userid }} >
              {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <Error error={error} />

                const userToRender = data.user
                const teacherCourses = new Array(userToRender.teacherCourses.filter(course => !course.deleted))

                return (

                  <>
                  <TeacherHeader {...userToRender} />

                  <CourseList  {...teacherCourses} />
                  </>

              )
            }}
          </Query>
    )
  }
}

export default TeacherDashboard
