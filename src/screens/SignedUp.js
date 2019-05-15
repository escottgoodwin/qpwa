import React,{Component} from 'react';
import {withRouter} from "react-router-dom"
import '../css/App.css';

const divStyle = {
  padding: '20px',
};

class SignedUp extends Component {

    render() {

      return (
      <div className="dashboard">
      <div className="signin">
      <div style={divStyle}>
      <h2>{this.props.location.state.authMsg}</h2>
      </div>
      <div style={divStyle}>

      </div>
      <div style={divStyle}>

      </div>
      </div>
      </div>

  )
}
}


export default withRouter(SignedUp) ;
