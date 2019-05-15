import React,{Component} from 'react'
import '../css/App.css'
import { Query } from "react-apollo"
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import InstitutionList from '../components/InstitutionList'

import {INSTITUTIONS_QUERY} from '../ApolloQueries'

import Error from './Error'
import Loading from './Loading'

class QuandrioDashboard extends Component {

  render() {

    const {firstName,lastName} = JSON.parse(sessionStorage.getItem('user'))

    return (

        <Query query={INSTITUTIONS_QUERY} fetchPolicy="cache-and-network" >
              {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <Error error={error} />

                const {count, institutions} = data.institutions
                const institutionsActive = institutions.filter(institution => !institution.deleted)

                return (
                  <div className="main">

                    <div className="container">

                    <div>
                    <h5>{firstName} {lastName}</h5>
                    <h3>Quandrio Institutions - {institutionsActive.length}</h3>
                    <div style={{padding:"15px"}}>
                    <Link  to="/add_institution"><Button color='blue'>Add Institution</Button></Link>
                    </div>
                    </div>

                    <div className="coursecontainer">

                      <InstitutionList  count={count} courses={institutionsActive} />

                    </div>

                  </div>

                </div>
              )
            }}
          </Query>
    )
  }
}

export default QuandrioDashboard
