import React,{Component} from 'react'
import '../css/App.css'
import InstitutionHeader from '../components/InstitutionHeader'
import CoursePeopleStudent from '../components/CoursePeopleStudent'

import { Query } from "react-apollo"
import Error from './Error'
import Loading from './Loading'

import { INSTITUTION_QUERY } from '../ApolloQueries'

class InstitutionStudents extends Component {

  render() {

    const { institutionId }= this.props.location.state

    return (
      <div className="main">

      <InstitutionHeader institutionId={institutionId} />
      <div style={{margin:25}}>

    <Query query={INSTITUTION_QUERY} variables={{ institutionId: institutionId }} fetchPolicy="cache-and-network" >
          {({ loading, error, data }) => {
            if (loading) return <Loading />
            if (error) return <Error {...error}/>

            const { students } = data.institution

        return (

          <CoursePeopleStudent institutionId={institutionId}  people={students} />

        )
      }}
    </Query>
    </div>
    </div>
    )
  }

}


export default InstitutionStudents
