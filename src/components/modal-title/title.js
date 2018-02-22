import React from 'react';
import { Icon } from 'antd-mobile';
import { connect } from 'dva';
import { translate } from 'react-i18next';
import { get } from 'lodash';
import styles from './title.css'
import { closeModal } from '../../models/actions/common';

const Title = ({ title, closeModalDisp, t, showType }) => {
  return (
    <div className={styles.title}>
      <span onClick={closeModalDisp}><Icon type={'cross'} /></span>
      {t(`${title}`, { showType })}
    </div>
  )
}

const mapStateToProps = state => ({
  showType: get(state, 'common.appConf.showType'),
})

const mapDispatchToProps = dispatch => ({
  closeModalDisp: () => {
    dispatch(closeModal())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(translate('title', { wait: true })(Title));
