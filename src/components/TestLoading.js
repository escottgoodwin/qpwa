import React,{Component} from 'react';
import '../css/App.css';
import { Grid, Segment } from 'semantic-ui-react'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

class TestLoading extends Component {

  render() {


    return (
          <SkeletonTheme  >
            <div className="main">
            <div className="container">

            <div >
            <div style={{width:"50%",margin:'auto'}}>
              <Skeleton count={2} />
            </div>
          <hr/>

            <div style={{width:"70%",margin:'auto',padding:'15px'}}>

              <Skeleton count={2} />

            </div>

            <div style={{width:"70%",margin:'auto'}}>
              <Skeleton count={2} />
            </div>


          <div style={{padding:20}}>


          </div>

          </div>


              <Grid columns={2} stackable className="fill-content">
                <Grid.Row stretched>
                <Grid.Column  >
                <Segment  secondary attached='top'>
                </Segment>
                <Segment style={{ minHeight: 400 }} attached>

                  <Skeleton count={3} />

                </Segment>
                </Grid.Column>

                <Grid.Column >
                <Segment  secondary attached='top'>
                </Segment>
                <Segment style={{ minHeight: 400 }} attached>

                  <Skeleton count={3} />

                </Segment>
                </Grid.Column>
              </Grid.Row>
              </Grid>

              </div>
              </div>
              </SkeletonTheme  >

      )
    }
  }


export default TestLoading
