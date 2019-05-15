import React from 'react';
import '../css/App.css';

import TestRow from './TestRow2'

const TestList = (props) =>
  <div className="coursecontainer">
  {
    props.tests.map(test =>
    <TestRow key={test.id} courseId={props.courseId} test={test} />
    )}
  </div>

export default TestList
