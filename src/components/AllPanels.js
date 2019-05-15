import React from 'react';
import '../css/App.css';

const AllPanels = (props) =>
      <div >
      <center>

      <div>
      Panels: {props.panel.panels.length}
      </div>
      <div>
      {props.panel.panels.map(panel =>
        <div>
        <label key={panel.panel_id} style={{padding:10}}>2/3<img onMouseOver={e => console.log(e)}  width="250"  key={panel.panel_id} src={panel.link} alt="" /></label>

        </div>
        )}
    </div>
      </center>
      </div>

export default AllPanels
