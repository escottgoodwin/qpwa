import React from 'react';
import '../css/App.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
    position: 'relative',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
   },
  overlay: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      color: 'black',

   }
};

const PanelRow = (props) =>
<div style={{margin:15}}>
<Card style={styles.card}>

    <CardMedia
        height="140"
        src={props.panelLink}
        component="img"
    />
    {props.question.length>0 &&
    <CardContent>
      <Typography >
        <b>Label:</b> {props.question}
      </Typography>
    </CardContent>
    }
    <CardContent>
      <Typography >
        <b>Answers:</b> {props.total} <b>Correct:</b> {props.totalCorrect} ({Math.round(props.percentCorrect*100)}%)
      </Typography>
    </CardContent>

  </Card>
  </div>

export default PanelRow
