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
import orange from '@material-ui/core/colors/orange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import lightGreen from '@material-ui/core/colors/lightGreen';

import Error from './Error'

import {TEST_STATS_PERFORMANCE_QUERY} from '../ApolloQueries'

class TestStats extends Component {

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
            <CardContent style={{ backgroundColor:lightGreen[100]}}>
            <Typography style={{color:lightGreen[800]}} variant="h5" component="h5">
              Test Peformance
            </Typography>

            </CardContent >

            <Divider />

            <CardContent >

            <Grid container justify="center" spacing={24}>
            <Grid  item>

            <Typography variant="h6" component="h6">
              Answers: {stats.total}
            </Typography>

            </Grid>

            <Grid item>

            <Typography variant="h6" component="h6">
            Correct: {stats.totalCorrect}
            </Typography>

            </Grid>
            <Grid key='Questions' item>

            <Typography variant="h6" component="h6">
            Correct: { stats.totalCorrect/stats.total >0 ? Math.round(stats.totalCorrect/stats.total*100) : 0 }%
            </Typography>

            </Grid>
            </Grid>
            </CardContent >
            </Card>
            </div>
            )
          }}
          </Query>

    )
  }

}

export default TestStats
