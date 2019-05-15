import React from 'react';
import '../css/App.css';
import { Button } from 'semantic-ui-react'

import {Link} from 'react-router-dom'


const Nav = (props) =>

  <div className="header">
    <div className="sign-button">

    </div>
    <div>
    <Link  to="/"><div><Button size='large' basic color='blue'>Quandrio</Button></div></Link>
    </div>
    <div className="sign-button">

    </div>
  </div>

export default Nav
