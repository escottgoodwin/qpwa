import React,{Component} from 'react'

import '../css/App.css'
import { Query } from "react-apollo"
import { Link } from 'react-router-dom'

import InvitationList from '../components/InvitationList'
import StudentCourseList from '../components/StudentCourseList'

import Error from './Error'
import Loading from './Loading'

import {STUDENT_COURSE_QUERY} from '../ApolloQueries'

class StudentDashboard extends Component {

  render() {
    const userid = sessionStorage.getItem('userid')
    const questionId = 'cjuub450n01bb0751keow7kjv'

    const answerId = 'cjunbxcu800dx0734t8cq9arz'
    const testId = 'cjuub0c8j00x707512cybsukb'

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
                    <div>
                    <Link  to={{
                      pathname: "/create_question",
                      state:
                        { questionId: questionId }
                      }} >

                      Create Question

                    </Link>
                     </div>

                     <div>
                     <Link  to={{
                       pathname: "/answer_question",
                       state:
                         { questionId: questionId }
                       }} >

                       Answer Question

                     </Link>
                      </div>

                      <div>
                      <Link  to={{
                        pathname: "/review_question",
                        state:
                          { newQuestionId: questionId,
                            testId: testId}
                        }} >

                        Review Question

                      </Link>
                       </div>

                       <div>
                       <Link  to={{
                         pathname: "/question_answered",
                         state:
                           { answerId: answerId }
                         }} >

                         Question Answered

                       </Link>
                        </div>

                      <StudentCourseList  {...studentCourses} />

                    </>
              )
            }}
          </Query>
    )
  }
}


export default StudentDashboard
