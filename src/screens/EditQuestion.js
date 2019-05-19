import React,{Component} from 'react'
import * as Cookies from "js-cookie"
import '../css/App.css'
//import { Button, Form, FormGroup, Label, Input,} from 'reactstrap'
import { Message } from 'semantic-ui-react'

import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '@material-ui/core/Checkbox';

import EditQuestionInput from '../components/EditQuestionInput'

import { Query } from "react-apollo"
import {EDIT_QUESTION_QUERY} from '../ApolloQueries'

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

class EditQuestion extends Component {

    render() {

      const { classes } = this.props
      const { newQuestionId, oldQuestionId, testId } = this.props.location.state

      return (
      <div style={{height:'100%',backgroundColor:'#e4f1fe'}}>
      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:50}}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <QuestionAnswerIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit Question
        </Typography>


        <Query query={EDIT_QUESTION_QUERY} variables={{ questionId: newQuestionId }} fetchPolicy="cache-and-network">
              {({ loading, error, data }) => {
                if (loading) return <div>Loading...</div>
                if (error) return <div> {JSON.stringify(error)} </div>

                const { id, question, panel, choices, test } = data.question

            return (

        <div>

        <div style={{marginTop:10}}>
        <Card className={styles.card}>

              <CardMedia
                  src={panel.link}
                  component="img"
              />

          </Card>
          </div>

      <EditQuestionInput classes={classes} oldQuestionId={oldQuestionId} testId={testId} {...data.question}/>

        </div>
          )
          }}
          </Query>

        </Paper>
        </div>
      </main>



      </div>

    )
  }
}

export default withStyles(styles)(EditQuestion)
