import React,{Component} from 'react';
import '../css/App.css';

class NotAuthorized extends Component {

    render() {

      return (
      <div className="dashboard">
      <div className="signin">
      <h2>Not Authorized</h2>
      <div>You are not authorized</div>

      </div>
      </div>

  )
}

}

export default NotAuthorized;
