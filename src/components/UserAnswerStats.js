import React,{Component} from 'react'
import '../css/App.css'
import { Query } from "react-apollo"
import { withRouter } from "react-router";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import orange from '@material-ui/core/colors/orange';

import Error from './Error'

import {USER_ANSWERED_QUERY} from '../ApolloQueries'

class UserAnswerStats extends Component {

  render(){
    const { classes, testId } = this.props
    return (

      <Query query={USER_ANSWERED_QUERY} variables={{ testId: this.props.testId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'25vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

              const { total, totalCorrect, percentCorrect } = data.userAnsweredStats

          return (


            <div style={{paddingTop:20,paddingBottom:20}}>
            <Card
              onClick={()=>this.props.history.push({
              pathname: `/user_answers`,
              state: { testId }
              })}
              className={classes.card} >

            <CardActionArea>
            <CardContent style={{ backgroundColor:deepPurple[100]}}>
            <Typography style={{color:deepPurple[800]}} variant="h5" component="h5">
              Your Answers
            </Typography>

            </CardContent >

            <Divider />

            <CardContent >

            <Grid container justify="center" spacing={24}>

            <Grid  item>
            <h5>
            Questions Total: {total}
            </h5>
            </Grid>

            <Grid  item>
            <h5>
            Correct: {totalCorrect}
            </h5>
            </Grid>

            <Grid  item>
            <h5>
            Percent: {Math.round(percentCorrect*100)}%
            </h5>
            </Grid>
            </Grid>

            </CardContent >
            </CardActionArea>
            </Card>
            </div>

      )
    }}
    </Query>

    )
  }

}

export default withRouter(UserAnswerStats)
