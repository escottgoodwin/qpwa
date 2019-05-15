import React,{Component} from 'react';
import '../css/App.css';
import { Loader } from 'semantic-ui-react'


class Loading extends Component {

    render() {

      return (
        <div className="main">
        <div className="dashboard">
          <div className="signin">
          <Loader  active/>
      <div>
      </div>
      </div>
      </div>
      </div>

  )
}
}


export default Loading;
