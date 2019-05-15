import React,{Component} from 'react';
import {withRouter} from "react-router-dom"
import moment from 'moment'
import '../css/App.css';

import { Link } from 'react-router-dom'

class TestHeaderStudent  extends Component {

  render() {

    const { subject, testNumber, course, testDate, id } = this.props

    return (

  <div style={{padding:'20px'}}>

  <h2>
  <Link  to={{
    pathname: "/student_course_dashboard",
    state:
      { course_id: course.id }
    }} >
    {course.name} - {course.courseNumber}
    </Link>
    </h2>

<hr/>
  <div >
  <h3>
  <Link  to={{
    pathname: "/student_test_dashboard",
    state:
      { test_id: id }
    }} >{testNumber} - {subject} - { moment(testDate).format("dddd MMMM Do YYYY") }
    </Link></h3>
  </div>
  </div>

)
}

}

export default withRouter(TestHeaderStudent)
