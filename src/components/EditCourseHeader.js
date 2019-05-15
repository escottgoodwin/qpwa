import React, {Component} from 'react';
import '../css/App.css';
import { Query } from "react-apollo";
import {TEST_COURSE_QUERY} from '../ApolloQueries'
import Error from './Error'
import { Link } from 'react-router-dom'
import {  Loader } from 'semantic-ui-react'

class EditCourseHeader extends Component {
  render(){
    const { course_id } = this.props
  
    return(
      <div>
      <div style={{padding:'10px'}}>
      <Query query={TEST_COURSE_QUERY} variables={{ course_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loader />
              if (error) return <Error {...error}/>

              const course = data.course

              return (

        <Link  to={{
          pathname: "/course_dashboard",
          state:
            { course_id }
          }} >

        <h2>{course.name} - {course.courseNumber}</h2>

        </Link>


      )
    }}
  </Query>
  </div>

  </div>
)

  }
}

export default EditCourseHeader
