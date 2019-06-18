import React,{Component} from 'react';
import {withRouter} from "react-router-dom"

import '../css/App.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import { Query } from "react-apollo";
import { COURSE_QUERY } from '../ApolloQueries';

class TeacherCourseHeader  extends Component {

  render() {

    const { courseid, history } = this.props

    return (

      <Query query={COURSE_QUERY} variables={{ courseid }}>
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'25vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

              const { name, courseNumber, image } = data.course

          return (

            <>
            <div style={{paddingTop:20,paddingBottom:20}}>



              <Card onClick={()=> history.push({
                pathname: "/course_dashboard",
                state:
                  { course_id:courseid }
                })}
                style={{opacity:1,
                  backgroundSize: 'cover',
                  overflow: 'hidden',
                  color:'black',
                  backgroundImage:`url(${image})`}}
                >

              <CardActionArea>

              <CardContent>
              <div style={{padding:'15px',backgroundColor:'#303030',opacity:.7, color:'white'}}>
              <h4>{name} - {courseNumber}</h4>
              </div>
              </CardContent>
              </CardActionArea>
              </Card>

              </div>
            </>

          )
        }}
      </Query>

    )
  }
}

export default withRouter(TeacherCourseHeader)
