import React from 'react';
import { connect } from 'dva';

import GameLayout from './game-layout';

const mapDispatchToProps = () => ({

})

@connect(null, mapDispatchToProps)
class Container extends React.Component {
  componentWillMount() {
  }
  render() {
    return <GameLayout {...this.props} />
  }
}

export default Container;
