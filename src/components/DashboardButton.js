import React,{Component} from 'react';
import '../css/App.css';
//import { Button } from 'reactstrap';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom'

class DashboardButton extends Component {

  navSwitch = (user) => {
    if (!!user) {
      switch (user.role) {
        case 'TEACHER':
          return <Button
                  onClick={()=>this.props.history.push('/teacher_dashboard')}
                  variant="outlined" color="inherit">
                  Dashboard
                  </Button>
        case 'STUDENT':
          return <Button
                  onClick={()=>this.props.history.push('/student_dashboard')}
                  variant="outlined" color="inherit">
                  Dashboard
                  </Button>
        case 'ADMIN':
          return <Button
                  onClick={()=>this.props.history.push('/admin_dashboard')}
                  variant="outlined" color="inherit">
                  Dashboard
                  </Button>
        case 'QUANDRIA':
          return <Button
                  onClick={()=>this.props.history.push('/quandria_dashboard')}
                  variant="outlined" color="inherit">
                  Dashboard
                  </Button>
        default:
          return <div></div>
      }
  } else {
    return <div></div>
  }
}

  render() {

    return (
      <>
      {this.navSwitch(JSON.parse(sessionStorage.getItem('user')))}
      </>
    )

}
}

export default withRouter(DashboardButton)
