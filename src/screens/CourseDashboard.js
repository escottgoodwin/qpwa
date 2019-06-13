import React,{Component} from 'react'
import '../css/App.css'
import * as Cookies from "js-cookie"
import CourseHeader from '../components/CourseHeader'
import TestList from '../components/TestList'
import { Query, Mutation } from "react-apollo"
import { Message } from 'semantic-ui-react'
import Fade from '@material-ui/core/Fade';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Error from './Error'

import Loading from './Loading'

import {NEW_COURSE_DASHBOARD_QUERY, DELETE_COURSE_MUTATION, TEACHER_DASHBOARD_QUERY} from '../ApolloQueries'

class CourseDashboard extends Component {

  render() {

    const { course_id }= this.props.location.state

    return (
      <>
      <CssBaseline />
      <div style={{marginBottom:50}}>
      <Query query={NEW_COURSE_DASHBOARD_QUERY} variables={{ courseId: course_id }} fetchPolicy="cache-and-network" >
          {({ loading, error, data }) => {
            if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
            if (error) return <div> {JSON.stringify(error)} </div>

            const courseToRender = data.courseDashboard1
            const { studentCount, courseTestList } = data.courseDashboard1

            const tests1 = courseTestList.filter(test => !test.deleted)

        return (
          <Fade in={!loading}>
          <>

          <CourseHeader {...courseToRender} />

              <div style={{marginLeft:30,marginRight:30}}>
                <Link  to={{
                  pathname: "/add_test",
                  state:
                    { course_id }
                  }} >

                  <Button  style={{marginTop:20}} fullWidth size='large' variant='contained' color="primary" >Add Test</Button>

                 </Link>


                 <Link  to={{
                   pathname: "/course_students",
                   state:
                     { course_id }
                   }} >

                   <Button  style={{marginTop:20}} fullWidth size='large' variant='contained' color="primary" >{studentCount} Students</Button>

                  </Link>
              </div>
              <TestList tests={tests1} courseId={course_id} />

              <Link  to={{
                pathname: "/edit_course",
                state:
                  {
                    course_id }
                }} >

              <div style={{marginLeft:30,marginRight:30}}>
              <Button  style={{marginTop:20}} fullWidth size='large' variant='contained' color="primary" >Edit Course</Button>
              </div>
              </Link>
              </>
            </Fade>
        )
      }}
    </Query>
    </div>
    </>
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
