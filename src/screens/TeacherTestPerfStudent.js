import React,{Component} from 'react'
import '../css/App.css'

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fade from '@material-ui/core/Fade';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import lightGreen from '@material-ui/core/colors/lightGreen';

import TeacherTestHeader from '../components/TeacherTestHeader'

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

class TeacherTestPerfStudent extends Component {

  state = {
    value:'worst'
  }

  handleChange = (event, newValue) => {
    this.setState({value:newValue});
  }

  render() {

    const { test_id, courseId } = this.props.location.state
    const { classes } = this.props
    const { value } = this.state

      return (

        <main className={classes.main}>

        <div style={{marginBottom:50}}>

        <Query query={USER_TEST_STATS_QUERY} variables={{ testId: test_id, courseId }}>
              {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { userTestStats } = data
                const withAnswers = userTestStats.filter(s => s.total>0)

                const slice = withAnswers.length+1
                const newSortAsc = withAnswers.sort((a, b) => (a.percentCorrect > b.percentCorrect) ? 1 : (a.percentCorrect === b.percentCorrect) ? ((a.total > b.total) ? 1 : -1) : -1 ).slice(0,slice)
                const newSortDesc = withAnswers.sort((a, b) => (a.percentCorrect < b.percentCorrect) ? 1 : (a.percentCorrect === b.percentCorrect) ? ((a.total > b.total) ? 1 : -1) : -1 ).slice(0,slice)

            return (
              <Fade in={!loading}>
              <>
              <TeacherTestHeader classes={classes} test_id={test_id}/>

              <Card
                className={classes.card}>

              <CardContent
              style={{ backgroundColor:lightGreen[100]}}>
              <Typography style={{color:lightGreen[800]}} variant="h5" component="h5">
                Student Performance
              </Typography>

              </CardContent >

              <CardContent >
              <div className={classes.root}>
                  <Tabs
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  value={value}
                  onChange={this.handleChange}
                  >
                    <Tab value="worst" label="Worst Performance" />
                    <Tab value="best" label="Best Performance" />

                  </Tabs>

                {value === "worst" &&

                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>

                        <TableCell style={{fontSize:14}} align="left">Name</TableCell>
                        <TableCell style={{fontSize:14}} align="left">Total</TableCell>
                        <TableCell style={{fontSize:14}} align="left">Correct</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>

                  {newSortAsc.map(student =>
                    <TableRow key={student.id}>
                      <TableCell style={{fontSize:16}}  align="left">{student.name}</TableCell>
                      <TableCell style={{fontSize:16}} align="left">{student.total}</TableCell>
                      <TableCell style={{fontSize:16}} align="left">{student.totalCorrect} ({Math.round(student.percentCorrect*100)}%)</TableCell>
                    </TableRow>
                  )}
                  </TableBody>
                </Table>

              }

                {value === "best" &&

                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>

                        <TableCell style={{fontSize:14}} align="left">Name</TableCell>
                        <TableCell style={{fontSize:14}} align="left">Total</TableCell>
                        <TableCell style={{fontSize:14}} align="left">Correct</TableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>

                  {newSortDesc.map(student =>
                    <TableRow key={student.id}>
                      <TableCell style={{fontSize:16}}  align="left">{student.name}</TableCell>
                      <TableCell style={{fontSize:16}} align="left">{student.total}</TableCell>
                      <TableCell style={{fontSize:16}} align="left">{student.totalCorrect} ({Math.round(student.percentCorrect*100)}%)</TableCell>
                    </TableRow>
                  )}
                  </TableBody>
                </Table>

                }

              </div>
              </CardContent >
              </Card >
            </>
            </Fade>
              )
            }}
        </Query>

        </div>

        </main>

    )
  }
  }

export default withStyles(styles)(TeacherTestPerfStudent)
