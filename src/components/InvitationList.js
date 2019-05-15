import React from 'react';
import '../css/App.css';

import InvitationRow from './InvitationRow'

const InvitationList = (props) =>
<div>


  <div className="coursecontainer">
    {props.invites.map(invite =>
      <InvitationRow key={invite.id} userid={props.userid} invite={invite} />
    )}
  </div>
    </div>

export default InvitationList
