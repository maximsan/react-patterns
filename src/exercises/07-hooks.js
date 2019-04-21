// State Initializers

import React, {useReducer} from 'react'
import {Switch} from '../switch'

const callAll = (...fns) => (...args) => 
                fns.forEach(fn => fn && fn(...args))

const noop = () => {}

function toggleReducer(state, {type, initialState}) {
  switch (type) {
    case 'toggle': {
      return {on: !state.on}
    }
    case 'reset' : {
        return {initialState}
    }
    default: {
      throw new Error(`Unsupported type: ${type}`)
    }
  }
}

function useToggle({onToggle = noop, onReset = noop, initialOn = false} = {}) {
  //save initialState to be the same during all the life of the component
  const {current: initialState} =  React.useRef({on: initialOn});
  const [state, dispatch] = useReducer(toggleReducer, 
                                initialState)
  
  const {on} = state

  function toggle() {
    dispatch({type: 'toggle'})
    onToggle(!on)
  }

  function reset() {
      dispatch({type: 'reset', initialState})
      onReset({on});
  }

  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    }
  }

  return {
    on,
    toggle,
    reset,
    getTogglerProps,
  }
}

function Usage() {
  const {on, getTogglerProps, reset} = useToggle({
    onToggle: (...args) => console.info('onToggle', ...args),
    onReset: (...args) => console.info('onReset', ...args),
    initialOn: false,
  })
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button onClick={reset}>Reset</button>
    </div>
  )
}
Usage.title = 'State Initializers'

export default Usage