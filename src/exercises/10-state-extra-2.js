// control props

import React from 'react';
import {Switch} from '../switch';

class Toggle extends React.Component {
  state = {on: false, off: false};
  isControlled = prop => {
    return this.props[prop] !== undefined;
  };

  getState = (state = this.state) => {
    return Object.entries(this.state).reduce(
      (combinedState, [key, value]) => {
        if (this.isControlled(key)) {
          combinedState[key] = this.props[key];
        } else {
          combinedState[key] = value;
        }
        return combinedState;
      },
      {},
    );
  };

  onStateChange = (changes, callback) => {
    let allChanges;
    this.setState(
      state => {
        const combinedState = this.getState(state);
        const changesObject =
          typeof changes === 'function'
            ? changes(combinedState)
            : changes;
        allChanges = changesObject;
        const nonControlledChanges = Object.entries(
          allChanges,
        ).reduce((newChanges, [key, value]) => {
          if (!this.isControlled(key)) {
            newChanges[key] = value;
          }
          return newChanges;
        }, {});

        return Object.keys(nonControlledChanges).length
          ? nonControlledChanges
          : null;
      },
      () => {
        this.props.onStateChange(allChanges);
        callback();
      },
    );
  };

  toggle = () => {
    if (this.isControlled('on')) {
      this.props.onToggle(!this.getState().on);
    } else {
      this.setState(
        ({on}) => ({on: !on}),
        () => {
          this.props.onToggle(this.getState().on);
        },
      );
    }
  };
  render() {
    return <Switch on={this.getState().on} onClick={this.toggle} />;
  }
}

// 💯 Add support for an `onStateChange` prop which is called whenever any
// state changes. It should be called with `changes` and `state`
// 💯 Add support for a `type` property in the `changes` you pass to
// `onStateChange` so consumers can differentiate different state changes.

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
class Usage extends React.Component {
  state = {bothOn: false};
  handleToggle = on => {
    this.setState({bothOn: on});
  };
  render() {
    const {bothOn} = this.state;
    const {toggle1Ref, toggle2Ref} = this.props;
    return (
      <div>
        <Toggle
          on={bothOn}
          onToggle={this.handleToggle}
          ref={toggle1Ref}
        />
        <Toggle
          on={bothOn}
          onToggle={this.handleToggle}
          ref={toggle2Ref}
        />
      </div>
    );
  }
}
Usage.title = 'Control Props';

export {Toggle, Usage as default};
