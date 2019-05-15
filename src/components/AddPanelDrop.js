import React from 'react';
import '../css/App.css';
import { Progress, Button, Row, Col } from 'reactstrap';
import ReactDropzone from "react-dropzone"

const AddPanelDrop = (props) =>

      <div className="dropzone">

        <Row>
        <Col md="3">
        <ReactDropzone
          accept="image/*"
          onDrop={this.onpreviewdrop}
        >
          Drop an image, get a preview!
        </ReactDropzone>
        <div className="upload">
        <Button color="primary" onClick={props.upload_panels} >Upload</Button>
        </div>
        </Col>

        <Col md="9">
              {
                props.files.map(f => <Row key={f.name} ><Col sm="3">{f.name}</Col ><Col sm="3">
                <img
                  alt="Preview"
                  key={f.preview}
                  src={f.preview}
                  style={previewStyle}
                /> </Col><Col sm="6"><Progress value="30" /></Col ></Row>)
              }
        </Col>
        </Row>
      </div>

  const previewStyle = {
     display: 'inline',
     width: 100,
     height: 100,
   };

export default AddPanelDrop
