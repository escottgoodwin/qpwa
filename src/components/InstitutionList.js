import React from 'react';
import '../css/App.css';

import InstitutionRow from './InstitutionRow'

const InstitutionList = (props) =>
<div>

  <div className="coursecontainer">
    {props.courses.map(institution =>
      <InstitutionRow key={institution.id} {...institution} />
    )}
  </div>
</div>

export default InstitutionList
