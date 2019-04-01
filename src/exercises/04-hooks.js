// custom hooks

import React, {useState} from 'react';
import {Switch} from '../switch';

const noop = () => {};
const useToggle = ({onToggle = noop} = {}) => {
  const [on, setOn] = useState(false);

  const toggle = () => {
    setOn(!on);
    onToggle(!on);
  };

  return [on, toggle];
};

function Usage() {
  const [on, toggle] = useToggle({
    onToggle: (...args) => console.log('onToggle', ...args),
  });

  return <Switch on={on} onClick={toggle} />;
}
Usage.title = 'Custom hooks';

export default Usage;
