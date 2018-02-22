import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Icon } from 'antd-mobile';
import styles from './Accordion.less';
import { isType } from '../../utils/commonFunctions';

class Panel extends Component {
  static componentName = 'Panel';
  static propTypes = {
    onChange: PropTypes.func,
    activeKey: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number]),
  }

  keyId = !isType(this.props.keyId, 'Undefined') && !isType(this.props.keyId, 'Null') ? this.props.keyId : `${Date.now()}|${Math.random()}`;

  handelChange = (event) => {
    event.preventDefault();
    const { onChange, openDetailForKey } = this.props;
    openDetailForKey(this.keyId)
    if (onChange) {
      onChange(this.keyId, event)
    }
  }

  render() {
    const { HeaderEle, children } = this.props;
    const foldClassName = classNames({
      [styles['accordion-panel-fold']]: true,
      [styles['accordion-panel-fold-active']]: this.props.activeKey === this.keyId,
    })
    const detailClassName = classNames({
      [styles['accordion-panel-detail']]: true,
      [styles['accordion-panel-detail-close']]: this.props.activeKey !== this.keyId,
    })
    return (
      <div className={styles['accordion-panel']}>
        <div className={styles['accordion-panel-header']} onTouchTap={this.handelChange}>
          <div className={styles.iconBox}>
            <Icon type="down" className={foldClassName} />
          </div>
          {HeaderEle}
        </div>
        <div className={detailClassName}>
          {
            children
          }
        </div>
      </div>
    )
  }


}

export default Panel;
