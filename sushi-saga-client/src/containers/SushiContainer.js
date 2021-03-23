import React, { Fragment } from 'react'
import MoreButton from '../components/MoreButton'
import Sushi from '../components/Sushi'

const SushiContainer = (props) => {
  return (
    <Fragment>
      <div className="belt">
        {props.sushis.map((sushiData) => <Sushi sushi={sushiData} handleAteSushi={props.handleAteSushi} ate={props.ate}/>)}
        <MoreButton handleClick={props.handleClick}/>
      </div>
    </Fragment>
  )
}

export default SushiContainer