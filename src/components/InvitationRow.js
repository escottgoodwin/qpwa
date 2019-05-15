import React,{Component} from 'react';
import '../css/App.css';
import { Segment, Button } from 'semantic-ui-react'
import { Mutation } from "react-apollo";
import {withRouter} from "react-router-dom"

import gql from "graphql-tag";

const JOIN_MUTATION = gql`
  mutation JoinCourse(
    $inviteId: ID!,
    $courseId: ID!
  ){
    joinCourse(inviteId: $inviteId,
      courseId: $courseId){
        authMsg
      }
    }
`

class InvitationRow extends Component {

render() {

    return (

<Segment >
  <div className="course_row">

  <div className="course_cell">
  <h6>
    {this.props.invite.course.name} - {this.props.invite.course.courseNumber}
  </h6>
  </div>

  <div className="course_cell">

    {this.props.invite.course.time}

  </div>

  <div className="course_cell">

  {this.props.invite.course.teachers.map(teacher => teacher.firstName + ' ' + teacher.lastName).join()}


  </div>

  <div className="course_cell">

  {this.props.invite.course.institution.name}

  </div>

  <div className="course_cell">

  <Mutation
      mutation={JOIN_MUTATION}
      variables={{ courseId: this.props.invite.course.id, inviteId: this.props.invite.id }}
      onCompleted={data => this._confirm(data)}
      refetchQueries={() => {
         return [{
            query: gql`
            query UserQuery($userid: ID!) {
              user(id: $userid){
                id
                firstName
                lastName
                invitesSentTo{
                  id
                  course{
                    id
                    courseNumber
                    name
                    time
                    teachers{
                      id
                      firstName
                      lastName
                    }
                    institution{
                      id
                      name
                    }
                  }
                }
                studentCourses{
                  id
                  name
                  time
                  deleted
                  institution{
                    id
                    name
                  }
                  teachers{
                    id
                    firstName
                    lastName
                  }
                  tests{
                    id
                  }
                }
              }
            }
          `,
            variables: { userid: this.props.userid }
        }];
    }}
       >
      {mutation => (

        <Button size="tiny" color='blue' onClick={mutation}>Join</Button>

      )}
    </Mutation>

  </div>

  </div>

  </Segment >

)

}
_confirm = async data => {
  this.props.history.push({pathname: `/student_dashboard`})
}
}


export default withRouter(InvitationRow)
