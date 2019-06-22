import React,{Component} from 'react'
import '../css/App.css'
import { withRouter } from "react-router";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import brown from '@material-ui/core/colors/brown';

import { Query } from "react-apollo"
import { USER_ANSWERED_QUERY } from '../ApolloQueries'

class UserAnswerStats extends Component {

  render(){
    const { classes, testId } = this.props
    return (

      <Query query={USER_ANSWERED_QUERY} variables={{ testId }} fetchPolicy="cache-and-network">
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
            <CardContent style={{ backgroundColor:brown[100]}}>
            <Typography style={{color:brown[800]}} variant="h5" component="h5">
              Your Answers
            </Typography>

            </CardContent >

            <Divider />

            <CardContent >

            <Grid container justify="center" >

            <Grid item xs={6}>
            <h5>
            Questions Answered: {total}
            </h5>
            </Grid>

            <Grid item xs={6}>
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

export default withRouter(UserAnswerStats)
