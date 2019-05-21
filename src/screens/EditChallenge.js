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
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Fade from '@material-ui/core/Fade';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import EditChallengeInput from '../components/EditChallengeInput';
import StudentChallengeList from '../components/StudentChallengeList';

import {Query } from "react-apollo"

import { CHALLENGE_QUERY } from '../ApolloQueries'

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
    minWidth: 275,
    position: 'relative',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,

  },
});

class EditChallenge extends Component {

  state = {
        challenge:'',
        graphQLError:'',
        isVisibleGraph:false,
        networkError:'',
        isVisibleNet:false,
      }

    render() {

      const { classes } = this.props
      const { challengeId } = this.props.location.state

      return (
      <div style={{height:'100vh',backgroundColor:'#e4f1fe'}}>
      <main className={classes.main}>
      <CssBaseline />
      <div style={{marginBottom:50}}>

      <Query query={CHALLENGE_QUERY} variables={{ challengeId }} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { id, challenge, answer } = data.challenge

                const question  = answer.answer.question

                const currValue = question.choices.filter(choice => choice.correct)[0].id

            return (

              <Fade in={!loading}>
              <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} >
              <Paper className={classes.paper}>
            <div style={{marginTop:20}}>
            <div style={{marginBottom:20}}>
            {answer.correct ?
              <div >
              <center>

                <ThumbUpAltIcon fontSize='large' style={{color:green[400]}}/>

              </center>
              <Typography style={{color:green[400]}} component="h4" variant="h4">
                You got it right!
              </Typography>
              <div style={{margin:10}} >
              <Typography  component="h5" variant="h5">
                {answer.choice}
              </Typography>
              </div>
              </div>
              :
              <div >
              <center>

                <ThumbDownAltIcon fontSize='large' style={{color:red[400]}}/>

              </center>
              <Typography style={{color:red[400]}} component="h4" variant="h4">
                You got it wrong!
              </Typography>
              <div style={{margin:10}} >
              <Typography  component="h5" variant="h5">
                {answer.choice}
              </Typography>
              </div>
              </div>
            }
            </div>
            <hr />

            <div style={{marginBottom:20}}>
            <Card className={styles.card}>

                  <CardMedia
                      src={question.panel.link}
                      component="img"
                  />

              </Card>
              </div>

              <Typography component="h4" variant="h4">
                {question.question}
              </Typography>

            <FormControl component="fieldset" className={classes.formControl}>

              <RadioGroup
                aria-label="Choices"
                name="choices"
                className={classes.group}
                value={currValue}
                onChange={this.handleChange}
              >

              {question.choices.map(choice => <FormControlLabel value={choice.id} control={<Radio color='primary' />} label={choice.choice} />)}

            </RadioGroup>

            </FormControl>

            <EditChallengeInput classes={classes} {...data.challenge}/>

            <div style={{margin:10}}>
            <Button
            fullWidth
            variant="contained"
            color="primary"
            size='large'
            className={classes.submit}
            onClick={() => this.props.history.push({
              pathname: `/challenge`,
              state: { challengeId: challengeId }
            })}>Cancel</Button>
            </div>

            </div>
            </Paper>
            </div>
            </Fade>
          )
        }}
        </Query>


        </div>
      </main>

      </div>

  )
}
}

export default withStyles(styles)(EditChallenge)