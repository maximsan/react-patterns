// prop getters

import React, {useState, useCallback} from 'react';
import {Switch} from '../switch';

const noop = () => {};

const useToggle = ({onToggle = noop} = {}) => {
  const [on, setOn] = useState(false);

  const toggle = useCallback(() => {
    setOn(!on);
    onToggle(!on);
  }, [on, onToggle]);

  const onHandleClick = useCallback(
    ({onClick, ...args}) => {
      onClick && onClick(...args);
      toggle();
    },
    [toggle],
  );

  const getTogglerProps = ({onClick, ...props}) => ({
    'aria-pressed': on,
    onClick: onHandleClick,
    ...props,
  });

  return {
    on,
    toggle,
    getTogglerProps,
  };
};

function Usage() {
  const {on, getTogglerProps} = useToggle({
    onToggle: (...args) => console.log('onToggle', ...args),
  });
  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.log('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  );
}
Usage.title = 'Prop Collections';

export default Usage;
