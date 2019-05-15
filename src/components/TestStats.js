import React,{Component} from 'react'
import '../css/App.css'
import { Query } from "react-apollo"

import { Loader,Segment,Grid } from 'semantic-ui-react'

import Error from './Error'

import {TEST_STATS_PERFORMANCE_QUERY} from '../ApolloQueries'

class TestStats extends Component {

  render(){
    return (

      <Query query={TEST_STATS_PERFORMANCE_QUERY} variables={{ testId: this.props.test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loader />
              if (error) return <Error error={error} />

              const stats = data.testStats

          return (
            <Segment>

            <Grid columns={3} >

            <Grid.Row>

            <Grid.Column>
              <h5><b>Answers:</b> {stats.total}</h5>
            </Grid.Column>

            <Grid.Column>
              <h5><b>Correct:</b> {stats.totalCorrect}  </h5>
            </Grid.Column>

            <Grid.Column>
              <h5><b>Percent Correct:</b> { stats.totalCorrect/stats.total >0 ? Math.round(stats.totalCorrect/stats.total*100) : 0 }% </h5>
            </Grid.Column>

            </Grid.Row>

            </Grid>

            </Segment>
            )
          }}
          </Query>

    )
  }

}

export default TestStats
