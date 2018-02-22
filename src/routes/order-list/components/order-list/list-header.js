import React, { PropTypes } from 'react';
import styles from './order-list.less'

const ListHeader = (props) => {
  const { resultTextColor,
        against,
        firstName,
        lastName,
        displayBet,
        bets,
        orderState,
        guestText,
        coinName } = props;
  return (
    <div className={styles['order-list-header']}>
      <h5>
        {firstName}
        {guestText ?
          <i className={styles['order-list-header-guest']}>{guestText}</i>
         : ''}
        <i className={styles['order-list-header-against']}>{against}</i>
        {lastName}
      </h5>
      <div className={styles['order-list-header-description']}>
        <span>{displayBet}</span>
        <span>{`${bets}${coinName}`}</span>
      </div>
      <div style={{ color: resultTextColor || '#333' }} className={styles['order-list-header-play-result']}>
        {orderState}
      </div>
    </div>
  )
}
ListHeader.propTypes = {
  resultTextColor: PropTypes.string,
  displayBet: PropTypes.string,
  bets: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string]),
  orderState: PropTypes.string,
}
export default ListHeader;
