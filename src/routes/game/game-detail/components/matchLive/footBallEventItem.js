import React, { PureComponent, PropTypes } from 'react';
import styles from './footBallEventItem.less';

class FootBallEventItem extends PureComponent {

  static propTypes = {
    isChange: PropTypes.bool,
    time: PropTypes.string,
    type: PropTypes.number,
  };

  render() {
    const { time, type, isChange } = this.props;
    return (
      <div className={styles.main}>
        {
          isChange ? (
            <div>
              <div className={styles.item}><i className={styles[`type-${type}`]} /></div>
              <div className={styles.line} />
              <div className={styles.item}>{time}</div>
            </div>
          ) : (
            <div>
              <div className={styles.item}>{time}</div>
              <div className={styles.line} />
              <div className={styles.item}><i className={styles[`type-${type}`]} /></div>
            </div>
          )
        }
      </div>
    );
  }
}

export default FootBallEventItem;
