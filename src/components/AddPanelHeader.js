import React from 'react';
import '../css/App.css';
import {Link } from 'react-router-dom'

const AddPanelHeader = (props) =>

    <div>

    <div style={{display:'inline-block',padding:5}}>
      <Link  to={{
        pathname: "/course_dashboard",
        state:
          { course_id: props.location.state.course_id }
        }} >
          <h3>{props.course.name}</h3>
        </Link>
        <h5>{props.course.time}</h5>
     </div>

    </div>

export default AddPanelHeader
