import React, { PropTypes } from 'react';
import classNames from 'classnames'
import styles from './progress.less';


const ProgressItem = (props) => {
  const { align, statusStop, time, statusText } = props;
  let progressClassNama = '';
  const diotsClassName = classNames({
    [styles['progress-diots']]: true,
    [styles['progress-diots-stop']]: statusStop,
  });
  switch (align) {
    case 'left':
      progressClassNama = `${styles['progress-item-status']}  ${styles['progress-let']}`
      break;
    case 'right':
      progressClassNama = `${styles['progress-item-status']}   ${styles['progress-right']}`
      break;
    case 'centerLeft':
      progressClassNama = `${styles['progress-item-status']}   ${styles['progress-left']}`
      break;
    default:
      progressClassNama = ` ${styles['progress-item-status']}  ${styles['progress-right']} ${styles['progress-left']}`
  }


  return (
    <div className={styles['progress-item']}>
      <span className={styles['progress-item-title']}>{statusText}</span>
      <span className={progressClassNama}>
        <i className={diotsClassName} />
      </span>
      <span className={styles['progress-item-time']}>{time} </span>
    </div>
  )
}
ProgressItem.propTypes = {
  align: PropTypes.string,
  statusStop: PropTypes.bool,
  time: PropTypes.string,
  statusText: PropTypes.string,
}

export default ProgressItem;
