import React from 'react';
import '../css/App.css';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CardActionArea from '@material-ui/core/CardActionArea'
import Magnifier from "react-magnifier";
import Fade from '@material-ui/core/Fade';

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

const Transition = props =>  <Slide direction="up" {...props} />

class PanelRow extends React.Component {

    state = { open: false,
              loading: true
            }

    handleClickOpen = () => {
    this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    componentDidMount(){
      setTimeout(() => {this.setState({loading:false})}, 1000)
    }

    render() {

      const { classes, test, id, question, panelLink, total, totalCorrect, percentCorrect } = this.props
      const { subject, testNumber } = test
      const { loading, open } = this.state

      return (
        <Fade in={!loading}>
        <div style={{marginBottom:15}}>
        <Card onClick={this.handleClickOpen} style={styles.card}>
          <CardActionArea>
            <CardMedia

                src={panelLink}
                component="img"
            />
            {question.length>0 &&
            <>
            <CardContent>
              <h5>
                <b>Label:</b> {question}
              </h5>
            </CardContent>

            </>
            }
            <Divider />
            <CardContent>
              <h5>
                <b>Answers:</b> {total} <b>Correct:</b> {totalCorrect} ({Math.round(percentCorrect*100)}%)
              </h5>
            </CardContent>
            </CardActionArea>
          </Card>

        <Dialog
        fullScreen
        open={open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
        >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h" color="inherit" className={classes.flex}>
          {testNumber} - {subject}
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{marginTop:100}}>
        <Card style={styles.card}>

        <Magnifier zoomFactor={.75} mgWidth={200} mgHeight={200} mgShape='square' src={panelLink}  />

            {question.length>0 &&
            <>
            <Divider />
            <CardContent>
              <h5>
                <b>Label:</b> {question}
              </h5>
            </CardContent>

            </>
            }

          </Card>
          </div>
        </Dialog>

      </div>
      </Fade>
    )
  }
}

export default PanelRow
