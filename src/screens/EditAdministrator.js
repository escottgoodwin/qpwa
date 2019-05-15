import React,{Component} from 'react'
import '../css/App.css'
import InstitutionHeader from '../components/InstitutionHeader'
import EditAdministratorInput from '../components/EditAdministratorInput'


import { Query } from "react-apollo"
import Error from './Error'
import Loading from './Loading'

import { PERSONNEL_QUERY } from '../ApolloQueries'

class EditAdministrator extends Component {

  render() {

    const { institutionId, userId, personnelType  }= this.props.location.state

    return (
      <div className="main">
      <InstitutionHeader institutionId={institutionId} />

        <Query query={PERSONNEL_QUERY} variables={{ userId: userId }} fetchPolicy="cache-and-network" >
              {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <Error {...error}/>

            return (

              <div style={{marginRight:'250px',marginTop:'25px',marginLeft:'250px'}} >

              <h2>Edit {personnelType}</h2>

              <EditAdministratorInput institutionId={institutionId} {...data.user} />

              </div>

        )
      }}
    </Query>
    </div>
    )
  }

}


export default EditAdministrator
