import React,{Component} from 'react'
import '../css/App.css'

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Fade from '@material-ui/core/Fade';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CardActionArea from '@material-ui/core/CardActionArea'
import blueGrey from '@material-ui/core/colors/blueGrey';


class ReviewQuestionMulti extends Component {

    render() {

      const selectedColor = blueGrey[200]

      const { choices } = this.props

      const button1 = choices[0].correct ? selectedColor : 'white'
      const button2 = choices[1].correct ? selectedColor : 'white'
      const button3 = choices[2].correct ? selectedColor : 'white'
      const button4 = choices[3].correct ? selectedColor : 'white'

            return (
              <>
          <div style={{marginTop:20}}>
          <Card style={{backgroundColor:button1,
            minWidth: 275,
            position: 'relative',
          }} >

            <CardContent>

              <h5>
                {choices[0].choice}
              </h5>

              </CardContent>

          </Card>
          </div>

          <div style={{marginTop:20}}>
          <Card style={{backgroundColor:button2,
          minWidth: 275,
          position: 'relative',
          }}  >

          <CardContent>

            <h5>
              {choices[1].choice}
            </h5>

            </CardContent>

          </Card>
          </div>

          <div style={{marginTop:20}}>
          <Card style={{backgroundColor:button3,
          minWidth: 275,
          position: 'relative',
          }} >

          <CardContent>

          <h5>
            {choices[2].choice}
          </h5>

          </CardContent>

          </Card>
          </div>

          <div style={{marginTop:20}}>
          <Card style={{backgroundColor:button4,
          minWidth: 275,
          position: 'relative',
          }} >

          <CardContent>

          <h5>
          {choices[3].choice}
          </h5>

          </CardContent>

          </Card>
          </div>
          </>
  )
}
}

export default ReviewQuestionMulti
