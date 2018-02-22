import React, { PureComponent } from 'react';

class MatchLive extends PureComponent {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

export default MatchLive;
