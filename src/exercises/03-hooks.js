// Flexible Compound Components with context

import React, {
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react';
import {Switch} from '../switch';

const ToggleContext = React.createContext();

function useToggleContext() {
  const toggleContext = useContext(ToggleContext);
  if (!toggleContext)
    throw new Error('Toggle should be within the toggle context');
  return toggleContext;
}

const Toggle = ({onToggle, ...rest}) => {
  const [on, setOn] = useState(false);

  const toggle = useCallback(() => {
    setOn(!on);
    onToggle(!on);
  }, [onToggle, on]);

  const value = useMemo(() => ({on: on, toggle: toggle}), [
    on,
    toggle,
  ]);

  return <ToggleContext.Provider value={value} {...rest} />;
};

Toggle.On = function On({children}) {
  const {on} = useToggleContext();
  return on ? children : null;
};

Toggle.Off = function Off({children}) {
  const {on} = useToggleContext();
  return !on ? children : null;
};

Toggle.Button = function Button(props) {
  const {on, toggle} = useToggleContext();
  return <Switch on={on} onClick={toggle} {...props} />;
};

function Usage() {
  return (
    <div onToggle={(...args) => console.log('onToggle', ...args)}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <div>
        <Toggle.Button />
      </div>
    </div>
  );
}
Usage.title = 'Flexible Compound Components';

export {Toggle, Usage as default};
