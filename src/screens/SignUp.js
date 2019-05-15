import React,{Component} from 'react';
import '../css/App.css';
import { Form, Input, Button } from 'semantic-ui-react'
import { Mutation } from "react-apollo";


import {SIGNUP_MUTATION} from '../ApolloQueries'


class SignUp extends Component {
    state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }

    render() {
      const { email, password,firstName,lastName } = this.state

      return (
        <div className="main">
      <div className="dashboard">
      <div className="signin">

      <h2>Sign Up</h2>

      <Form size="big">

      <Form.Field
        control={Input}
        label='First Name'
        value={firstName}
        onChange={e => this.setState({ firstName: e.target.value })}
        placeholder='First Name'
      />

      <Form.Field
        control={Input}
        label='Last Name'
        value={lastName}
        onChange={e => this.setState({ lastName: e.target.value })}
        placeholder='Last Name'
      />

      <Form.Field
        control={Input}
        label='Email'
        value={email}
        onChange={e => this.setState({ email: e.target.value })}
        placeholder='Login email'
      />

      <Form.Field
        control={Input}
        label='Password'
        value={password}
        type='password'
        onChange={e => this.setState({ password: e.target.value })}
        placeholder='Login password'
      />

        <Mutation
            mutation={SIGNUP_MUTATION}
            variables={{ email:email, password:password, firstName: firstName, lastName: lastName, role: 'STUDENT' }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <Button color='blue' onClick={mutation}>Submit</Button>
            )}
          </Mutation>


        </Form>
      </div>
      </div>
        </div>

  )
}

  _confirm = async data => {
    const { authMsg } = data.signup
    this.props.history.push({
      pathname: `/signed_up`,
      state: { authMsg: authMsg }
      })
    }

}

export default SignUp;
