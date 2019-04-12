// prop collections

import React, {useState} from 'react';
import {Switch} from '../switch';

const Toggle = ({onToggle, children, ...rest}) => {
  const [on, setOn] = useState(false);
  const toggle = () => {
    setOn(!on);
    onToggle(!on);
  };

    return {
      on: on,
      toggle: toggle,
      togglerProps: {
        onClick: toggle,
        'aria-pressed': on,
      },
    };
};

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      {({on, togglerProps}) => (
        <div>
          <Switch on={on} {...togglerProps} />
          <hr />
          <button aria-label="custom-button" {...togglerProps}>
            {on ? 'on' : 'off'}
          </button>
        </div>
      )}
    </Toggle>
  );
}
Usage.title = 'Prop Collections';

export {Toggle, Usage as default};
