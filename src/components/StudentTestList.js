import React from 'react';
import '../css/App.css';

import StudentTestRow from './StudentTestRow'

const StudentTestList = (props) =>
  <div className="coursecontainer">
  {
    props.tests.map(test =>
    <StudentTestRow key={test.id} courseId={props.courseId} test={test} />
    )}
  </div>

export default StudentTestList
