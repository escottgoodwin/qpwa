import React,{Component} from 'react'
import { Segment } from 'semantic-ui-react'

import Skeleton, {SkeletonTheme} from 'react-loading-skeleton';


class Placeholder1 extends Component {
  render() {
    return (

  <SkeletonTheme  >


  <Skeleton count={8} />


  </SkeletonTheme>
)
}
}

export default Placeholder1;
