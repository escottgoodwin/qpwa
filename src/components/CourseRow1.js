import React from 'react';
import '../css/App.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom'

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

const CourseRow1 = props => {

  const { classes, history, id, image, time, name, institution, tests, students } = props

    return(
    <div style={{margin:15}}>

    <Card onClick={()=>history.push({
      pathname: "/course_dashboard",
      state:
        { course_id: id }
      })}
      className={classes.card} >

      <CardActionArea>

          <CardMedia
              height="140"
              src={image}
              component="img"
          />

          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {time}
            </Typography>
            <h3>
                {name}
            </h3>
            <Typography className={classes.pos} color="textSecondary">
                {institution.name}
            </Typography>
            <hr/>

            <Grid container>
            <Grid item xs={6}>
            <h5>
              Tests: {tests.filter(test => !test.deleted).length}
            </h5>
            </Grid>

            <Grid item xs={6}>
            <Typography  variant="h6">
               Students: {students.length}
            </Typography>
            </Grid>
            </Grid>

          </CardContent>
          </CardActionArea>
        </Card>
        </div>
    )
}


export default withStyles(styles)(withRouter(CourseRow1))
