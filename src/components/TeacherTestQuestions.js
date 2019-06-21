import React,{Component} from 'react'
import '../css/App.css'
import { withRouter } from "react-router";

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Fade from '@material-ui/core/Fade';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import lightGreen from '@material-ui/core/colors/lightGreen';

import { Query } from "react-apollo"
import { TEST_QUESTION_STATS_QUERY } from '../ApolloQueries'

const styles = theme => ({
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
  },container: {
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
});

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

  state = {
    value:'worst'
  }

  handleChange = (event, newValue) => {
    this.setState({value:newValue});
  }


  render(){
    const { classes, id, test_id, history } = this.props
    const { value } = this.state

    return (
      <Query query={TEST_QUESTION_STATS_QUERY} variables={{ testId: id }}>
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'25vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div>{JSON.stringify(error)}</div>

              const { testQuestionStats } = data
              const withAnswers = testQuestionStats.filter(s => s.total>0)
              const bestQuestions = listSort1(withAnswers,'percentCorrect','desc').slice(0, 3)
              const worstQuestions = listSort1(withAnswers,'percentCorrect','asc').slice(0, 3)

          return (
            <Fade in={!loading}>
            <div style={{paddingTop:20,paddingBottom:20}}>
            <Card
              className={classes.card}>

            <CardActionArea>
            <CardContent onClick={()=>history.push({
              pathname: "/teacher_test_questions",
              state:
                { test_id: test_id }
              })}
            style={{ backgroundColor:lightGreen[100]}}>
            <Typography style={{color:lightGreen[800]}} variant="h5" component="h5">
              Question Performance
            </Typography>

            </CardContent >
              </CardActionArea>

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

            {bestQuestions.map(student =>
              <TableRow key={student.question}>
                <TableCell style={{fontSize:16}}  align="left">{student.question}</TableCell>
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

            {worstQuestions.map(student =>
              <TableRow key={student.question}>
                <TableCell style={{fontSize:16}}  align="left">{student.question}</TableCell>
                <TableCell style={{fontSize:16}} align="left">{student.total}</TableCell>
                <TableCell style={{fontSize:16}} align="left">{student.totalCorrect} ({Math.round(student.percentCorrect*100)}%)</TableCell>
              </TableRow>
            )}
            </TableBody>
          </Table>
        }
            </div>
            </CardContent >

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
