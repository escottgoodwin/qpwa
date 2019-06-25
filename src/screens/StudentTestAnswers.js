import React,{Component} from 'react'
import '../css/App.css'

import Fade from '@material-ui/core/Fade';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import { withStyles } from '@material-ui/core/styles';

import StudentTestHeader from '../components/StudentTestHeader'
import UserAnswerStats from '../components/UserAnswerStats'
import UserAnswerRowShort from '../components/UserAnswerRowShort'
import UserAnswerRowMulti from '../components/UserAnswerRowMulti'

import { Query } from "react-apollo"
import { USER_ANSWERS_QUERY } from '../ApolloQueries'


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
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  card: {
    minWidth: 275,
    position: 'relative',
  },
});


class StudentTestAnswers extends Component {

  render() {

    const { testId } = this.props.location.state
    const { classes, history } = this.props

      return (

        <div style={{height:'100%',marginBottom:50, marginLeft:30, marginRight:30,backgroundColor:'#e4f1fe'}} >

      <Query query={USER_ANSWERS_QUERY} variables={{ testId: testId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
              if (error) return <div> {JSON.stringify(error)} </div>

              const { answers } = data.userAnswers1
              console.log(answers)
              return (
                <Fade in={!loading}>
                <div  >

                <StudentTestHeader classes={classes} test_id={testId} />

                <UserAnswerStats classes={classes} testId={testId} />

                {
                  answers.length>0 &&

                  answers.map(item =>

                    <div key={item.id} style={{padding:10,marginTop:10}} >
                    <Card onClick={()=> history.push({
                      pathname: "/question",
                      state:
                        { questionId: item.question.id }
                      })}
                    >
                    <CardActionArea>
                    <CardContent>
                    <h5  >
                     {item.question.question}
                    </h5>
                    <hr />

                    {
                      item.answer!==null ?
                       <UserAnswerRowMulti {...item} />
                       :
                       <UserAnswerRowShort {...item} />
                    }


                    </CardContent>
                    </CardActionArea>
                    </Card>
                    </div>
                  )
                }

                </div  >
                </Fade>

            )
          }}
          </Query>
          </div>

            )
      }
    }

export default withStyles(styles)(StudentTestAnswers)
