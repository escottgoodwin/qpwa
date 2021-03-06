import React,{Component} from 'react'
import '../css/App.css'
import { withRouter } from "react-router";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import indigo from '@material-ui/core/colors/indigo';

import { Query } from "react-apollo"
import {USER_QUESTION_QUERY} from '../ApolloQueries'

class UserQuestionStats extends Component {

  render(){

    const { classes, testId } = this.props

    return (

      <Query query={USER_QUESTION_QUERY} variables={{ testId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'25vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

              const { totalQuestions, answers, totalCorrect, percentCorrect } = data.userQuestionStats

          return (

            <div style={{paddingTop:20,paddingBottom:20}}>

            <Card
              onClick={()=>this.props.history.push({
              pathname: `/user_questions`,
              state: { testId }
              })}
              className={classes.card} >


            <CardActionArea>
            <CardContent style={{ backgroundColor:indigo[100]}}>
            <Typography style={{color:indigo[800]}} variant="h5" component="h5">
              Your Questions
            </Typography>

            </CardContent >

            <Divider />

            <CardContent >
            <Grid container  >

            <Grid item xs={4}>
            <h5>
            Questions : {totalQuestions}
            </h5>
            </Grid>

            <Grid  item xs={4}>
            <h5>
            Answers: {answers}
            </h5>
            </Grid>

            <Grid item xs={4}>
            <h5>
            Correct: {totalCorrect} ({Math.round(percentCorrect*100)}%)
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

export default withRouter(UserQuestionStats)
