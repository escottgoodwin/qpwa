import React from 'react'
import { withRouter } from "react-router";
import {Link} from 'react-router-dom'
import moment from 'moment'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

import { Query } from "react-apollo"
import { STUDENT_CHALLENGES } from '../ApolloQueries'

class StudentChallengeList extends React.Component {

  render() {

    const { testId, classes } = this.props
    const userId = sessionStorage.getItem('userid')

    return(
      <Query query={STUDENT_CHALLENGES} variables={{ testId, userId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'25vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div>{JSON.stringify(error)}</div>

              const { count, challenges } = data.challenges

          return (
            <Fade in={!loading}>
            <div>

            <Paper style={{padding:15}}>
            <div><h3>Your Challenges - {count}</h3></div>

            {challenges.map(item =>
              <div key={item.id}>
              <hr />
              <Link  to={{
              pathname: `/challenge`,
              state: { challengeId: item.id }
              }} >
              <div style={{marginBottom:5}}>{item.challenge} </div>
              </Link >

              <Typography className={classes} color="textSecondary" gutterBottom>
               {moment(item.addedDate).format('MMMM Do YYYY, h:mm a')}
              </Typography>

              </div>
            )}
            </Paper>
            </div>
            </Fade>


    )
  }}
  </Query>

    )
  }
}

export default withRouter(StudentChallengeList)
