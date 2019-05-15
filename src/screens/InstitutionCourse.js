
import React,{Component} from 'react'
import '../css/App.css'
import { Grid, Segment } from 'semantic-ui-react'
import InstitutionHeader from '../components/InstitutionHeader'
import CoursePeople from '../components/CoursePeople'
import InstitutionCoursesTable from '../components/InstitutionCoursesTable'

import { Query } from "react-apollo"
import Error from './Error'
import Loading from './Loading'

import { COURSE_QUERY } from '../ApolloQueries'

class InstitutionCourse extends Component {

  render() {

    const { institutionId, courseId }= this.props.location.state

    return (

      <div className="main">


              <InstitutionHeader institutionId={institutionId} />

              <Query query={COURSE_QUERY} variables={{ courseid: courseId }} fetchPolicy="cache-and-network" >
                    {({ loading, error, data }) => {
                      if (loading) return <Loading />
                      if (error) return <Error {...error}/>

                      const {name, teachers, students, courseNumber, time, tests } = data.course

                    const testActive = tests.filter(test => !test.deleted)
                    const questionNum = tests.map(test => test.questions.length).reduce((a,b) => a + b, 0)
                    const flattened = tests.map(test => test.questions).flat()
                    const answers = flattened.map(q => q.questionAnswers).flat()
                    const answersNum = answers.length
                    const correct = answers.filter(q => q.answerCorrect).length
                    const percentCorrect = Math.round(correct/answersNum*100)

                  return (

              <div style={{margin:25}}>

              <h3>{name} - {courseNumber}</h3>
              <h5>{time} </h5>

              <Grid columns={3} stackable className="fill-content">
                <Grid.Row stretched>

                <Grid.Column>

                <Segment  fluid="true"  secondary attached='top'>

                    <div><b>Teachers</b></div>

                </Segment>

                <CoursePeople institutionId={institutionId}  people={teachers} />

                </Grid.Column>

                <Grid.Column >
                <Segment  fluid="true"  secondary attached='top'>

                    <div><b>Students</b></div>

                </Segment>

                <CoursePeople institutionId={institutionId}  people={students} />

                </Grid.Column>

                <Grid.Column >
                <Segment  fluid="true"  secondary attached='top'>

                    <div><b>{testActive.length} Tests </b></div>

                </Segment>

                <Segment style={{ height: 400, overflow: 'auto' }} attached>

                  <Grid celled columns={2}>
                  <Grid.Row>
                  <Grid.Column>
                   <h6>Questions: {questionNum}</h6>
                  </Grid.Column>
                  <Grid.Column>
                  <h6>Answers: {answersNum}</h6>
                  </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                  <Grid.Column>
                   <h6>Correct: {correct}</h6>
                  </Grid.Column>
                  <Grid.Column>
                  <h6>Percent: {percentCorrect>0 ? percentCorrect : 0}%</h6>
                  </Grid.Column>
                  </Grid.Row>

                  </Grid>


                  <InstitutionCoursesTable {...testActive}/>

                </Segment>

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


export default InstitutionCourse
