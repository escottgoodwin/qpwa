import React,{Component} from 'react'
import '../css/App.css'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';


class ChallengeQuestionShort extends Component {

    render() {

      const selectedColor = green[700]
      const wrong = red[700]

      const background = answerCorrect ? selectedColor : wrong

      const { answer, question, answerCorrect, shortAnswerText } = this.props

      return (
        <>
        <div style={{marginTop:20}}>
        <Card style={{backgroundColor:background,
        minWidth: 275,
        position: 'relative',
        }} >

        <CardContent>

        <h3>
        {shortAnswerText}
        </h3>

        </CardContent>

        </Card>
        </div>

      <div style={{marginTop:20}}>
      <Card style={{backgroundColor:green[700],
      minWidth: 275,
      position: 'relative',
      }} >

      <CardContent>

      <h3>
      {question.correctShortAnswer}
      </h3>

      </CardContent>

      </Card>
      </div>

        </>
    )
  }

}

export default ChallengeQuestionShort
