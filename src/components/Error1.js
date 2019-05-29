import React from 'react';
import '../css/App.css';

const Error =  props =>

        <div className="dashboard">
        {console.log(props)}
          <div className="signin">
          <h2>Error</h2>
          <h4>{props !== null  &&
          props.message}
          </h4>
          <h4>{props.graphQLErrors !== null || props.graphQLErrors.length>0 &&
          props.graphQLErrors.map(error => error.message)}
          </h4>
          <h4>{props.networkError !== null || props.networkError.length>0 &&
            props.networkError.message}
          </h4>
          </div>
        </div>

export default Error;
