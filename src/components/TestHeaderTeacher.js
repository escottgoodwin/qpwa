import React,{Component} from 'react';
import {withRouter} from "react-router-dom"
import moment from 'moment'
import '../css/App.css';

import { withStyles } from '@material-ui/core/styles';
import { Microscope } from 'mdi-material-ui'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import BookIcon from '@material-ui/icons/Book';

import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';

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

class TestHeaderTeacher  extends Component {

  render() {

    const { classes, subject, testNumber, course, testDate, testType, id, history } = this.props

    return (
      <>
  <div style={{paddingTop:20,paddingBottom:20}}>

    <Card style={{backgroundColor:'#334667',color:'#e4f1fe',marginBottom:5}}
    onClick={()=> history.push({
      pathname: "/course_dashboard",
      state:
        { course_id: course.id }
      })}
      className={classes.card}>
    <CardActionArea>

    <CardContent>
    <div style={{padding:'15px'}}>
    <h4>{course.name} - {course.courseNumber}</h4>
    </div>
    </CardContent>
    </CardActionArea>
    </Card>

    </div>

    <div style={{paddingTop:20,paddingBottom:20}}>

    <Card onClick={()=> history.push({
      pathname: "/test_dashboard",
      state:
        { test_id: id }
      })}
      className={classes.card}>

    <CardActionArea>

    {testType==="CLASS" &&
    <CardContent style={{ backgroundColor:cyan[100]}}>
    <BookIcon style={{ color:cyan[700]}} /> <h5 style={{color:cyan[700]}}>
    Lecture
    </h5>
    </CardContent>
    }

    {testType==="LAB" &&
    <CardContent style={{ backgroundColor:teal[100]}}>
    <Microscope style={{color:teal[700]}}/><h5 style={{color:teal[700]}}>
    Lab
    </h5>
    </CardContent>
    }

  <CardContent >
    <h5>
    {testNumber}
    </h5>

        <h2>
        {subject}
        </h2>

        <h6 style={{color:'gray'}}>
          { moment(testDate).format('MMMM Do YYYY, h:mm a') }
        </h6>

  </CardContent>

  </CardActionArea>

  </Card >

  </div>
  </>
)
}

}

export default withStyles(styles)(withRouter(TestHeaderTeacher))
