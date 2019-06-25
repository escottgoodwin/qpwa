import React from 'react'
import { withRouter } from "react-router";
import moment from 'moment'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Fade from '@material-ui/core/Fade';

import { Query } from "react-apollo"
import { CHALLENGE_QUESTION_QUERY } from '../ApolloQueries'

class StudentChallengeList extends React.Component {

  render() {
    const { questionId, classes, history } = this.props
    return(
      <Query query={CHALLENGE_QUESTION_QUERY} variables={{ questionId: questionId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'30vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div>{JSON.stringify(error)}</div>

              const challengesToRender = data.challenges.challenges
            
          return (
            <>
            {challengesToRender.length>0 &&
            <Fade in={!loading}>
            <>
            <div style={{marginTop:20}}>
            <Paper style={{padding:10}}>
            <div>
            <div><h5>Question Challenges </h5></div>
            {challengesToRender.map(item =>

              <div key={item.id} style={{padding:10,marginTop:10}} >
              <Card onClick={()=> history.push({
                pathname: "/challenge",
                state: { challengeId: item.id }
                })}
              >
              <CardActionArea>
              <CardContent>
              <h5>{item.challenge} </h5>

              <Typography className={classes} color="textSecondary" gutterBottom>
              {item.addedBy.firstName} {item.addedBy.lastName} {moment(item.addedDate).calendar()}
              </Typography>

              </CardContent>
              </CardActionArea>
              </Card>
              </div>
            )}
            </div>
            </Paper>
            </div>

            </>
            </Fade>
          }
          </>
    )
  }}
  </Query>

    )
  }
}

export default withRouter(StudentChallengeList)
