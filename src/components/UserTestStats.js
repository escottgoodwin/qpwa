import React,{Component} from 'react';
import '../css/App.css';
import { Query } from "react-apollo";
import { Loader } from 'semantic-ui-react'

import Error from './Error'
import TestPerformanceAll from '../components/TestPerformanceAll'

import {USER_TEST_STATS_QUERY} from '../ApolloQueries'

const uuidv4 = require('uuid/v4');

class UserTestStats extends Component {

  render(){
    const { test_id, course_id } = this.props
    return (

      <Query query={USER_TEST_STATS_QUERY} variables={{ testId: test_id, courseId: course_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loader />
              if (error) return <Error error={error} />

              const stats = []
              data.userTestStats.forEach(function(element) {
              const id = uuidv4()
                const item =  {
                  id: id,
                  name: element.name,
                  total: element.total,
                  totalCorrect: element.totalCorrect,
                  percentCorrect: element.percentCorrect
                }
                stats.push(item)
              });

          return (

          <TestPerformanceAll testId={test_id} stats={stats}  />
          )
        }}
      </Query>

    )
  }

}

export default UserTestStats
