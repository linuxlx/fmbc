import React from 'react';
import styles from './progress.less';

const Progress = (props) => {
  return (
    <div className={styles.progress}>
      {props.children}
    </div>
  )
}
export default Progress;
