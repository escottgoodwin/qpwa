import React from 'react';
import '../css/App.css';

import InvitationRow from './InvitationRow1'

const InvitationList = (props) =>
<div>

    {props.invites.map(invite =>
      <InvitationRow key={invite.id} userid={props.userid} invite={invite} />
    )}

    </div>

export default InvitationList
