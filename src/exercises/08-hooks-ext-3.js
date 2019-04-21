// state reducer

import React, {useReducer} from 'react';
import {Switch} from '../switch';

const callAll = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args));

const noop = () => {};

function toggleReducer(state, {type, initialState}) {
  switch (type) {
    case toggleReducer.types.toggle: {
      return {on: !state.on};
    }
    case toggleReducer.types.reset: {
      return initialState;
    }
    default: {
      throw new Error(`Unsupported type: ${type}`);
    }
  }
}

function useReducerWithValidation(
  reducer,
  initialState,
  initializer = f => f,
) {
  const inialStateKeys = React.useState(
    () => Object.keys(initializer(initialState)),
    [],
  )[0];

  function validationReducer(state, action) {
    const newState = reducer(state, action);
    const extraKeys = Object.keys(newState).filter(
      key => !inialStateKeys.includes(key),
    );
    if (extraKeys && extraKeys.length > 0) {
      console.warn(
        `Warning! The following keys were unexpectedly added to the reducer's state: ${extraKeys.join(
          ', ',
        )}`,
      );
    }
    return newState;
  }
  return useReducer(
    process.env.NODE_ENV === 'production'
      ? reducer
      : validationReducer,
    initialState,
    initializer,
  );
}

function useToggle({
  onToggle = noop,
  onReset = noop,
  initialOn = false,
  reducer = toggleReducer,
} = {}) {
  const {current: initialState} = React.useRef({on: initialOn});
  const [state, dispatch] = useReducerWithValidation(
    reducer,
    initialState,
  );

  const {on} = state;

  function toggle() {
    const newOn = !on;
    dispatch({type: toggleReducer.types.toggle});
    onToggle(newOn);
  }

  function reset() {
    dispatch({type: toggleReducer.types.reset, initialState});
    onReset(initialState.on);
  }

  function getTogglerProps({onClick, ...props} = {}) {
    return {
      'aria-pressed': on,
      onClick: callAll(onClick, toggle),
      ...props,
    };
  }

  return {
    on,
    reset,
    toggle,
    getTogglerProps,
  };
}

useToggle.reducer = toggleReducer;

toggleReducer.types = {
  reset: 'reset',
  toggle: 'toggle',
};

function Usage() {
  const [timesClicked, setTimesClicked] = React.useState(0);

  function toggleStateReducer(state, action) {
    if (
      action.type === toggleReducer.types.toggle &&
      timesClicked >= 4
    ) {
      return {on: state.on, foo: 'foo!!!'};
    }
    return useToggle.reducer(state, action);
  }

  const {on, getTogglerProps, reset} = useToggle({
    reducer: toggleStateReducer,
    onToggle: (...args) => {
      setTimesClicked(clicks => clicks + 1);
      console.info('onToggle', ...args);
    },
    onReset: (...args) => {
      setTimesClicked(0);
      console.info('onReset', ...args);
    },
  });

  return (
    <div>
      <Switch
        {...getTogglerProps({
          on: on,
        })}
      />
      {timesClicked >= 4 ? (
        <div data-testid="notice">
          Whoa, you clicked too much!
          <br />
        </div>
      ) : timesClicked > 0 ? (
        <div data-testid="click-count">
          Click count: {timesClicked}
        </div>
      ) : null}
      <button onClick={reset}>Reset</button>
    </div>
  );
}
Usage.title = 'State Reducers';

export default Usage;
