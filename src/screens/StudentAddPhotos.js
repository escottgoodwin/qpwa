import React,{Component} from 'react'
import '../css/App.css'
import axios from 'axios'
import * as Cookies from "js-cookie"
import LibCameraPhoto, { FACING_MODES, IMAGE_TYPES } from 'jslib-html5-camera-photo';

import LinearProgress from '@material-ui/core/LinearProgress';

import 'react-html5-camera-photo/build/css/index.css';
import WhiteFlash from '../components/WhiteFlash';
import DisplayError from '../components/DisplayError';
import { Form, Input } from 'semantic-ui-react'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import {getShowHideStyle,
  getVideoStyles,
  isDynamicPropsUpdate,
  playClickAudio,
  printCameraInfo} from '../helpers';
import '../css/camera.css';

import {PHOTO_LABEL_MUTATION} from '../ApolloQueries'

class StudentAddPhotos extends Component {
    constructor (props, context) {
      super(props, context);
      this.libCameraPhoto = null;
      this.showVideoTimeoutId = null;
      this.videoRef = React.createRef();

      this.state = {
        dataUri: '',
        isShowVideo: true,
        isCameraStarted: false,
        startCameraErrorMsg: '',
        label:'',
        progress:0,
        progressVisible:false,
        message:'',
        completeVisible:false,
      };
      this.handleTakePhoto = this.handleTakePhoto.bind(this);
      this.clearShowVideoTimeout = this.clearShowVideoTimeout.bind(this);
    }

    componentDidMount () {
      this.libCameraPhoto = new LibCameraPhoto(this.videoRef.current);
      const {idealFacingMode, idealResolution, isMaxResolution} = this.props;
      if (isMaxResolution) {
        this.startCameraMaxResolution(idealFacingMode);
      } else {
        this.startCameraIdealResolution(idealFacingMode, idealResolution);
      }
    }

    // eslint-disable-next-line
    UNSAFE_componentWillReceiveProps (nextProps) {
      if (isDynamicPropsUpdate(this.props, nextProps)) {
        const {idealFacingMode, idealResolution, isMaxResolution} = nextProps;
        this.restartCamera(idealFacingMode, idealResolution, isMaxResolution);
      }
    }

    componentWillUnmount () {
      this.clearShowVideoTimeout();
      const isComponentWillUnmount = true;
      this.stopCamera(isComponentWillUnmount)
        .catch((error) => {
          printCameraInfo(error.message);
        });
    }

    clearShowVideoTimeout () {
      if (this.showVideoTimeoutId) {
        clearTimeout(this.showVideoTimeoutId);
      }
    }

    restartCamera (idealFacingMode, idealResolution, isMaxResolution) {
      this.stopCamera()
        .then()
        .catch((error) => {
          printCameraInfo(error.message);
        })
        .then(() => {
          if (isMaxResolution) {
            this.startCameraMaxResolution(idealFacingMode);
          } else {
            this.startCameraIdealResolution(idealFacingMode, idealResolution);
          }
        });
    }

    startCamera (promiseStartCamera) {
      promiseStartCamera
        .then((stream) => {
          this.setState({
            isCameraStarted: true,
            startCameraErrorMsg: ''
          });
          if (typeof this.props.onCameraStart === 'function') {
            this.props.onCameraStart(stream);
          }
        })
        .catch((error) => {
          this.setState({startCameraErrorMsg: error.message});
          if (typeof this.props.onCameraError === 'function') {
            this.props.onCameraError(error);
          }
        });
    }

    startCameraIdealResolution (idealFacingMode, idealResolution) {
      let promiseStartCamera =
          this.libCameraPhoto.startCamera(idealFacingMode, idealResolution);
      this.startCamera(promiseStartCamera);
    }

    startCameraMaxResolution (idealFacingMode) {
      let promiseStartCamera =
          this.libCameraPhoto.startCameraMaxResolution(idealFacingMode);
      this.startCamera(promiseStartCamera);
    }

    stopCamera (isComponentWillUnmount = false) {
      return new Promise((resolve, reject) => {
        this.libCameraPhoto.stopCamera()
          .then(() => {
            if (!isComponentWillUnmount) {
              this.setState({ isCameraStarted: false });
            }
            if (typeof this.props.onCameraStop === 'function') {
              this.props.onCameraStop();
            }
            resolve();
          })
          .catch((error) => {
            if (typeof this.props.onCameraError === 'function') {
              this.props.onCameraError(error);
            }
            reject(error);
          });
      });
    }

