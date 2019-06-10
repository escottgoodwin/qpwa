import React,{Component} from 'react'
import * as Cookies from "js-cookie"
import '../css/App.css'
import { Query } from "react-apollo"

import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

import TeacherHeader from '../components/TeacherHeader'
import CourseList from '../components/CourseList'

import {TEACHER_DASHBOARD_QUERY} from '../ApolloQueries'

class TeacherDashboard extends Component {

  render() {

    const userid = Cookies.get('userid')

    return (

        <Query query={TEACHER_DASHBOARD_QUERY} variables={{ userid }} >
              {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div> {JSON.stringify(error)} </div>

                const userToRender = data.user
                const teacherCourses = new Array(userToRender.teacherCourses.filter(course => !course.deleted))

                return (
                  <Fade in={!loading}>
                  <>

                  <TeacherHeader courses={teacherCourses[0].length} {...userToRender} />

                  <CourseList  {...teacherCourses} />

                  </>
                  </Fade>
              )
            }}
          </Query>
    )
  }
}

export default TeacherDashboard
