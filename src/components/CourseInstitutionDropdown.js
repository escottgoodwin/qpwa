import React,{Component} from 'react';
import '../css/App.css';
import { Form,Select } from 'semantic-ui-react'

const CourseInstitutionDropdown = (props) => {

          <Form.Field
            id='institutionId'
            control={Select}
            options={props.institutions}
            onChange={(event, {value}) => { this.setState({ institutionId: value })}}
            label='Institution'
            fluid
            selection
            placeholder='Select Institution'
          />

}

export default CourseInstitutionDropdown
