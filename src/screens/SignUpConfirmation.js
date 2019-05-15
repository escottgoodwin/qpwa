import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import {withRouter} from "react-router-dom"
import axios from 'axios'
import '../css/App.css'

import {CONFIRMATION_MUTATION} from '../ApolloQueries'

const divStyle = {
  padding: '20px',
};


class SignOut extends Component {

    state = {
      authMsg:''
    }

    confirmEmail = (email,token) => {
      const that = this;

       axios({
          url: process.env.REACT_APP_GRAPHQL_SERVER,
          method: 'post',
          data: {
            query: CONFIRMATION_MUTATION,
              variables: {email: email, confirmationToken: token}
            }
        })
        .then(result => {
            let grapqhql_resp = result.request.response
            let gresp = JSON.parse(grapqhql_resp)
            let authMsg = gresp.data.confirmEmail.authMsg
            that.setState({authMsg})
      })
      .catch(error =>
        this.setState({
        authMsg: 'There has been an error with your confirmation. Please try again.'
      }))
    }

    componentDidMount() {
      const { email, token } = this.props.match.params
      this.confirmEmail(email, token)
    }

    render() {

      return (
        <div className="main">
        <div className="dashboard">
        <div className="signin">
        <div style={divStyle}>
        <h3>Email Confirmation</h3>
        </div>
        <div style={divStyle}>
            <h4 >{this.state.authMsg}</h4>
        </div>
        <div style={divStyle}>
        <h4 ><Link to="/sign_in"><Button color='blue'>Sign In</Button></Link></h4>
        </div>
        </div>
        </div>
        </div>

    )
  }

  }


export default withRouter(SignOut) ;
