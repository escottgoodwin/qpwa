import React,{Component} from 'react'
import '../css/App.css'
import { Form, Input, Button, Select, Message } from 'semantic-ui-react'
import {withRouter} from "react-router-dom"

import { Mutation } from "react-apollo"

import {EDIT_INSTITUTION_MUTATION,INSTITUTION_QUERY} from '../ApolloQueries'

class EditInstitutionInput extends Component {

  state = {
        name:this.props.name,
        address1:this.props.address1,
        address2: this.props.address2,
        city: this.props.city,
        state: this.props.state,
        zip: this.props.zip,
        phone: this.props.phone,
        email: this.props.email,
        type: this.props.type,
        graphQLError: false,
        isVisibleGraph:false,
        networkError:false,
        isVisibleNet:false,
      }

render() {

  const { name, type, address1,    address2,    city,    state,  zip,    phone,  email, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state

  const institutionTypes = [{value:"University",text:"University"},
                            {value:"Community College",text:"Community College"},
                            {value:"High School",text:"High School"},
                            {value:"Junior High School",text:"Junior High School"},
                            {value:"Language School",text:"Language School"},
                            {value:"Vocational School",text:"Vocational School"},
                            {value:"Business",text:"Business"},]


  return (


      <div style={{marginRight:'250px',marginLeft:'250px'}} >

      <h2 style={{padding:'25px'}}>Edit Institution</h2>

      <Form size="big">

      <Form.Field required
        id='name'
        control={Input}
        label='Institution Name'
        value={name}
        onChange={e => this.setState({ name: e.target.value })}
        placeholder='Institution Name'
      />

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

      <Form.Group>
      <Form.Field
        id='phone'
        control={Input}
        label='Phone'
        value={phone}
        onChange={e => this.setState({ phone: e.target.value })}
        placeholder='Phone'
        width={6}
      />

      <Form.Field
        id='email'
        control={Input}
        label='Email'
        value={email}
        onChange={e => this.setState({ email: e.target.value })}
        placeholder='Email'
        width={10}
      />

      </Form.Group>

      <Form.Field required
        id='institutionType'
        control={Select}
        options={institutionTypes}
        value={type}
        onChange={(event, {value}) => { this.setState({ type: value })}}
        label='Institution Type'
        fluid
        selection
        placeholder='Select Institution Type'
      />

      </ Form>

        <Mutation
            mutation={EDIT_INSTITUTION_MUTATION}
            variables={{
              id:this.props.id,
              name: name,
              type:type,
              address1:address1,
              address2: address2,
              city: city,
              state: state,
              zip: zip,
              phone: phone,
              email: email,
            }}
            onError={error => this._error (error)}
            onCompleted={data => this._confirm(data)}
            refetchQueries={() => { return [{
                query: INSTITUTION_QUERY
                }]
              }}
            >
            {mutation => (
              <div style={{padding:'15px'}}>
              <Button color='blue' onClick={mutation}>Submit</Button>
              </div>
            )}
          </Mutation>

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

          </div>
      )
    }

    _error = async error => {

        const gerrorMessage = error.graphQLErrors.map((err,i) => err.message)
        this.setState({ isVisibleGraph: true, graphQLError: gerrorMessage})

        error.networkError &&
          this.setState({ isVisibleNet: true, networkError: error.networkError.message})

    }

    _confirm = async data => {

      this.props.history.push({
        pathname: `/institution_dashboard`,
        state: { institutionId: this.props.id  }
        })
    }

  }

export default withRouter(EditInstitutionInput)
