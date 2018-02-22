/* eslint-disable global-require */
import React from 'react';
import { Icon } from 'antd-mobile';
import classNames from 'classnames';
import Plus from '../../assets/icon/plus@2x.png'

import styles from './title-bar.less'
import { ORDER_LIST_PAGE_OPTION } from '../../constants/game-config'

const TitleBar = ({
                    msgs: { counterMsg },
                    balance = 0,
                    openOrderListModal,
                    getOrderListData,
                    showDescriptionModal,
                    backButton: { label, action },
                    coin,
                    mpingClickEvent,
                    goBeans,
                  }) => {
  const wrapperClassName = classNames({
    [styles.wrapper]: true,
    themeBgColor: true,
  })
  return (
    <div className={wrapperClassName}>
      {label && <div className={styles.left}>
        <div className={styles.back} onTouchTap={action}>
          <Icon
            className={styles.backIcon}
            type={require('../../assets/svg/back.svg')}
          />
          <span>{label}</span>
        </div>
      </div>}
      <div className={styles.mid}>
        <div
          className={classNames(styles['label-wrapper'], styles.balance)}
          onTouchTap={goBeans}
        >
          <img src={coin} alt="" />
          <span>
            {balance}
          </span>
          <img src={Plus} alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <div
          onTouchTap={() => {
            mpingClickEvent('openOrderListModal');
            openOrderListModal();
            getOrderListData({ type: 0, page: ORDER_LIST_PAGE_OPTION.page });
          }}
          className={styles['label-wrapper']}
        >
          <span className={styles.center}>
            {counterMsg}
          </span>
        </div>
        <div
          onTouchTap={() => { showDescriptionModal(); mpingClickEvent('openHowToPlayModal') }}
          className={classNames(styles['label-wrapper'], styles['single-char'])}
        >
          <span>
            ?
          </span>
        </div>
      </div>
    </div>
  );
};

TitleBar.propTypes = {};

export default TitleBar;
