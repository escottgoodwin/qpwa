import React,{Component} from 'react'
import '../css/App.css'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import TestHeaderStudent from '../components/TestHeaderStudent'
import PanelList from '../components/PanelList1'

import { Query } from "react-apollo"
import { PANEL_QUERY } from '../ApolloQueries'

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

class StudentTestPanels extends Component {

  render() {

    const { test_id } = this.props.location.state
    const { classes } = this.props

      return (

        <main className={classes.main}>

        <div style={{marginBottom:50}}>

        <Query query={PANEL_QUERY} variables={{ test_id: test_id }}>
              {({ loading, error, data }) => {
                if (loading) return <div style={{height:'100vh',backgroundColor:'#e4f1fe'}} > </div>
                if (error) return <div>{JSON.stringify(error)}</div>

                const { id, testType } = data.test

            return (

              <>
              <TestHeaderStudent classes={classes} {...data.test}/>


              { testType === 'LAB' &&
                <div style={{marginBottom:20}}>
                <Link  to={{
                  pathname: "/student_add_photos",
                  state:
                    {
                      testId: id }
                  }} >
                  <Button  style={{marginTop:30}} fullWidth size='large' variant='contained' color="primary" >Add Photos</Button>
                </Link>
                </div>
              }

              <PanelList classes={classes} {...data.test}/>
              </>

              )
            }}
        </Query>

        </div>

        </main>

    )
  }
  }

export default withStyles(styles)(StudentTestPanels)
