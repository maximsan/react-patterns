// Compound Components

import React, {useState} from 'react';
import {Switch} from '../switch';

const Toggle = ({onToggle, children}) => {
  const [on, setOn] = useState(false);
  const toggle = () => {
    setOn(!on);
    onToggle(!on);
  };

  return React.Children.map(children, child => 
    React.cloneElement(child, {on, toggle}, null));
};

Toggle.On = ({on, children}) => <>{on ? children : null}</>;
Toggle.Off = ({on, children}) => <>{!on ? children : null}</>;
Toggle.Button = ({on, toggle, ...props}) => (
  <Switch onClick={toggle} on={on} {...props} />
);

function Usage() {
  return (
    <Toggle onToggle={(...args) => console.log('onToggle', ...args)}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  );
}
Usage.title = 'Compound Components';

export {Toggle, Usage as default};
