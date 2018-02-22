import React, { Component, PropTypes } from 'react';
import { Button } from 'antd-mobile';
import classnames from 'classnames';
import styles from './index.less';

class MaskLayer extends Component {
  static propTypes = {
    desc: PropTypes.string,
    buttonText: PropTypes.string,
    visible: PropTypes.bool,
    buttonCb: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
  };

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  render() {
    const {
      children,
      desc,
      buttonText,
      visible,
      buttonCb,
    } = this.props;
    const wrapCls = classnames({
      [styles.wrap]: true,
      [styles.visible]: visible,
    })
    return (
      <div className={wrapCls}>
        {
          visible &&
          <div className={styles.main}>
            <div className={styles.content}>
              <div className={styles.desc}>{desc}</div>
              <Button
                onTouchTap={buttonCb}
                className={styles.button}
              >{buttonText}</Button>
            </div>
          </div>
        }
        {children}
      </div>
    );
  }
}

export default MaskLayer;
