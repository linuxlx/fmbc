import React from 'react'
import styles from './order-list.less';


const OrderList = (props) => {
  return (
    <div className={styles['order-list']} >
      {props.children}
    </div>
  );
}

// OrderList.propTypes = {
//   detail: PropTypes.obj,
// }
export default OrderList
