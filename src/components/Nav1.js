import React from 'react';
import '../css/App.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SignInButton from './SignInButton'
import DashboardButton from './DashboardButton'

import {Link} from 'react-router-dom'

class Nav1 extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
 const { auth, anchorEl } = this.state;
 const open = Boolean(anchorEl);
    return (

<div className={classes.root}>
      <AppBar position="fixed" >
        <Toolbar>
        <Link to="/sign_in"> <Button color="inherit"><DashboardButton /></Button></Link>

          <Typography variant="h6" color="inherit" className={classes.grow}>
            Quandrio
          </Typography>
          <SignInButton />
        </Toolbar>
      </AppBar>
    </div>

  )
}
}

  const styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

export default withStyles(styles)(Nav1)