    handleTakePhoto() {
      const {sizeFactor, imageType, imageCompression, isImageMirror, isSilentMode} = this.props;
      const configDataUri = { sizeFactor, imageType, imageCompression, isImageMirror };

      const token = Cookies.get('auth_token')

      if (!isSilentMode) {
        playClickAudio();
      }

      const { testId } = this.props.location.state
      let dataUri = this.libCameraPhoto.getDataUri(configDataUri);

      this.setState({
        dataUri,
        label:'',
        isShowVideo: false
      });

      this.clearShowVideoTimeout();
      this.showVideoTimeoutId = setTimeout(() => {
        this.setState({
          isShowVideo: true
        });
      }, 900);

      let apiUrl = 'https://api.cloudinary.com/v1_1/dkucuwpta/image/upload'

      this.setState({progressVisible:true})

      axios({
          url: apiUrl,
          method: 'post',
          headers: {
            'content-type': 'application/json'
          },
          data:{
            file: dataUri,
            upload_preset: "tx7xnbvf",
          },
          onUploadProgress: (progressEvent) => {
           let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
           this.setState({progress:percentCompleted})
         }
       }).then(response => {
          console.log(response.data.secure_url)
           return axios({
              url: 'https://qbe1.herokuapp.com/',
              method: 'post',
              headers: {
                authorization: token ? `Bearer ${token}` : "",
              },
              data: {
                query: PHOTO_LABEL_MUTATION,
                variables: { link: response.data.secure_url, label: this.state.label, testId: testId }
              },
            })
       })
       .then(data => {
         console.log(data)
         this.setState({message:'Uploaded!', completeVisible:true, progress:0, progressVisible:false})
       })
       .catch(err=> {
         this.setState({message:'Unable to upload photo. Please try again.',isVisibleError:true})
       })

    }

    render () {
      const {isImageMirror, isDisplayStartCameraError} = this.props;
      const isFullscreen = true
      let videoStyles = getVideoStyles(this.state.isShowVideo, isImageMirror);
      let showHideImgStyle = getShowHideStyle(!this.state.isShowVideo);

      let classNameFullscreen = isFullscreen ? 'react-html5-camera-photo-fullscreen' : '';
      return (
        <div className={'react-html5-camera-photo ' + classNameFullscreen}>
          <DisplayError
            cssClass={'display-error'}
            isDisplayError={isDisplayStartCameraError}
            errorMsg={this.state.startCameraErrorMsg}
          />
          <WhiteFlash
            isShowWhiteFlash={!this.state.isShowVideo}
          />
          <img
            style={showHideImgStyle}
            alt="camera"
            src={this.state.dataUri}
          />
          <video
            style={videoStyles}
            ref={this.videoRef}
            autoPlay={true}
            muted="muted"
            playsInline
          />

          {this.state.progressVisible &&
          <div style={{
          width:200,
          position: 'absolute',
          bottom: '150px',
          marginLeft:180,
          color:'white'}}>
          {this.state.progress}%
          <LinearProgress variant="determinate" value={this.state.progress} />
          </div>
        }

        {this.state.completeVisible &&
        <div style={{
        width:200,
        position: 'absolute',
        bottom: '150px',
        marginLeft:180,
        color:'green'}}>
        Uploaded!
        </div>
      }

          <div style={{
          position: 'absolute',
          bottom: '100px',
          width:200,
          marginLeft:180}}>

          <Form.Input
            control={Input}
            value={this.state.label}
            onChange={e => this.setState({ label: e.target.value })}
            placeholder='Label'
          />

          </div>

          <div style={{
            border:'solid',
            borderWidth:3,
            borderRadius:'50%',
            color:'red',
            position: 'absolute',
            left: '50%',
            bottom: '20px'}}>
          <PhotoCameraIcon style={{margin:10,color:'red',width: 40,
    height: 40,}}
            onClick={this.handleTakePhoto} />
            </div>
        </div>
      );
    }
  }

export default StudentAddPhotos
