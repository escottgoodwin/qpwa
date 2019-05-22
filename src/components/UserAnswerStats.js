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
              if (loading) return <div>Loading...</div>
              if (error) return <div> {JSON.stringify(error)} </div>

              const { total, totalCorrect, percentCorrect } = data.userAnsweredStats

          return (

            <div style={{paddingTop:20,paddingBottom:20}}>
            <Card className={classes.card}>
            <CardContent style={{ backgroundColor:deepPurple[100]}}>
            <Typography style={{color:deepPurple[800]}} variant="h5" component="h5">
              Your Answers
            </Typography>

            </CardContent >

            <Divider />

            <CardContent >

            <Typography variant="h6" component="h6">
            Questions Total: {total}
            </Typography>
            <Typography variant="h6" component="h6">
            Correct: {totalCorrect}
            </Typography>
            <Typography variant="h6" component="h6">
            Percent: {Math.round(percentCorrect*100)}%
            </Typography>

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
