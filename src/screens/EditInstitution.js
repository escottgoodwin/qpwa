import React,{Component} from 'react'
import '../css/App.css'
import EditInstitutionInput from '../components/EditInstitutionInput'
import InstitutionHeader from '../components/InstitutionHeader'

import Error from './Error'
import Loading from './Loading'

import { Query } from "react-apollo"

import {INSTITUTION_QUERY} from '../ApolloQueries'

class EditInstitution extends Component {

render() {

  const { institutionId }= this.props.location.state

  return (


    <div className="main">

      <div className="container">

      <InstitutionHeader institutionId={institutionId} />

      <Query query={INSTITUTION_QUERY} variables={{ institutionId: institutionId }} fetchPolicy="cache-and-network" >
            {({ loading, error, data }) => {
              if (loading) return <Loading />
              if (error) return <Error {...error}/>

          return (
            <>

            <EditInstitutionInput {...data.institution} />
            </>
          )
        }}
      </Query>

      </div>
      </div>
      )
    }

  }

export default EditInstitution
