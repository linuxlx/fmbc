import React from 'react';
import { Tabs, WhiteSpace } from 'antd-mobile';
import Moment from 'moment';
import { get } from 'lodash';
import { ListRefreshControl } from './refresh-control';
import styles from './tabs-card.less';
import './tabs-card-reset.css';
import config from '../constants';
import { ORDER_LIST_PAGE_OPTION } from '../../../constants/game-config';

const TabPane = Tabs.TabPane;


class TabsCard extends React.Component {
  /* 格式化 */
  setOrderListData = (orderList) => {
    const { t: msg, showType } = this.props;
    const listData = orderList.map((item) => {
      const {
        winStatus,
        bonus,
        orderId,
        betTime,
        question,
        result,
        sportType,
        historyStatusList,
        handicapType,
        bets,
      } = item

      const displayName = (item.displayName && item.displayName.split(/ *vs */im)) || '';
      const data = {
        header: {
          coinName: this.props.coinName,
          ...item,
          against: 'vs',
          firstName: displayName[0],
          lastName: displayName[1],
          ...this.getBonus(winStatus, bonus),
          guestText: sportType === 0 ? msg('headerHostText.basketball') : '',
        },
        detail: [

          {
            title: msg('detail.orderId'),
            text: orderId,
          },
          {
            title: msg('detail.betTime', { showType }),
            text: betTime,
          },
          {
            title: msg('detail.playType'),
            text: this.getSportType(sportType, handicapType),
          },
          {
            title: msg('detail.handicap'),
            text: question,
          },
          {
            title: msg('detail.playResult'),
            text: result,
          },
        ],
        historyList: this.getHistoryStatus(historyStatusList),
      }
      const failInfo = data.historyList[data.historyList.length - 1];

      if (failInfo.status === 3) {
        data.detail.unshift({
          title: this.getHistoryFailStatusText(failInfo.status), // failInfo.status
          text: `${failInfo.comment} ${msg('restitution')}${bets}${this.props.coinName}`,
          tips: true,
          marginBottom: true,
        })
      } else if (/5|7|8/.test(failInfo.status)) {
        data.detail.unshift({
          title: this.getHistoryFailStatusText(failInfo.status), // failInfo.status
          text: `${failInfo.comment} ${msg('restitution')}${bets}${this.props.coinName}`,
          tips: true,
          marginBottom: true,
        })
      }
      return data;
    })
    return listData;
  }

  getHistoryStatus(historyStatusList) {
    const LENGTH = get(historyStatusList, 'length', 0) - 1;
    return historyStatusList.map((list, index) => {
      let align = '';
      let statusStop = false;
      switch (index) {
        case 0:
          if (index === LENGTH) {
            statusStop = true;
            align = 'centerLeft'
          }
          align = 'right';
          break;
        case 1:
          if (index === LENGTH) {
            statusStop = true;
            align = ''
          }
          break;
        case 3:
          if (index === LENGTH) statusStop = true;
          align = 'left';
          break;
        default:
          align = '';

      }
      const { time, status, comment } = list;
      if (/3|5|7/.test(status)) {
        align = 'left';
      }
      return {
        statusText: this.getHistoryStatusText(list.status),
        time: Moment(time).format('MM-DD HH:mm:ss'),
        align,
        statusStop,
        comment,
        status,
      }
    })
  }

  getHistoryStatusText(status) {
    return this.props.t(`progressStatus.${status}`, { showType: this.props.showType })
  }

  getHistoryFailStatusText(status) {
    return this.props.t(`failCause.${status}`, { showType: this.props.showType })
  }

  getOrderStatus(status) {
    return this.props.t(`orderStatus.${status}`)
  }

  getWinStatus(status) {
    return this.props.t(`winStatus.${status}`, { showType: this.props.showType })
  }

  getBonus(status, bonus) {
    switch (status) {
      case 4:
        return {
          resultTextColor: config.WIN_TEXT_COLOR.win,
          orderState: `${this.getWinStatus(status)}: ${config.SYMBOL_TEXT.plus}${bonus}`,
        }
      case 1:
      case 5:
        return {
          resultTextColor: config.WIN_TEXT_COLOR.win,
          orderState: `${this.getWinStatus(status)}: ${config.SYMBOL_TEXT.plus}${bonus}`,
        }
      default:
        return {
          resultTextColor: config.WIN_TEXT_COLOR.default,
          orderState: `${this.getWinStatus(status)}`,
        }
    }
  }

  getSportType(sportType, handicapType) {
    const { t: msg } = this.props;
    return `${msg(`sportType.${sportType}`)}${msg(`handicapType.${handicapType}`)}`
  }


  callback = (key) => {
    const params = {
      type: key,
      pagination: ORDER_LIST_PAGE_OPTION.page,
    }
    if (key === '0') {
      this.props.onChhangeOrderListData(params)
    } else if (key === '1') {
      this.props.onChhangeOrderListData(params)
    }
  }

  render() {
    const { showType, changeLoading } = this.props;
    return (
      <div className={styles['tab-card']}>
        <Tabs
          className={styles['win8-tabs']} activeUnderlineColor="red" defaultActiveKey="0" animated={false}
          onChange={this.callback} activeTextColor="#ccc"
        >
          <TabPane tab={this.props.t('tabCardTitle.leftTitle', { showType })} key="0">
            <div className={styles.lotter}>
              <ListRefreshControl
                key={1}
                type="0"
                changeLoading={changeLoading}
                reloadOrderList={this.props.reloadOrderList}
                refreshFlag={this.props.refreshFlag}
                loadingFlag={this.props.loadingFlag}
                pageInfo={this.props.unOverPage}
                loadOrderList={this.props.loadOrderList}
                openDetailForKey={this.props.openDetailForKey}
                activeKey={this.props.activeKey}
                orderList={this.setOrderListData(this.props.unOverList)}
                update={this.props.unOverList}
                msg={this.props.t}
              />
            </div>
          </TabPane>
          <TabPane tab={this.props.t('tabCardTitle.rightTitle', { showType })} key="1" className={styles['tab-pane']}>
            <div className={styles.lotter}>
              <ListRefreshControl
                key={2}
                type="1"
                changeLoading={changeLoading}
                refreshFlag={this.props.refreshFlag}
                loadingFlag={this.props.loadingFlag}
                pageInfo={this.props.overPage}
                loadOrderList={this.props.loadOrderList}
                openDetailForKey={this.props.openDetailForKey}
                activeKey={this.props.activeKey}
                orderList={this.setOrderListData(this.props.overList)}
                msg={this.props.t}
                update={this.props.overList}
                reloadOrderList={this.props.reloadOrderList}
              />
            </div>
          </TabPane>
        </Tabs>
        <WhiteSpace />
      </div>
    )
  }

}


export default TabsCard;

