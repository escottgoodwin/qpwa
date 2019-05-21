import React from 'react'
import { withRouter } from "react-router";
import {Link} from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Query } from "react-apollo"
import {CHALLENGE_QUESTION_QUERY} from '../ApolloQueries'

import Paper from '@material-ui/core/Paper';

const moment = require('moment')

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    //backgroundColor: theme.palette.primary.main,

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    minWidth: 275,
    position: 'relative',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,

  },
});

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
              <>
              <hr />
              <div >{item.challenge} </div>

              <Typography className={classes} color="textSecondary" gutterBottom>
              <div >{item.addedBy.firstName} {item.addedBy.lastName} {moment(item.addedDate).calendar()}</div >
              </Typography>
                <Link  to={{
                pathname: `/challenge`,
                state: { challengeId: item.id }
                }} >
                more
              </Link >
              </>
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
