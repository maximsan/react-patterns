// custom hooks

import React, {useState, useCallback} from 'react';
import {Switch} from '../switch';

const noop = () => {};
const useToggle = ({onToggle = noop} = {}) => {
  const [on, setOn] = useState(false);

  const toggle = useCallback(() => {
    setOn(!on);
    onToggle(!on);
  }, [on, onToggle]);

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
