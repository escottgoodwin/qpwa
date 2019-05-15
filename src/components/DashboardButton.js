import React,{Component} from 'react';
import '../css/App.css';
//import { Button } from 'reactstrap';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'

class DashboardButton extends Component {

  navSwitch = (user) => {
    if (!!user) {
      switch (user.role) {
        case 'TEACHER':
          return <Link to="/teacher_dashboard"> <Button variant="outlined" color="inherit">Dashboard</Button></Link>
        case 'STUDENT':
        return <Link to="/student_dashboard"> <Button variant="outlined" color="inherit">Dashboard</Button></Link>
        case 'ADMIN':
          return <Link to="/admin_dashboard"> <Button variant="outlined" color="inherit">Dashboard</Button></Link>
        case 'QUANDRIA':
            return <Link to="/quandria_dashboard"> <Button variant="outlined" color="inherit">Dashboard</Button></Link>
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

export default DashboardButton
