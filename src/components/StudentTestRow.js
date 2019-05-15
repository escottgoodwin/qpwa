import React from 'react';
import '../css/App.css';

import { Card, Grid  } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
var dateFormat = require('dateformat');

const StudentTestRow = (props) =>

<Card fluid>
  <Card.Content>

  <Grid padded textAlign='left' columns={4}>
  <Grid.Row>

  <Grid.Column width={5}>

    <Link  to={{
      pathname: "/student_test_dashboard",
      state:
        { test_id: props.test.id }
      }} >

  <h5>{props.test.testNumber} - {props.test.subject} </h5>

  </Link>
  </Grid.Column>

  <Grid.Column width={5}>
  <h5>{ dateFormat(props.test.testDate, "dddd, mmmm dS, yyyy") }</h5>
  </Grid.Column>

  <Grid.Column width={3}>

<h5>
Questions: {props.test.questions.length}
</h5>

</Grid.Column>

<Grid.Column width={3}>

<h5>Panels: <Link  to={{
  pathname: "/student_test_panels",
  state:
    {
      test_id: props.test.id }
  }} > { props.test.panels.length } </Link>
</h5>

</Grid.Column>

</Grid.Row>

</Grid>

</Card.Content>
</Card>

export default StudentTestRow
