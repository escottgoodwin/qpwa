import React from 'react';
import '../css/App.css';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'

const styles = {
  card: {
    minWidth: 275,
    position: 'relative',
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
  media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
   },
  overlay: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'black',

   }
};

const StudentCourseRow1 = (props) =>

  <div style={{margin:15}}>
  <Card onClick={()=>props.history.push({
    pathname: "/student_course_dashboard",
    state:
      { course_id: props.id }
    })}
    className={props.classes.card} >

    <CardActionArea>

      <CardMedia
          height="140"
          src={props.image}
          component="img"
      />

      <CardContent>
        <Typography className={props.classes.title} color="textSecondary" gutterBottom>
          {props.time}
        </Typography>
        <Typography  variant="h4" component="h4">
            {props.name}
        </Typography>
        <Typography className={props.classes.pos} color="textSecondary">
            {props.institution.name}
        </Typography>
        <hr/>
        <Typography  variant="h6">
          Tests: {props.tests.length}
        </Typography>
        <hr/>
        <Typography  >
          Next Test:
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
    </div>


export default withRouter(withStyles(styles)(StudentCourseRow1))
