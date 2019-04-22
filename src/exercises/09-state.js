// state reducer with types

import React from 'react';
import {Switch} from '../switch';

const callAll = (...fns) => (...args) =>
  fns.forEach(fn => fn && fn(...args));

class Toggle extends React.Component {
  static defaultProps = {
    initialOn: false,
    onReset: () => {},
    stateReducer: (state, changes) => changes,
  };

  initialState = {on: this.props.initialOn};

  state = this.initialState;

  internalSetState(changes, callback) {
    this.setState(state => {
      // handle function setState call
      const changesObject =
        typeof changes === 'function' ? changes(state) : changes;
      // apply state reducer
      const reducedChanges =
        this.props.stateReducer(state, changesObject) || {};

      const {type: ignoredType, ...onlyChanges} = reducedChanges;
      return Object.keys(onlyChanges).length ? reducedChanges : null;
    }, callback);
  }
  reset = () =>
    this.internalSetState(
      {...this.initialState, type: Toggle.types.reset},
      () => this.props.onReset(this.state.on),
    );
  toggle = ({type = Toggle.types.toggle} = {}) =>
    this.internalSetState(
      ({on}) => ({type, on: !on}),
      () => this.props.onToggle(this.state.on),
    );
  getTogglerProps = ({onClick, ...props} = {}) => ({
    onClick: callAll(onClick, () => this.toggle()),
    'aria-pressed': this.state.on,
    ...props,
  });
  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      reset: this.reset,
      getTogglerProps: this.getTogglerProps,
    };
  }
  render() {
    return this.props.children(this.getStateAndHelpers());
  }
}

Toggle.types = {
  toggle: 'toggle',
  reset: 'reset',
};

class Usage extends React.Component {
  static defaultProps = {
    onToggle: (...args) => console.log('onToggle', ...args),
    onReset: (...args) => console.log('onReset', ...args),
  };
  initialState = {timesClicked: 0};
  state = this.initialState;
  handleToggle = (...args) => {
    this.setState(({timesClicked}) => ({
      timesClicked: timesClicked + 1,
    }));
    this.props.onToggle(...args);
  };
  handleReset = (...args) => {
    this.setState(this.initialState);
    this.props.onReset(...args);
  };
  toggleStateReducer = (state, changes) => {
    if (changes.type === 'forced') {
      return changes;
    }
    if (this.state.timesClicked >= 4) {
      return {...changes, on: false};
    }
    return changes;
  };
  render() {
    const {timesClicked} = this.state;
    return (
      <Toggle
        stateReducer={this.toggleStateReducer}
        onToggle={this.handleToggle}
        onReset={this.handleReset}
        ref={this.props.toggleRef}
      >
        {({on, toggle, reset, getTogglerProps}) => (
          <div>
            <Switch
              {...getTogglerProps({
                on: on,
              })}
            />
            {timesClicked > 4 ? (
              <div data-testid="notice">
                Whoa, you clicked too much!
                <br />
                <button onClick={() => toggle({type: 'forced'})}>
                  Force Toggle
                </button>
                <br />
              </div>
            ) : timesClicked > 0 ? (
              <div data-testid="click-count">
                Click count: {timesClicked}
              </div>
            ) : null}
            <button onClick={reset}>Reset</button>
          </div>
        )}
      </Toggle>
    );
  }
}
Usage.title = 'State Reducers (with change types)';

export {Toggle, Usage as default};

/* eslint
"no-unused-vars": [
  "warn",
  {
    "argsIgnorePattern": "^_.+|^ignore.+",
    "varsIgnorePattern": "^_.+|^ignore.+",
    "args": "after-used"
  }
]
 */
