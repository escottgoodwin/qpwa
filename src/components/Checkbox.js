import React from 'react'

export const CheckBox = props => {
    return (
      <li>
       <input key={props.panel_id} onClick={props.handleCheckChildElement} type="checkbox" checked={props.isChecked} value={props.panel_id} /> <img key={props.panel_id} style={{padding:10}}src={props.link} width="250" alt="golf"/>
      </li>
    )
}

export default CheckBox
