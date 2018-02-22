import React from 'react';
import styles from './order-list.less';

const Detail = (props) => {
  return (
    <div className={styles['order-detail']}>
      {props.children}
    </div>
  )
}

export default Detail;
