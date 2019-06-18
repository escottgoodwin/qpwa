import React,{Component} from 'react'
import '../css/App.css'

import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import blue from '@material-ui/core/colors/blue';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { withStyles } from '@material-ui/core/styles';

import { Query, Mutation } from "react-apollo"
import { COURSE_QUERY,STUDENT_COURSE_QUERY, JOIN_MUTATION } from '../ApolloQueries'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    //backgroundColor: theme.palette.primary.main,

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,

  },
});

class StudentJoinCourse extends Component {

  render() {

    const { course_id }= this.props.location.state

    return (

      <>

      <div style={{marginBottom:50}}>

      <Query query={COURSE_QUERY} variables={{ courseid: course_id }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

              const courseToRender = data.course
              const { name, time, courseNumber, institution, image, teachers } = data.course
              console.log(courseToRender)
          return (
            <Fade in={!loading}>
            <>
              <div >

              <div style={{marginRight:20,marginLeft:20}}>

              <div style={{marginRight:10,marginLeft:10}}>
              <Card >

              <div >
                <CardContent style={{height:'100%',padding:10, backgroundColor:blue[500],color:blue[100]}}>

                  <PersonAddIcon />

                </CardContent>
              </div>

              <CardContent style={{width:'100%',padding:10, backgroundColor:blue[100],color:blue[700]}} >
              <h4>Join Course </h4>
              </CardContent>
              </Card>
              </div>

              <div style={{padding:10}}>
              <Card >

              <CardMedia
                  height="140"
                  src={image}
                  component="img"
              />


              <CardContent >

              <div><h4>{name} - {courseNumber}</h4></div>

              <div style={{margin:10}}><h4>{institution.name} </h4></div>
              <hr />

              <div style={{margin:10}}><h5>{time}</h5></div>


              <div style={{margin:10}}><h5><b>Instructors:</b> </h5></div>
              <div>
              {teachers.map(t => <div><h5>{t.firstName} {t.lastName} </h5></div>)}
              </div>
              </CardContent>
              </Card>
              </div>


              <Mutation
                  mutation={JOIN_MUTATION}
                  variables={{ courseId: course_id, inviteId: this.props.inviteId }}
                  onCompleted={data => this._confirm(data)}
                  refetchQueries={() => {
                     return [{
                        query: STUDENT_COURSE_QUERY,
                        variables: { userid: this.props.userid }
                    }];
                }}
                   >
                  {mutation => (
                    <Button style={{padding:10,marginTop:15,marginBottom:15}} fullWidth onClick={mutation} variant="contained" color="primary" size="small">Join</Button>
                  )}
                </Mutation>

                <Button fullWidth style={{padding:10,marginBottom:15}}  variant="contained" color="secondary" size="small">Decline</Button>

            </div>
            </div>
            </>
            </Fade >
        )
      }}
    </Query>

    </div>
    </>

    )
  }

}


export default withStyles(styles)(StudentJoinCourse)
