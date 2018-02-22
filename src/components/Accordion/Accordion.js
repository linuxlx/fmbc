import React, { Component } from 'react';
import styles from './Accordion.less';

class Accordion extends Component {
  state = {
    activeKey: this.props.defaultActiveKey ? this.props.defaultActiveKey : this.props.activeKey,
  }

  render() {
    const { children } = this.props;

    return (
      <div className={styles.accordion}>
        {children}
      </div>
    )
  }

}

export default Accordion;
