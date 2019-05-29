import React from 'react'
import { withRouter } from "react-router";
import {Link} from 'react-router-dom'
import moment from 'moment'

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

import { Query } from "react-apollo"
import { STUDENT_CHALLENGES } from '../ApolloQueries'

class PhotoComponent extends React.Component {

  render() {

    const { testId, classes } = this.props
    const userId = sessionStorage.getItem('userid')

    return(

            <div>

            <Paper style={{padding:15}}>
            Photo
            </Paper>
            </div>


    )
  }
}

export default withRouter(PhotoComponent)
