import React, { Component, PropTypes } from 'react';
import styles from './index.less';

class Flicker extends Component {

  static propTypes = {
    time: PropTypes.number,
  };
  static defaultProps = {
    time: 3000,
  };

  render() {
    const {
      time,
      children,
    } = this.props;
    return time ? (
      <div className={styles.main}>{children}</div>
    ) : null;
  }
}

export default Flicker;
