import React from 'react';
import '../css/App.css';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const AddPanelButton = (props) =>

<Link  to={{
  pathname: "/add_panels",
  state:
    {
      test_id: props.testId }
  }} >
  <Button color="blue" >Add/Delete Panels</Button>
</Link>


export default AddPanelButton
