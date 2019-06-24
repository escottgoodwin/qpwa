import React,{Component} from 'react'
import '../css/App.css'

import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';
import green from '@material-ui/core/colors/green';
import { Microscope } from 'mdi-material-ui'
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import BookIcon from '@material-ui/icons/Book';
import { withStyles } from '@material-ui/core/styles';

import { Query } from "react-apollo"
import { NEW_QUESTIONS } from '../ApolloQueries'

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

class StudentNewQuestions extends Component {

  render() {
    const userId = sessionStorage.getItem('userid')
    const { history } = this.props

    return (

      <>

      <div style={{marginBottom:50}}>

      <Query query={NEW_QUESTIONS} variables={{ userId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

              const { questions } = data.questions

          return (
            <Fade in={!loading}>
            <>
              <div >

              <div style={{marginRight:20,marginLeft:20}}>

              <div style={{marginBottom:20,marginRight:10,marginLeft:10}}>
              <Card >

              <div >

                <CardContent style={{height:'100%',padding:10, backgroundColor:green[500],color:green[100]}}>

                  < ContactSupportIcon style={{fontSize:36}}/>

                </CardContent>

              </div>

              <CardContent style={{width:'100%',padding:10, backgroundColor:green[100],color:green[700]}} >
              <h4>New Questions </h4>
              </CardContent>
              </Card>
              </div>

              {questions.map(question =>

              <div key={question.id} style={{padding:10}}>

              <Card onClick={()=> history.push({
                pathname: "/create_question",
                state:
                  { questionId: question.id }
                })}>
              <CardActionArea>
              {question.test.testType==="CLASS" &&

              <CardContent style={{ backgroundColor:cyan[100]}}>
              <BookIcon style={{ color:cyan[700]}} />
              <h5 style={{color:cyan[700]}}>
              Lecture
              </h5>
              </CardContent>
              }

              {question.test.testType==="LAB" &&

              <CardContent style={{ backgroundColor:teal[100]}}>
              <Microscope style={{color:teal[700]}}/>
              <h5 style={{color:teal[700]}}>
              Lab
              </h5>
              </CardContent>
              }

            <CardContent >

            <div><h4>{question.test.testNumber} - {question.test.subject}</h4></div>

            <div><h5>{question.test.course.name} - {question.test.course.courseNumber}</h5></div>
            <hr />

              <div><h4>{question.question}</h4></div>

            </CardContent>
            </CardActionArea>
            </Card>

            </div>
            )}

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


export default withStyles(styles)(StudentNewQuestions)
