import React from 'react';
import '../css/App.css';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import SignInButton from './SignInButton'
import DashboardButton from './DashboardButton'

class Nav1 extends React.Component {
  
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

    return (

<div className={classes.root}>
      <AppBar position="fixed" >
        <Toolbar>
        <DashboardButton />
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
