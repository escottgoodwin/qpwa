import React from 'react';
import '../css/App.css';
import { Progress, Button, Row, Col } from 'reactstrap';
import { Card, Button, Row, Col } from 'reactstrap';
import ReactDataGrid from 'react-data-grid'


const SelectGridPanel = (props) =>

      <div>

      <Row>
        <Col >
          <Card className="card" body>
          <div>
          Hold Shift to Select Range of Images
          <div>
        <span>{this.state.selectedIndexes.length} {rowText} selected</span>
        <ReactDataGrid
          rowKey="id"
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          rowSelection={{
            showCheckbox: true,
            enableShiftSelect: true,
            onRowsSelected: this.onRowsSelected,
            onRowsDeselected: this.onRowsDeselected,
            selectBy: {
              indexes: this.state.selectedIndexes
            }
          }} />
      </div>

        </div>
          </Card>
        </Col>
      </Row>
      </div>

export default SelectGridPanel
