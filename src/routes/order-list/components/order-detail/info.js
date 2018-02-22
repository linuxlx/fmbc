import React from 'react';
import classNames from 'classnames';
import styles from './order-detail.less';

const Item = (props) => {
  const orderInfoItemClass = classNames({
    [styles['order-info-item']]: true,
    [styles['order-info-item-mb']]: props.marginBottom,
  })
  const orderInfoItemRightClass = classNames({
    [styles['order-info-item-right']]: true,
    [styles['order-info-item-tips']]: props.tips,
  })
  const taxtSpaceClassName = classNames({
    [styles.s2]: props.title.length === 2,
    [styles.s3]: props.title.length === 3,
  })
  return (
    <div className={orderInfoItemClass}>
      <div className={styles['order-info-item-left']}>
        <span className={taxtSpaceClassName}>{props.title}</span>
      </div>
      <span className={styles.delimiter}>:</span>
      <div className={orderInfoItemRightClass}>{props.text}</div>
    </div>
  )
}

const OrderInfo = (props) => {
  return (
    <div className={styles['order-info']}>
      {
        props.dataSroce.map((item) => {
          return (<Item
            key={item.title}
            title={item.title}
            text={item.text}
            tips={item.tips}
            marginBottom={item.marginBottom}
          />)
        })
      }
    </div>
  )
}

export default OrderInfo;
