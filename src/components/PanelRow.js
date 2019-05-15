import React from 'react';
import '../css/App.css';
import { Image, Card } from 'semantic-ui-react'

const PanelRow = (props) =>

  <Card>
    <Image src={props.panelLink} />
    <Card.Content>
    {props.question.length>0 &&
      <>
      <Card.Description><b>Label:</b> {props.question}</Card.Description>
      <hr/>
      </>
    }
      <Card.Description><b>Answers:</b> {props.total} <b>Correct:</b> {props.totalCorrect} ({Math.round(props.percentCorrect*100)}%)</Card.Description>
    </Card.Content>
  </Card>

export default PanelRow
