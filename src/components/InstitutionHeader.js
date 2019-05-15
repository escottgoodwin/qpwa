import React,{Component} from 'react';
import '../css/App.css';
import { Query } from "react-apollo"
import {INSTITUTION_QUERY} from '../ApolloQueries'

import { Link } from 'react-router-dom'
import { Button, Loader } from 'semantic-ui-react'
import Error from './Error'

export default class InstitutionHeader extends Component {

  render() {

    return (
      <Query query={INSTITUTION_QUERY} variables={{ institutionId: this.props.institutionId }} fetchPolicy="cache-and-network" >
            {({ loading, error, data }) => {
              if (loading) return <Loader />
              if (error) return <Error {...error}/>
              const { id, name, students } = data.institution
        return (

      <div>
      <div style={{padding:15}}>
      <Link  to={{
        pathname: "/institution_dashboard",
        state:
          { institutionId: id }
        }} >
        <h2>{name}</h2>
        </Link>
        </div>

       <div style={{display:'inline-block',padding:5}}>
         <Link  to={{
           pathname: "/edit_institution",
           state:
             { institutionId: id }
           }} >
            <Button color="blue" >Edit Institution</Button>
           </Link>
        </div>

        <div style={{display:'inline-block',padding:5}}>
          <Link  to={{
            pathname: "/add_admin",
            state:
              { institutionId: id }
            }} >
            <Button color="blue" >Add Administrator</Button>
           </Link>
         </div>

       <div style={{display:'inline-block',padding:5}}>
         <Link  to={{
           pathname: "/add_teacher",
           state:
             { institutionId: id }
           }} >
           <Button color="blue" >Add Teacher</Button>
          </Link>
        </div>

        <div style={{display:'inline-block',padding:5}}>
          <Link  to={{
            pathname: "/institution_students",
            state:
              { institutionId: id }
            }} >
            <Button color="blue" >{students.length} Students</Button>
           </Link>
         </div>

      </div>
    )
  }}
</Query>
    )
  }

}
