// Compound Components

import React, {useState} from 'react';
import {Switch} from '../switch';

const hasComponentChild = child => {
    for(const prop in Toggle) {
        if(Toggle.hasOwnProperty(prop)) {
            if(child.type === Toggle[prop]) {
                return true;
            }
        }
    }
    return false;
}

const Toggle = ({onToggle, children}) => {
  const [on, setOn] = useState(false);
  const toggle = () => {
    setOn(!on);
    onToggle(!on);
  };

  return React.Children.map(children, child => 
    hasComponentChild(child) ? React.cloneElement(child, {on, toggle}) : child);
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
