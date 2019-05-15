import React,{Component} from 'react'

import '../css/App.css'
import { Query } from "react-apollo"

import InvitationList from '../components/InvitationList'
import StudentCourseList from '../components/StudentCourseList'

import Error from './Error'
import Loading from './Loading'

import {STUDENT_COURSE_QUERY} from '../ApolloQueries'

class StudentDashboard extends Component {

  render() {
    const userid = sessionStorage.getItem('userid')

    return (

        <Query query={STUDENT_COURSE_QUERY} variables={{ userid: userid }}>
              {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <Error error={error} />

                const userToRender = data.user
                const studentCourses = new Array(userToRender.studentCourses.filter(course => !course.deleted))

                return (
                    <>
                    <h3>{userToRender.firstName} {userToRender.lastName}'s Courses</h3>

                    {userToRender.invitesSentTo.length>0 &&
                      <div>
                      <div><h4>Course Inivitations</h4></div>

                      <InvitationList userid={userToRender.id} invites={userToRender.invitesSentTo}/>
                      </div>
                    }

                      <StudentCourseList  {...studentCourses} />

                    </>
              )
            }}
          </Query>
    )
  }
}


export default StudentDashboard
