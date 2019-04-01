// Flexible Compound Components with context

import React from 'react';
import {Switch} from '../switch';

const ToggleContext = React.createContext();

const ToggleConsumer = props => {
    <ToggleContext.Consumer>
        {context => {
            if(!context)
                throw new Error(`Toggle should be within the toggle context`);
            return props.children(context);
        }}
    </ToggleContext.Consumer>
}

class Toggle extends React.Component {
  static On = ({children}) => (
    <ToggleConsumer>
      {value => (value.on ? children : null)}
    </ToggleConsumer>
  );

  static Off = ({children}) => (
    <ToggleConsumer>
      {value => (!value.on ? children : null)}
    </ToggleConsumer>
  );

  static Button = props => (
    <ToggleConsumer>
      {value => (
        <Switch on={value.on} onClick={value.toggle} {...props} />
      )}
    </ToggleConsumer>
  );

  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    );

  state = {on: false};

  render() {
    return (
      <ToggleContext.Provider
        value={{on: this.state.on, toggle: this.toggle}}
      >
        {this.props.children}
      </ToggleContext.Provider>
    );
  }
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </Toggle>
  );
}
Usage.title = 'Flexible Compound Components';

export {Toggle, Usage as default};
