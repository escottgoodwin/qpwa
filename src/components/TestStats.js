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
import Fade from '@material-ui/core/Fade';
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
              if (loading) return <div style={{height:'25vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div>{JSON.stringify(error)}</div>

              const stats = data.testStats

          return (
            <Fade in={!loading}>
            <div style={{paddingTop:20,paddingBottom:20}}>
            <Card className={classes.card}>
            <CardContent style={{ backgroundColor:lightGreen[100]}}>
            <Typography style={{color:lightGreen[800]}} variant="h5" component="h5">
              Test
            </Typography>

            </CardContent >

            <Divider />

            <CardContent >

            <Grid container justify="center" spacing={24}>
            <Grid  item>

            <h5>
              Answers: {stats.total}
            </h5>

            </Grid>

            <Grid item>

            <h5>
            Correct: {stats.totalCorrect}
            </h5>

            </Grid>
            <Grid key='Questions' item>

            <h5>
            Correct: { stats.totalCorrect/stats.total >0 ? Math.round(stats.totalCorrect/stats.total*100) : 0 }%
            </h5>

            </Grid>
            </Grid>
            </CardContent >
            </Card>
            </div>
            </Fade>
            )
          }}
          </Query>

    )
  }

}

export default TestStats
