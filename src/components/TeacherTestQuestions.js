import React,{Component} from 'react'
import '../css/App.css'
import { withRouter } from "react-router";

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Fade from '@material-ui/core/Fade';
import lightGreen from '@material-ui/core/colors/lightGreen';

import { Query } from "react-apollo"
import { TEST_STATS_PERFORMANCE_QUERY } from '../ApolloQueries'

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};


class TeacherTestQuestions extends Component {

  render(){
    const { classes, test_id, history } = this.props
    return (

      <Query query={TEST_STATS_PERFORMANCE_QUERY} variables={{ testId: test_id }}>
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'25vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div>{JSON.stringify(error)}</div>

              const stats = data.testStats

          return (
            <Fade in={!loading}>
            <div style={{paddingTop:20,paddingBottom:20}}>
            <Card onClick={()=>history.push({
              pathname: "/teacher_test_students",
              state:
                { test_id: test_id }
              })}
              className={classes.card}>

            <CardActionArea>
            <CardContent style={{ backgroundColor:lightGreen[100]}}>
            <Typography style={{color:lightGreen[800]}} variant="h5" component="h5">
              Question Performance
            </Typography>

            </CardContent >

            <Divider />

            <CardContent >

            <Grid container justify="center" spacing={24}>
            <Grid  item>

            Worse Performing Questions

            </Grid>

            <Grid item>

            Best Performing Questions

            </Grid>

            </Grid>
            </CardContent >
            </CardActionArea>
            </Card>
            </div>
            </Fade>
            )
          }}
          </Query>

    )
  }

}

export default withRouter(withStyles(styles)(TeacherTestQuestions))
