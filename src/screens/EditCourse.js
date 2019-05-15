import React,{Component} from 'react';
import '../css/App.css';
//import { Form, FormGroup, Label, Input, } from 'reactstrap';

import { Query } from "react-apollo";
import Error from './Error'
import Loading from './Loading'

import EditCourseInput from '../components/EditCourseInput'
import EditCourseHeader from '../components/EditCourseHeader'

import {COURSE_QUERY} from '../ApolloQueries'

class EditCourse extends Component {

render() {
  const { course_id } = this.props.location.state
  return (
    <div className="dashboard">
      <div className="signin">
      <EditCourseHeader course_id={course_id} />

        <h2>Edit Course</h2>

    <Query query={COURSE_QUERY} variables={{ courseid: course_id }}>
          {({ loading, error, data }) => {
            if (loading) return <Loading />
            if (error) return <Error {...error}/>

            const courseToRender = data.course

        return (

            <EditCourseInput {...courseToRender}/>

            )
          }}
        </Query>

        </div>
        </div>
  )
}

    _confirm = async data => {
      const { id } = data.updateCourse
      this.props.history.push({
        pathname: `/course_dashboard`,
        state: { course_id: id  }
        })
    }

  }



export default EditCourse ;
