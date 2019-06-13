import React,{Component} from 'react'
import '../css/App.css'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import TeacherTestHeader from '../components/TeacherTestHeader'
import PanelList from '../components/PanelList1'

import { Query } from "react-apollo"
import { USER_TEST_STATS_QUERY } from '../ApolloQueries'

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
    backgroundColor: theme.palette.primary.main,
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
});

function listSort1(array, key, direction){
    const dir = direction === 'desc' ? -1 : 1

    function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const genreA = a[key];
  const genreB = b[key];

  let comparison = 0;
  if (genreA > genreB) {
    comparison = 1;
  } else if (genreA < genreB) {
    comparison = -1;
  }
  return comparison * dir;
}

return array.sort(compare)

}

class TeacherTestPerfStudent extends Component {

  render() {

    const { test_id, courseId } = this.props.location.state
    const { classes } = this.props

      return (

        <main className={classes.main}>

        <div style={{marginBottom:50}}>

        <Query query={USER_TEST_STATS_QUERY} variables={{ testId: test_id, courseId }}>
              {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { userTestStats } = data

                const bestStudents = listSort1(userTestStats,'percentCorrect','desc')
                const worstStudents = listSort1(userTestStats,'percentCorrect','asc')

            return (

              <>
              <TeacherTestHeader classes={classes} test_id={test_id}/>

              <Paper>

              <div style={{padding:20}}>
              <h4 >Student Performance</h4>
              </div >
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

              {bestStudents.map(student =>
                <TableRow key={student.name}>
                  <TableCell style={{fontSize:16}}  align="left">{student.name}</TableCell>
                  <TableCell style={{fontSize:16}} align="left">{student.total}</TableCell>
                  <TableCell style={{fontSize:16}} align="left">{student.totalCorrect} ({Math.round(student.percentCorrect*100)}%)</TableCell>
                </TableRow>
              )}
              </TableBody>
            </Table>

            </Paper >
            </>

              )
            }}
        </Query>

        </div>

        </main>

    )
  }
  }

export default withStyles(styles)(TeacherTestPerfStudent)
