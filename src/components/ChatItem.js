import React from 'react';
import '../css/App.css';
import moment from 'moment'

import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import ListItem from '@material-ui/core/ListItem';

const ChatItem = (props) =>

  <>
  {props.userId1 === props.userId ?
    <>
  <ListItem alignItems="flex-start">

  <div style={{borderRadius:'1px 15px 15px 15px',alignText:'left',backgroundColor:blue[700],padding:10,color:'white'}}>

    {props.message}

  </div>

  </ListItem>

  <ListItem alignItems="flex-start">
  <div style={{color:'lightGrey',fontSize:12}}>
  {moment(props.addedTime).format('MMMM Do YYYY, h:mm:ss a')}
  </div>
  </ListItem>
  </>

  :

  <>
  <div style={{float:'right'}}>
  <ListItem >

  <div style={{borderRadius:'15px 1px 15px 15px',alignText:'right',backgroundColor:blueGrey[200],padding:10,color:'black'}}>

    {props.message}

  </div>

  <div style={{alignText:'right', marginLeft:10}}>

  {props.firstName} {props.lastName}

  </div>

  </ListItem>
  <div style={{float:'right'}}>
  <ListItem >
    <div style={{color:'lightGrey',fontSize:12,alignText:'right',}}>
    {moment(props.addedTime).format('MMMM Do YYYY, h:mm a')}
    </div>
  </ListItem>
  </div>
  </div>
  </>
}
</>

export default ChatItem
