import React,{Component} from 'react'
import '../css/App.css'
import { Button, Grid, Segment, Message } from 'semantic-ui-react'
import InstitutionHeader from '../components/InstitutionHeader'
import InstitutionAdmins from '../components/InstitutionAdmins'

import InstitutionTeachers from '../components/InstitutionTeachers'

import InstitutionCourses from '../components/InstitutionCourses'

import { Query, Mutation } from "react-apollo"
import Error from './Error'
import Loading from './Loading'


import {INSTITUTION_QUERY, DELETE_INSTITUTION_MUTATION, INSTITUTIONS_QUERY} from '../ApolloQueries'

class InstitutionDashboard extends Component {

  state = {
    graphQLError: '',
    isVisibleGraph:false,
    networkError:false,
    isVisibleNet:false,
  }

  render() {

    const { institutionId }= this.props.location.state
    const { graphQLError, networkError, isVisibleNet, isVisibleGraph } = this.state

    return (
      <div className="main">

      <InstitutionHeader institutionId={institutionId} />

    <Query query={INSTITUTION_QUERY} variables={{ institutionId: institutionId }} fetchPolicy="cache-and-network" >
          {({ loading, error, data }) => {
            if (loading) return <Loading />
            if (error) return <Error {...error}/>

            const {id, address1, address2, city, state, zip, phone, email, courses, teachers, admins } = data.institution
            const coursesActive = courses.filter(course => !course.deleted)

        return (
              <>
              <div style={{margin:25}}>

              <Grid  stackable className="fill-content">
                <Grid.Row >

                <Grid.Column width={5}>

                <Segment  fluid="true"  secondary attached='top'>

                    <div><b>Administrators</b></div>

                </Segment>
                <InstitutionAdmins institutionId={id} admins={admins} />

                </Grid.Column>

                <Grid.Column width={5}>
                <Segment  fluid="true"  secondary attached='top'>

                    <div><b>Teachers</b></div>

                </Segment>

                <InstitutionTeachers institutionId={id}  teachers={teachers} />

                </Grid.Column>

                <Grid.Column width={6}>
                <Segment  fluid="true"  secondary attached='top'>

                    <div><b>Courses</b></div>

                </Segment>

                <InstitutionCourses institutionId={id} courses={coursesActive} />

                </Grid.Column>

                </Grid.Row>

                <Grid.Row>

                <Grid.Column width={16}>
                <Segment >
                <p><b>Address:</b> { address1 } { address2 } { city }, { state } { zip }</p>
                <p>
                <b>Phone:</b> { phone } <b>Email:</b> <a href={"mailto:"+email}>{email}</a>
                </p>
                </Segment>

                </Grid.Column>

                </Grid.Row>

                </Grid>
                </div>

              <Mutation
                  mutation={DELETE_INSTITUTION_MUTATION}
                  variables={{ institutionId:id }}
                  onCompleted={data => this._confirm(data)}
                  onError={error => this._error(error)}
                  refetchQueries={() => { return [{
                    query: INSTITUTIONS_QUERY,
                  }]
                }}>
                  {mutation => (
                    <div><Button  color='red' onClick={mutation}>Delete Institution</Button></div>
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
                </>
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
    this.props.history.push(`/quandrio_dashboard`)
  }
}


export default InstitutionDashboard
