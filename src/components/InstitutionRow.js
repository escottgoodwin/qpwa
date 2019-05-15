import React from 'react';
import '../css/App.css';
import { Segment } from 'semantic-ui-react'
import {Link} from 'react-router-dom'



const InstitutionRow = (props) =>

<Segment >
  <div className="course_row">

  <div className="course_cell">
  <h5>
  <Link  to={{
    pathname: "/institution_dashboard",
    state:
      { institutionId: props.id }
    }} >

  {props.name}</Link>
  </h5>
  </div>


  <div className="course_cell">

  Courses: <Link  to={{
    pathname: "/institution_courses",
    state:
      { institutionId: props.id }
    }} >
     {props.courses.filter(course => !course.deleted).length}
    </Link>

  </div>

  <div className="course_cell">

  Admins: <Link  to={{
    pathname: "/institution_admins",
    state:
      { institutionId: props.id }
    }} >
    {props.admins.length}
    </Link>

  </div>

  <div className="course_cell">

  Teachers: <Link  to={{
    pathname: "/institution_teachers",
    state:
      { institutionId: props.id }
    }} >
     {props.teachers.length}
  </Link>

  </div>


  </div>

  </Segment >

//  </CardText>

//</Card>


export default InstitutionRow
