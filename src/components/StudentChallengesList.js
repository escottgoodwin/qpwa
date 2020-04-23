import React from 'react'
import { withRouter } from "react-router";
import moment from 'moment'

import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import orange from '@material-ui/core/colors/orange';

import { Query } from "react-apollo"
import { STUDENT_CHALLENGES } from '../ApolloQueries'

class StudentChallengeList extends React.Component {

  render() {

    const { testId, classes, history } = this.props
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

            <Card >
            <CardContent style={{backgroundColor:orange[500]}}>
            <center >
            <AnnouncementIcon style={{fontSize:36,color:orange[200]}}/>
            </center>
            </CardContent>
            <CardContent  style={{padding:25}}>
            <div><h3>Your Challenges - {count}</h3></div>
            </CardContent>
            </Card>

            {challenges.map(item =>

              <div key={item.id} style={{marginTop:10}} >

              <Card onClick={()=> history.push({
                pathname: "/challenge",
                state: { challengeId: item.id }
                })}
              >
              <CardActionArea>
              <CardContent>

              <div style={{marginBottom:5}}><h5>{item.challenge}</h5> </div>

              <Typography className={classes} color="textSecondary" gutterBottom>
               {moment(item.addedDate).format('MMMM Do YYYY, h:mm a')}
              </Typography>

              </CardContent>
              </CardActionArea>
              </Card>

              </div>
            )}

            </div>
            </Fade>


    )
  }}
  </Query>

    )
  }
}

export default withRouter(StudentChallengeList)
