import React,{Component} from 'react'
import '../css/App.css'
import { Query } from "react-apollo"

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Error from './Error'

import {TEST_STATS_PERFORMANCE_QUERY} from '../ApolloQueries'

class UserAnswerStats extends Component {

  render(){
    const { classes, test_id } = this.props
    return (

      <Query query={TEST_STATS_PERFORMANCE_QUERY} variables={{ testId: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading</div>
              if (error) return <div>{JSON.stringify(error)}</div>

              const stats = data.testStats

          return (
            <div style={{paddingTop:20,paddingBottom:20}}>
            <Card className={classes.card}>
            <CardContent >
            <Typography variant="h5" component="h5">
              Your Answers
            </Typography>

            </CardContent >

            <Divider />

            <CardContent >

            Answer Stats
            </CardContent >
            </Card>
            </div>
            )
          }}
          </Query>

    )
  }

}

export default UserAnswerStats
