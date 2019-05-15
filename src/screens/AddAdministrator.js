import React,{Component} from 'react'
import '../css/App.css'
import { Form, Input, Button, Message } from 'semantic-ui-react'
import InstitutionHeader from '../components/InstitutionHeader'
import Loading from './Loading'
import { Query, Mutation } from "react-apollo"
import Error from './Error'

import {INSTITUTION_QUERY, SIGNUP_ADMIN_MUTATION} from '../ApolloQueries'

class AddAdministrator extends Component {

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    title:'',
    department:'',
    address1:'',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    graphQLError: '',
    isVisibleGraph:false,
    networkError:false,
    isVisibleNet:false,
  }

  render() {

    const { institutionId }= this.props.location.state
    const { email, password,firstName,lastName, title, department, address1,    address2,    city,    state,  zip,    phone, graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state

    return (

      <div className="main">

      <InstitutionHeader institutionId={institutionId} />

    <Query query={INSTITUTION_QUERY} variables={{ institutionId: institutionId }} fetchPolicy="cache-and-network" >
          {({ loading, error, data }) => {
            if (loading) return <Loading />
            if (error) return <Error {...error}/>

            const {id } = data.institution

        return (

              <div style={{marginRight:'250px',marginTop:'25px',marginLeft:'250px'}} >

              <h2>Add Administrator</h2>

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
                width={6}
              />

              <Form.Field
                control={Input}
                label='Department'
                value={department}
                onChange={e => this.setState({ department: e.target.value })}
                placeholder='Department'
                width={6}
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
                    mutation={SIGNUP_ADMIN_MUTATION}
                    variables={{ email:email,
                      password:password,
                      firstName: firstName,
                      lastName: lastName,
                      title: title,
                      department: department,
                      address1:address1,
                      address2: address2,
                      city: city,
                      state: state,
                      zip: zip,
                      phone: phone,
                      role: 'ADMIN',
                      institutionId:id }}
                    onCompleted={data => this._confirm(data)}
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

                  </div>


        )
      }}
    </Query>
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
    const { institutionId }= this.props.location.state
    this.props.history.push({
      pathname: `/institution_dashboard`,
      state: { institutionId: institutionId  }
      })
  }
}


export default AddAdministrator
