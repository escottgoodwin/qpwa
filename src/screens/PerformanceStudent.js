import React,{Component} from 'react';
import '../css/App.css';
import { Grid } from 'semantic-ui-react'

import { Query } from "react-apollo"
import {TEST_QUERY} from '../ApolloQueries'

import TestHeaderStudent from '../components/TestHeaderStudent'
import TestStats from '../components/TestStats'
import UserTestStats from '../components/UserTestStats'
import TestQuestionStats from '../components/TestQuestionStats'
import StudentPerformanceLoading from './StudentPerformanceLoading'
import Error from './Error'
import Loading from './Loading'


class PerformanceStudent extends Component {

  state = {
    courseId: '',
  }

  render() {
    const { test_id, course_id } = this.props.location.state

      return (

        <div className="main">

        <div className="container">

      <Query query={TEST_QUERY} variables={{ test_id: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error error={error} />

              const testToRender = data.test

          return (

      <TestHeaderStudent  {...testToRender} />

      )
    }
  }
    </Query>

      <div className="coursecontainer">

      <TestStats test_id={test_id} />

      <div className="coursecontainer">
      <Grid columns={2} stackable className="fill-content">
        <Grid.Row stretched>
        <Grid.Column  >

        <UserTestStats test_id={test_id} course_id={course_id} />

        </Grid.Column  >

        <Grid.Column  >

        <TestQuestionStats test_id={test_id} />

      </Grid.Column  >

      </Grid.Row>
      </Grid>

      </div>
    </div>
    </div>
    </div>

)
}
}

export default PerformanceStudent ;
