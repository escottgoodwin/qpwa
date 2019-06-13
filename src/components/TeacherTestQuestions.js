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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import lightGreen from '@material-ui/core/colors/lightGreen';

import { Query } from "react-apollo"
import { TEST_QUESTION_STATS_QUERY } from '../ApolloQueries'

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

function listSort1(array, key, direction){
    const dir = direction === 'desc' ? -1 : 1

    function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const genreA = a[key];
  const genreB = b[key];

  let comparison = 0;
  if (genreA >= genreB) {
    comparison = 1;
  } else if (genreA <= genreB) {
    comparison = -1;
  }
  return comparison * dir;
}

return array.sort(compare)

}


class TeacherTestQuestions extends Component {

  render(){
    const { classes, id, test_id, history } = this.props
    return (
      <Query query={TEST_QUESTION_STATS_QUERY} variables={{ testId: id }}>
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'25vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div>{JSON.stringify(error)}</div>

              const { testQuestionStats } = data

              const bestQuestions = listSort1(testQuestionStats,'percentCorrect','desc').slice(0, 3)
              const worstQuestions = listSort1(testQuestionStats,'percentCorrect','asc').slice(0, 3)
              console.log(bestQuestions)
              console.log(worstQuestions)

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
              Student Performance
            </Typography>

            </CardContent >

            <Divider />

            <CardContent >

            <h4> Worse Performing Questions</h4>
            <hr />
            <Table className={classes.table}>
              <TableHead>
                <TableRow>

                  <TableCell style={{fontSize:14}} align="left">Name</TableCell>
                  <TableCell style={{fontSize:14}} align="left">Total</TableCell>
                  <TableCell style={{fontSize:14}} align="left">Correct</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>

            {bestQuestions.map(student =>
              <TableRow key={student.id}>
                <TableCell style={{fontSize:16}}  align="left">{student.question}</TableCell>
                <TableCell style={{fontSize:16}} align="left">{student.total}</TableCell>
                <TableCell style={{fontSize:16}} align="left">{student.totalCorrect} ({Math.round(student.percentCorrect*100)}%)</TableCell>
              </TableRow>
            )}
            </TableBody>
          </Table>
          </CardContent >


            <CardContent >

            <h4>Best Performing Questions</h4>

            <hr />
            <Table className={classes.table}>
              <TableHead>
                <TableRow>

                  <TableCell style={{fontSize:14}} align="left">Name</TableCell>
                  <TableCell style={{fontSize:14}} align="left">Total</TableCell>
                  <TableCell style={{fontSize:14}} align="left">Correct</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>

            {worstQuestions.map(student =>
              <TableRow key={student.id}>
                <TableCell style={{fontSize:16}}  align="left">{student.question}</TableCell>
                <TableCell style={{fontSize:16}} align="left">{student.total}</TableCell>
                <TableCell style={{fontSize:16}} align="left">{student.totalCorrect} ({Math.round(student.percentCorrect*100)}%)</TableCell>
              </TableRow>
            )}
            </TableBody>
          </Table>


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
