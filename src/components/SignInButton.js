import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import * as Cookies from "js-cookie"
import Button from '@material-ui/core/Button';
import {withRouter} from "react-router-dom"
import { Mutation } from "react-apollo"

import {LOGOUT_MUTATION} from '../ApolloQueries'

class SignInButton extends Component {

  render() {

    const userid = Cookies.get('userid')
    const token = Cookies.get('auth_token')
    //const token = null
    return (

    token ?

      <Mutation
          mutation={LOGOUT_MUTATION}
          variables={{ userId:userid }}
          onCompleted={data => this._confirm(data)}
        >
          {mutation => (

             <Button variant="outlined"  color="inherit" onClick={mutation} >Logout</Button>
          )}
        </Mutation>

          :
          <Link to="/sign_in"> <Button variant="outlined"  color="inherit">Login</Button></Link>
        )

    }

    _confirm = (data) => {
      const { authMsg } = data.logout
      sessionStorage.removeItem('userid')
      sessionStorage.removeItem('auth_token')
      sessionStorage.removeItem('user')
      sessionStorage.setItem('online', false)

      Cookies.remove('userid')
      Cookies.remove('auth_token')
      Cookies.remove('user')

      this.props.history.push({
        pathname: `/sign_out`,
        state: { authMsg: authMsg }
        })
      }

  }

export default withRouter(SignInButton)
