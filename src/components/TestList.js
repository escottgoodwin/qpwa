import React from 'react';
import '../css/App.css';

import TestRow1 from './TestRow1'

const TestList = (props) =>
  <div className="coursecontainer">
  {
    props.tests.map(test =>
    <TestRow1 key={test.id} courseId={props.courseId} test={test} />
    )}
  </div>

export default TestList
