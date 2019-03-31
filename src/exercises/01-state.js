import React from 'react';
import {Switch} from '../switch';

class Toggle extends React.Component {
  state = {on: false};

  onHandleToggle = () => {
    const {on} = this.state;
    const {onToggle} = this.props;
    this.setState(({on}) => ({on: !on}), () => onToggle(!on));
  };

  render() {
    const {on} = this.state;
    return <Switch on={on} onClick={this.onHandleToggle} />;
  }
}

function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return <Toggle onToggle={onToggle} />;
}
Usage.title = 'Build Toggle';

export {Toggle, Usage as default};
