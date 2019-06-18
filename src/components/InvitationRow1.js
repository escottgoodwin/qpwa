import React,{Component} from 'react';
import '../css/App.css';

import {withRouter} from "react-router-dom"

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import blue from '@material-ui/core/colors/blue';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

class InvitationRow extends Component {

render() {
      const { classes, invite, history } = this.props

    return (


      <Card onClick={()=>history.push({
        pathname: "/join_course",
        state:
          { course_id: invite.course.id, inviteId: invite.id }
        })}
      className={classes.card}>

      <div className={classes.details}>
        <CardContent style={{height:'100%',padding:10, backgroundColor:blue[500],color:blue[100]}}>

          <PersonAddIcon />

        </CardContent>
      </div>

    <CardActionArea>
    <CardContent style={{width:'100%',padding:10, backgroundColor:blue[100],color:blue[700]}} >
    <div style={{fontSize:14}}>{invite.course.name} - {invite.course.courseNumber}</div>
    <div style={{fontSize:10}}>{invite.course.institution.name}</div>
    </CardContent>
    </CardActionArea>

    </Card>


    )
  }
}

export default withStyles(styles)(withRouter(InvitationRow))
