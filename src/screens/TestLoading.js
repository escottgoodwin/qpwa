import React,{Component} from 'react';
import '../css/App.css';
import { Grid, Segment } from 'semantic-ui-react'

import { Segment, Placeholder } from 'semantic-ui-react'

class TestLoading extends Component {

  render() {


    return (

            <div className="main">
            <div className="container">
            <Placeholder fluid>

              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder >

              <Grid columns={2} stackable className="fill-content">
                <Grid.Row stretched>
                <Grid.Column  >

                <Placeholder fluid>

                  <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Paragraph>
                </Placeholder >

                </Grid.Column>

                <Grid.Column >

                <Placeholder fluid>

                  <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Paragraph>
                </Placeholder >

                </Grid.Column>
              </Grid.Row>
              </Grid>



              </div>
              </div>

      )
    }
  }


export default TestLoading
