import React from 'react'
import { Segment } from 'semantic-ui-react'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

const MainPlaceholder = () => (

<SkeletonTheme  >
  <div className="main">
    <div className="container">
      <div style={{padding:"15px",width:"500px",margin:'auto'}}>

          <Skeleton count={4} />

      </div>
      <div className="coursecontainer">
        <Segment>
          <Skeleton count={1} />
          <hr/>
          <Skeleton count={1} />
        </Segment >

        <Segment>
        <Skeleton count={1} />
        <hr/>
        <Skeleton count={1} />
        </Segment >
        <Segment>
        <Skeleton count={1} />
        <hr/>
        <Skeleton count={1} />
        </Segment >
      </div>
    </div>
  </div>
</SkeletonTheme  >
)

export default MainPlaceholder
