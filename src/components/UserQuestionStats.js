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
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import orange from '@material-ui/core/colors/orange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import lightGreen from '@material-ui/core/colors/lightGreen';

import Error from './Error'

import {USER_QUESTION_QUERY} from '../ApolloQueries'

class UserQuestionStats extends Component {

  render(){

    const { classes, testId } = this.props

    return (

      <Query query={USER_QUESTION_QUERY} variables={{ testId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>
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

            <Typography variant="h6" component="h6">
            Total Questions : {totalQuestions}
            </Typography>
            <Typography variant="h6" component="h6">
            Total Answers: {answers}
            </Typography>
            <Typography variant="h6" component="h6">
            Answers Correct: {totalCorrect}
            </Typography>

            <Typography variant="h6" component="h6">
            Percent: {Math.round(percentCorrect*100)}%
            </Typography>

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
