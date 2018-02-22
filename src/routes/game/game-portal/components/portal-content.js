import React from 'react';
import { Tabs } from 'antd-mobile';

import styles from './portal-content.less'
import GameList from '../containers/game-list'
import LeftTabs from '../containers/left-tabs'
import { GROUP_TYPE_MAP } from '../constants'

import { addStyle } from '../../../../utils/commonFunctions'

const { TabPane } = Tabs

const PortalContent = ({
  msgs,
  activeGroupType,
  themeColor,
  // actions
  onChangeGroupType,
}) => {
  addStyle(`
    #portal-content-wrapper .${styles.tabs} .am-tabs-ink-bar{
      background-color:${themeColor};
    }
    #portal-content-wrapper .${styles.tabs} .am-tabs-tab-active{
      color:${themeColor};
    }
  `)
  return (
    <div className={styles.wrapper} id="portal-content-wrapper">
      <Tabs
        animated
        swipeable={false}
        className={styles.tabs}
        activeKey={activeGroupType}
        onChange={key => onChangeGroupType(key)}
      >
        <TabPane tab={msgs.byTime} key={GROUP_TYPE_MAP.byTime}>
          <div className={styles['one-of-tab-content']}>
            <LeftTabs type={GROUP_TYPE_MAP.byTime} />
            <GameList type={GROUP_TYPE_MAP.byTime} />
          </div>
        </TabPane>
        <TabPane tab={msgs.byLeague} key={GROUP_TYPE_MAP.byLeague} className={styles['tab-pane']}>
          <div className={styles['one-of-tab-content']}>
            <LeftTabs type={GROUP_TYPE_MAP.byLeague} />
            <GameList type={GROUP_TYPE_MAP.byLeague} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

PortalContent.propTypes = {
};

export default PortalContent;
