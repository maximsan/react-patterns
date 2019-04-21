// State Initializers

import React from 'react'
import {Switch} from '../switch'

const callAll = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args))

class Toggle extends React.Component {
  static defaultProps = {
      initialOn: false,
      reset: () => {},
  }

  initalState = {on: this.props.initialOn}
  state = this.initalState;
  reset = () => {
      this.setState(this.initalState, () => {
        this.props.onReset(this.state.on);
      });
  }
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  getTogglerProps = ({onClick, ...props} = {}) => {
    return {
      'aria-pressed': this.state.on,
      onClick: callAll(onClick, this.toggle),
      ...props,
    }
  }
  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      reset: this.reset,
      getTogglerProps: this.getTogglerProps,
    }
  }
  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}

function Usage({
  initialOn = false,
  onToggle = (...args) => console.log('onToggle', ...args),
  onReset = (...args) => console.log('onReset', ...args),
}) {
  return (
    <Toggle
      initialOn={initialOn}
      onToggle={onToggle}
      onReset={onReset}
    >
      {({getTogglerProps, on, reset}) => (
        <div>
          <Switch {...getTogglerProps({on})} />
          <hr />
          <button onClick={() => reset()}>Reset</button>
        </div>
      )}
    </Toggle>
  )
}
Usage.title = 'State Initializers'

export {Toggle, Usage as default}
