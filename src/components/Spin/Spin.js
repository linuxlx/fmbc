import React, { PureComponent, PropTypes } from 'react';
import { Icon } from 'antd-mobile';
import styles from './index.less';

class Spin extends PureComponent {

  static propTypes = {
    spinning: PropTypes.bool,
    tip: PropTypes.string,
    delay: PropTypes.number,
    loadingElement: PropTypes.node,
  }
  static defaultProps = {
    tip: '',
    spinning: true,
    delay: 300,
    loadingElement: (<Icon type="loading" />),
  };

  state = {
    spinning: this.props.spinning,
  };

  componentWillReceiveProps(nextProps) {
    const currentSpinning = this.props.spinning;
    const spinning = nextProps.spinning;
    const delay = this.props.delay;

    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }

    if (currentSpinning && !spinning) {
      this.setState({ spinning });
    } else if (spinning && delay && !isNaN(Number(delay))) {
      this.delayTimeout = setTimeout(() => {
        this.setState({ spinning });
      }, delay);
    } else {
      this.setState({ spinning });
    }
  }

  componentWillUnmount() {
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  }

  render() {
    const { tip, children, loadingElement } = this.props;
    const { spinning } = this.state;


    return spinning ? (
      <div className={styles.wrap}>
        {loadingElement}
        <div>{tip}</div>
      </div>
    ) : children;
  }
}

export default Spin;
