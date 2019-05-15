import React,{Component} from 'react';
import '../css/App.css';
import { Grid,Segment } from 'semantic-ui-react'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

class ChallengeLoading extends Component {

  render() {


      return (
        <SkeletonTheme  >
            <div className="main">

                <div className="container">

                <div style={{width:"50%", margin:"auto"}}>
                <Skeleton count={2} />

                <hr/>
                <Skeleton count={2} />
                </div>


                  <div className="coursecontainer">
                  <div style={{width:"30%", margin:"auto"}}>
                  <Skeleton count={2} />
                  </div>
                  <hr/>
                  <Grid>
                    <Grid.Row>
                    <Grid.Column width={4}>
                    <Segment>
                    <Skeleton count={8} />
                      </Segment>
                    </Grid.Column>
                    <Grid.Column width={12}>
                    <div style={{minHeight:"400px"}}>
                    <Segment>
                    <Skeleton count={18} />
                    </Segment>
                  </div>
                  </Grid.Column>
                  </Grid.Row>
                  </Grid>
                  </div>
                </div>


            </div>
        </SkeletonTheme  >
    )
  }
}

export default ChallengeLoading
