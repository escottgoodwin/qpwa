import React,{Component} from 'react'
import '../css/App.css'
import { Button, Grid, Segment, Card } from 'semantic-ui-react'
import InstitutionHeader from '../components/InstitutionHeader'
import InstitutionCoursesPersonnel from '../components/InstitutionCoursesPersonnel'

import Error from './Error'
import Loading from './Loading'

import { Query } from "react-apollo"

import { PERSONNEL_QUERY } from '../ApolloQueries'

class PersonnelDashboard extends Component {

  activeCouresSwitch = (teacherCoursesActive,studentCoursesActive) => {
    if (teacherCoursesActive.length>0){
      return teacherCoursesActive
    } else {
      return studentCoursesActive
    }
  }

  render() {

    const { institutionId, userId  }= this.props.location.state

    return (
    <div className="main">

        <InstitutionHeader institutionId={institutionId} />

        <Query query={PERSONNEL_QUERY} variables={{ userId: userId }} fetchPolicy="cache-and-network" >
              {({ loading, error, data }) => {
                if (loading) return <Loading />
                if (error) return <Error {...error} />

                const { firstName, role, lastName, title, department, address1, address2, city, state, zip, phone, email, teacherCourses, studentCourses } = data.user
                const teacherCoursesActive = teacherCourses.filter(course => !course.deleted)
                const studentCoursesActive = studentCourses.filter(course => !course.deleted)

                const coursesActive = this.activeCouresSwitch(teacherCoursesActive,studentCoursesActive)

            return (

              <div style={{marginRight:'150px',marginTop:'25px',marginLeft:'150px'}} >
              <Grid columns={2}>
                <Grid.Row>
                <Grid.Column width={6}>
              <Card >

              <Card.Content>
              {role==='TEACHER' &&
              <h4>Teacher</h4>}

              {role==='ADMIN' &&
              <h4>Administrator</h4>}

              {role==='STUDENT' &&
              <h4>Student</h4>}

              <hr/>
              <h3>{firstName} {lastName}</h3>

              <Card.Meta>{title} {department}</Card.Meta>
              <hr/>
              <Card.Description>

              {!!address1 &&
              <>
              <p>
              <b>Institution Address:</b>
              </p>
               <p>
               {address1}
               </p>

               <p>
               {address2}
               </p>
               <p>
               {city }, {state }  {zip}
               </p>
               <hr/>
               </>
             }
               <p>
               <b>Email:</b> <a href={"mailto:"+email}>{email}</a>
               </p>

               {!!phone &&
               <p>
               <b>Phone:</b> {phone}
               </p>
             }
               </Card.Description>
               <hr/>

               <Button color='blue' onClick={() => this.props.history.push({
                 pathname: `/edit_admin`,
                 state: { institutionId, userId }
               })}>Edit</Button>

             </Card.Content>
             </Card>
             </Grid.Column>

             <Grid.Column width={10}>
              <Segment  fluid="true"  secondary attached='top'>
              {coursesActive.length} Courses
              </Segment>

                <InstitutionCoursesPersonnel institutionId={institutionId} courses={coursesActive} />

              </Grid.Column>
              </Grid.Row>
              </Grid>

              </div>

        )
      }}
    </Query>
    </div>
    )
  }
}


export default PersonnelDashboard
