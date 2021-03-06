import React,{Component} from 'react'
import '../css/App.css'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fade from '@material-ui/core/Fade';
import lightGreen from '@material-ui/core/colors/lightGreen';

import { Query } from "react-apollo"
import { TEST_STATS_PERFORMANCE_QUERY } from '../ApolloQueries'

class TestStats extends Component {

  render(){
    const { classes, test_id } = this.props
    return (

      <Query query={TEST_STATS_PERFORMANCE_QUERY} variables={{ testId: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'25vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div>{JSON.stringify(error)}</div>

              const { totalQuestions, totalAnswers, totalCorrect, percentCorrect } = data.testStats1

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

            <Grid container justify="center" >

            <Grid  xs={4} item>

            <h5>
              Questions: {totalQuestions}
            </h5>

            </Grid>


            <Grid  xs={4} item>

            <h5>
              Answers: {totalAnswers}
            </h5>

            </Grid>

            <Grid xs={4} item>

            <h5>
            Correct: {totalCorrect} ({ Math.round(percentCorrect*100) }%)
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
