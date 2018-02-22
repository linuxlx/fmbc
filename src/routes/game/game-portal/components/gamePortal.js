import React from 'react';
import { Helmet } from 'react-helmet';

import styles from './gamePortal.less';
import PortalMenu from './portal-menu'
import PortalContent from './portal-content'

const GamePortal = ({
  gameTypes,
  activeTypeIndex,
  promtImgUrl,
  msgs,
  activeGroupType,
  // actions
  changeGameType,
  changeGroupType,
  themeColor,
}) => {
  return (
    <div className={styles.normal}>
      <Helmet title="游戏中心" />
      <PortalMenu
        themeColor={themeColor}
        types={gameTypes}
        activeIndex={activeTypeIndex}
        onChangeGameType={changeGameType}
      />
      { // 预留推广用图片
        promtImgUrl &&
        <img src={promtImgUrl} alt="" className={styles.img} />
      }
      <PortalContent
        msgs={msgs}
        themeColor={themeColor}
        activeGroupType={activeGroupType}
        onChangeGroupType={changeGroupType}
      />
    </div>
  );
};

export default GamePortal;
