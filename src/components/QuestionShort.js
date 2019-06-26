import React,{Component} from 'react'
import '../css/App.css'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Fade from '@material-ui/core/Fade';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

class QuestionShort extends Component {


    render() {

      const selectedColor = green[700]
      const wrong = red[700]

      const { question, questionType, correctShortAnswer, panel, test } = this.props


      return (
              <>
              <div style={{marginTop:20}}>
              <Card style={{backgroundColor:green[700],
              minWidth: 275,
              position: 'relative',
              }} >

              <CardContent>

              <h3>
              {correctShortAnswer}
              </h3>

              </CardContent>

              </Card>
              </div>
              </>


  )
}

  }

export default QuestionShort
