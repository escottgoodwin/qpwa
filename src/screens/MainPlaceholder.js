import React from 'react'
import { Segment } from 'semantic-ui-react'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';

const MainPlaceholder = () => (

<SkeletonTheme  >
  <div className="main">
    <div className="container">
      <div style={{padding:"15px",width:"500px",margin:'auto'}}>

          <center>
          <div >
            <Skeleton width={250} height={25} count={1} />
          </div>
          <div >
            <Skeleton width={100} height={50}count={1} />
          </div>
          <div >
            <Skeleton width={200} count={1} />
        </div>
        </center>

      </div>
      <div className="coursecontainer">


      <Segment >
        <div className="course_row">

        <div style={{width:'200px',paddingLeft:'20px'}}>
        <Skeleton count={1} />
        </div>

        <div style={{width:'100px',paddingLeft:'20px'}}>

        <Skeleton count={1} />

        </div>

        <div style={{width:'100px',paddingLeft:'20px'}}>

        <Skeleton count={1} />

        </div>

        <div style={{width:'100px',paddingLeft:'20px'}}>

        <Skeleton count={1} />

        </div>

        <div style={{width:'100px',paddingLeft:'15px'}}>

        <Skeleton count={1} />

        </div>

        </div>

        </Segment >

        <Segment >
          <div className="course_row">

          <div style={{width:'200px',paddingLeft:'20px'}}>
          <Skeleton count={1} />
          </div>

          <div style={{width:'100px',paddingLeft:'20px'}}>

          <Skeleton count={1} />

          </div>

          <div style={{width:'100px',paddingLeft:'20px'}}>

          <Skeleton count={1} />

          </div>

          <div style={{width:'100px',paddingLeft:'20px'}}>

          <Skeleton count={1} />

          </div>

          <div style={{width:'100px',paddingLeft:'15px'}}>

          <Skeleton count={1} />

          </div>

          </div>

          </Segment >

          <Segment >
            <div className="course_row">

            <div style={{width:'200px',paddingLeft:'20px'}}>
            <Skeleton count={1} />
            </div>

            <div style={{width:'100px',paddingLeft:'20px'}}>

            <Skeleton count={1} />

            </div>

            <div style={{width:'100px',paddingLeft:'20px'}}>

            <Skeleton count={1} />

            </div>

            <div style={{width:'100px',paddingLeft:'20px'}}>

            <Skeleton count={1} />

            </div>

            <div style={{width:'100px',paddingLeft:'15px'}}>

            <Skeleton count={1} />

            </div>

            </div>

            </Segment >

      </div>
    </div>
  </div>
</SkeletonTheme  >
)

export default MainPlaceholder
