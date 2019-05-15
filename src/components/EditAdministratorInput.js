import React,{Component} from 'react'
import '../css/App.css'
import {withRouter} from "react-router-dom"
import { Form, Input, Button, Message, Select } from 'semantic-ui-react'

import { Mutation } from "react-apollo"

import {EDIT_PERSONNEL_MUTATION} from '../ApolloQueries'

class EditAdministratorInput extends Component {

  state = {
    email: this.props.email,
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    title:this.props.title,
    department:this.props.department,
    address1:this.props.address1,
    address2: this.props.address2,
    city: this.props.city,
    state: this.props.state,
    zip: this.props.zip,
    phone: this.props.phone,
    role: this.props.role,
    graphQLError: '',
    isVisibleGraph:false,
    networkError:'',
    isVisibleNet:false,
  }

  render() {

    const { email, firstName,lastName, title, department, address1,    address2,    city,    state,  zip,    phone, role, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state

    const roleTypes = [{value:"ADMIN",text:"Administrator"},
                              {value:"TEACHER",text:"Teacher"}]

    return (

              <>
              <Form size="big">

              <Form.Group >

              <Form.Field required
                control={Input}
                label='First Name'
                value={firstName}
                onChange={e => this.setState({ firstName: e.target.value })}
                placeholder='First Name'
                width={8}
              />

              <Form.Field required
                control={Input}
                label='Last Name'
                value={lastName}
                onChange={e => this.setState({ lastName: e.target.value })}
                placeholder='Last Name'
                width={8}
              />

              </Form.Group >

              <Form.Group >

              <Form.Field
                control={Input}
                label='Title'
                value={title}
                onChange={e => this.setState({ title: e.target.value })}
                placeholder='Title'
                width={4}
              />

              <Form.Field
                control={Input}
                label='Department'
                value={department}
                onChange={e => this.setState({ department: e.target.value })}
                placeholder='Department'
                width={4}
              />



              <Form.Field
                id='phone'
                control={Input}
                label='Phone'
                value={phone}
                onChange={e => this.setState({ phone: e.target.value })}
                placeholder='Phone'
                width={4}
              />

              <Form.Field required
                id='roleType'
                control={Select}
                options={roleTypes}
                value={role}
                onChange={(event, {value}) => { this.setState({ role: value })}}
                label='Role'
                fluid
                selection
                placeholder='Role'
                width={4}
              />

              </Form.Group>

              <Form.Field
                id='address1'
                control={Input}
                label='Address 1'
                value={address1}
                onChange={e => this.setState({ address1: e.target.value })}
                placeholder='Address 1'
              />

              <Form.Field
                id='address2'
                control={Input}
                label='Address 2'
                value={address2}
                onChange={e => this.setState({ address2: e.target.value })}
                placeholder='Address 2'
              />

              <Form.Group>
              <Form.Field
                id='city'
                control={Input}
                label='City'
                value={city}
                onChange={e => this.setState({ city: e.target.value })}
                placeholder='City'
                width={8}
              />

              <Form.Field
                id='state'
                control={Input}
                label='State'
                value={state}
                onChange={e => this.setState({ state: e.target.value })}
                placeholder='State'
                width={4}
              />

              <Form.Field
                id='zip'
                control={Input}
                label='Zip'
                value={zip}
                onChange={e => this.setState({ zip: e.target.value })}
                placeholder='Zip'
                width={4}
              />
              </Form.Group>


                <Mutation
                    mutation={EDIT_PERSONNEL_MUTATION}
                    variables={{
                      userId: this.props.id,
                      email:email,
                      firstName: firstName,
                      lastName: lastName,
                      title: title,
                      department: department,
                      address1:address1,
                      address2: address2,
                      city: city,
                      state: state,
                      zip: zip,
                      phone: phone}}
                    onCompleted={data => this._confirm(data)}
                    onError={error => this._error (error)}
                  >
                    {mutation => (
                      <Button color='blue' onClick={mutation}>Submit</Button>
                    )}
                  </Mutation>


                </Form>

                {isVisibleGraph &&
                  <Message negative>
                    <p><b>{graphQLError}</b></p>
                  </Message>
                }

                {isVisibleNet &&
                  <Message negative>
                    <p><b>{networkError}</b></p>
                  </Message>
                }
                </>



    )
  }

  _error = async error => {

      const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
      this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

      error.networkError &&
        this.setState({ isVisibleNet: true, networkError: error.networkError.message})

  }

  _confirm = async data => {
    const { id } = this.props
    this.props.history.push({
      pathname: `/personnel_dashboard`,
      state: { userId: id,
      institutionId: this.props.institutionId  }
      })
  }
}


export default withRouter(EditAdministratorInput)
