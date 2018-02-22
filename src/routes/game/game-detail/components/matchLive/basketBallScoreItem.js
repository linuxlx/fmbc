import React, { PureComponent, PropTypes } from 'react';
import styles from './basketBallScoreItem.less';

class BasketBallScoreItem extends PureComponent {
  static propTypes = {
    sessionName: PropTypes.string,
    homeScore: PropTypes.node,
    guestScore: PropTypes.node,
  };

  render() {
    const {
      sessionName,
      homeScore,
      guestScore,
    } = this.props;
    return (
      <div className={styles.main}>
        <div className={styles.item}>{sessionName}</div>
        <div className={styles.item}>{guestScore}</div>
        <div className={styles.item}>{homeScore}</div>
      </div>
    );
  }
}

export default BasketBallScoreItem;
