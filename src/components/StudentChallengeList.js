import React from 'react'
import { withRouter } from "react-router";
import {Link} from 'react-router-dom'
import moment from 'moment'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { Query } from "react-apollo"
import { CHALLENGE_QUESTION_QUERY } from '../ApolloQueries'

class StudentChallengeList extends React.Component {

  render() {
    const { questionId, classes } = this.props
    return(
      <Query query={CHALLENGE_QUESTION_QUERY} variables={{ questionId: questionId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>
              if (error) return <div>{JSON.stringify(error)}</div>

              const challengesToRender = data.challenges.challenges

          return (

            <Paper style={{padding:10}}>
            <div>
            <div><h5>Question Challenges </h5></div>
            {challengesToRender.map(item =>
              <div key={item.id}>
              <hr />
              <div >{item.challenge} </div>

              <Typography className={classes} color="textSecondary" gutterBottom>
              {item.addedBy.firstName} {item.addedBy.lastName} {moment(item.addedDate).calendar()}
              </Typography>
                <Link  to={{
                pathname: `/challenge`,
                state: { challengeId: item.id }
                }} >
                more
              </Link >
              </div>
            )}
            </div>
            </Paper>


    )
  }}
  </Query>

    )
  }
}

export default withRouter(StudentChallengeList)
