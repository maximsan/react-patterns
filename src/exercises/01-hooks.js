// Building the toggle component

import React, {useState} from 'react'
import {Switch} from '../switch'

const Toggle = ({onToggle}) => {
  const [on, setOn] = useState(false)
  const onHandleToggle = () => {
    setOn(!on);
    onToggle(!on);
  }

  return <Switch on={on} onClick={onHandleToggle} />
}

function Usage() {
  return <Toggle onToggle={(...args) => console.log('onToggle', ...args)} />
}

Usage.title = 'Build Toggle'

export default Usage;
