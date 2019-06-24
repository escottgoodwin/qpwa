import React,{Component} from 'react';
import '../css/App.css';

import { Query } from "react-apollo"
import {TEST_QUERY} from '../ApolloQueries'

import TestHeaderStudent from '../components/TestHeaderStudent'
import TestStats from '../components/TestStats'
import TestQuestionStats from '../components/TestQuestionStats'
import Error from './Error'
import Loading from './Loading'

class StudentTestPerformance extends Component {

  state = {
    courseId: '',
  }

  render() {
    const { test_id } = this.props.location.state

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

      <TestQuestionStats test_id={test_id} />

      </div>
    </div>
    </div>
    </div>

)
}
}

export default StudentTestPerformance
