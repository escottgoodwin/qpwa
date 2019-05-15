import React,{Component} from 'react';

import '../css/App.css';
import classNames from 'classnames'
import Dropzone from 'react-dropzone'
import { Segment, Icon, Progress  } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import axios from 'axios'

import {DELETE_PANEL, ADD_PANEL_MUTATION,TEST_PANEL_STATS_QUERY} from '../ApolloQueries'

class DropZoneUpload extends Component {

    state = {
      progress:0,
      loaded:0,
      percent:0,
      fileUrls:this.props.panels,
      panelcount: this.props.panels.length
    }

    deletePanel = (panelId) => {

       axios({
          url: process.env.REACT_APP_GRAPHQL_SERVER,
          method: 'post',
          headers: {
            authorization: this.props.token ? `Bearer ${this.props.token}` : "",
          },
          data: {
            query: DELETE_PANEL,
              variables: {panelId:panelId}
            }
        })
        .then(result => {
          return axios({
             url: process.env.REACT_APP_GRAPHQL_SERVER,
             method: 'post',
             headers: {
               authorization: this.props.token ? `Bearer ${this.props.token}` : "",
             },
             data: {
               query: TEST_PANEL_STATS_QUERY,
                 variables: {testId:this.props.id}
               }
           })
         })
        .then(result => console.log('updated'))
        .catch((error) => {
             // Error
             if (error.response) {
                 // The request was made and the server responded with a status code
                 // that falls out of the range of 2xx
                 // console.log(error.response.data);
                 // console.log(error.response.status);
                 // console.log(error.response.headers);
             } else if (error.request) {
                 // The request was made but no response was received
                 // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                 // http.ClientRequest in node.js
                 console.log(error.request);
             } else {
                 // Something happened in setting up the request that triggered an Error
                 console.log('Error', error.message);
             }
             console.log(error.config);
           })
          }

    onDrop = async (acceptedFiles, rejectedFiles) =>  {
      // Push all the axios request promise into a single array

      const file_total = acceptedFiles.length
      let uploadFiles = 0
      const fileSizes = acceptedFiles.map(file => file.size)
      const reducer = (accumulator, currentValue) => accumulator + currentValue
      const totalUploadSize = fileSizes.reduce(reducer)

      acceptedFiles.map(file => {

        const unsignedUploadPreset = process.env.REACT_APP_CLOUDINARY_PRESET
        var url = process.env.REACT_APP_CLOUDINARY_URL

        const formData = new FormData()
        formData.append("file", file)
        formData.append("tags", 'browser_upload')
        formData.append("upload_preset", unsignedUploadPreset)// Replace the preset name with your own

        const config = {
          headers: { "X-Requested-With": "XMLHttpRequest" },
        }

        const that = this
         axios.post(url, formData, config)
         .then(response => {
          const data = response.data;
          const fileURL = data.secure_url // You should store this URL for future references in your app
          const testId = this.props.id

         return axios({
            url: process.env.REACT_APP_GRAPHQL_SERVER,
            method: 'post',
            headers: {
              authorization: this.props.token ? `Bearer ${this.props.token}` : "",
            },
            data: {
              query: ADD_PANEL_MUTATION,
                variables: {testId:testId,link:fileURL}
              }
          })
          .then(result => {
            uploadFiles += 1
            let percent = (uploadFiles / file_total)*100
            that.setState({percent})
          })
          .catch((error) => {
               // Error
               if (error.response) {
                   // The request was made and the server responded with a status code
                   // that falls out of the range of 2xx
                   // console.log(error.response.data);
                   // console.log(error.response.status);
                   // console.log(error.response.headers);
               } else if (error.request) {
                   // The request was made but no response was received
                   // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                   // http.ClientRequest in node.js
                   console.log(error.request);
               } else {
                   // Something happened in setting up the request that triggered an Error
                   console.log('Error', error.message);
               }
               console.log(error.config);
             })

        })
        return file
      })
    }

      render() {

        return (

          <div>

          <div >
          <center>
          <div style={{width:"500px",paddingBottom:"25px"}}>

          <Link  to={{
            pathname: "/test_panels",
            state: { test_id: this.props.id }
            }} >
          <h4>Panel Performance Statistics</h4>
          </Link>

        <Dropzone token={this.props.token} onDrop={this.onDrop}>
          {({getRootProps, getInputProps, isDragActive}) => {
            return (
              <div
                {...getRootProps()}
                className={classNames('dropzone', {'dropzone--isActive': isDragActive})}
              >
                <input {...getInputProps()} />
                {
                  isDragActive ?
                  <Segment placeholder  size='big'>

                    <Icon name='images outline' /><br/>
                    Drop or Choose Files

                  </Segment>

                   :

                  <Segment placeholder  >

                    <Icon name='images outline'  size='big'/><br/>
                    Drop or Choose Files

                  </Segment>

                }
              </div>

            )
          }
        }

        </Dropzone>
        </div >
        </center>
        </div >
        <Progress percent={this.state.percent} color='teal' />
    </div>

      )
    }

  }


export default DropZoneUpload
