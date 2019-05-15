import React,{Component} from 'react';
import '../css/App.css';
import { Grid } from 'semantic-ui-react'

import TestHeader from '../components/TestHeader'
import TestStats from '../components/TestStats'
import UserTestStats from '../components/UserTestStats'
import TestQuestionStats from '../components/TestQuestionStats'

class StudentPerformance extends Component {

  state = {
    courseId: '',
  }

  render() {
    const { test_id, course_id } = this.props.location.state

      return (

        <div className="main">

        <div className="container">

      <TestHeader testId={test_id} />

      <div className="coursecontainer">

      <Grid  stackable className="fill-content">

      <Grid.Row stretched>
      <Grid.Column width={16} >

      <TestStats test_id={test_id} />

      </Grid.Column  >

      </Grid.Row>

        <Grid.Row stretched>
        <Grid.Column width={8} >

        <UserTestStats test_id={test_id} course_id={course_id} />

        </Grid.Column  >

        <Grid.Column  width={8}>

         <TestQuestionStats test_id={test_id} />

      </Grid.Column  >

      </Grid.Row>
      </Grid>
      </div>
      </div>
    </div>


)
}
}

export default StudentPerformance ;
