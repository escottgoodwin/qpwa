import React from 'react';
import '../css/App.css';

const Error = props =>

        <div className="dashboard">

          <div className="signin">

          <h2>Error</h2>

          <h4>
          {props !== null && props.message}
          </h4>

          </div>

        </div>

export default Error;
