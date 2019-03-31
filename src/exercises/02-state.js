// Compound Components

import React from 'react';
import {Switch} from '../switch';

class Toggle extends React.Component {
  state = {on: false};
  onHandleToggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    );

  static On = props => <>{props.on ? props.children : null}</>;
  static Off = props => <>{!props.on ? props.children : null}</>;
  static Button = props => (
    <Switch onClick={props.toggle} on={props.on} {...props} />
  );

  render() {
    const {on} = this.state;
    const {onHandleToggle} = this;
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(
        child,
        {on, toggle: onHandleToggle},
        null,
      );
    });
  }
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  );
}
Usage.title = 'Compound Components';

export {Toggle, Usage as default};
