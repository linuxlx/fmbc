/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React, { Component } from 'react';
import { ListView, RefreshControl, Icon } from 'antd-mobile';
import { Accordion, Panel } from '../../../../components/Accordion';
import { OrderList, ListHeader } from '../order-list';
import { ProgressItem, Progress } from '../progress'
import { OrderInfo, Detail } from '../order-detail';

import styles from './refresh-control.less';

import { ORDER_LIST_PAGE_OPTION } from '../../../../constants/game-config';

class ListRefreshControl extends Component {
  constructor(props) {
    super(props);
    this.index = this.props.orderList.length - 1;
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.initData = this.props.orderList;
    this.state = {
      dataSource: dataSource.cloneWithRows(this.initData),
      footerText: this.props.msg('loadText.loadMore'),
      isEnd: false,
    };
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    if (nextProps.orderList !== this.props.orderList) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.orderList),
      })
    }
    const { pageIndex, pageTotal } = nextProps.pageInfo;
    if (pageIndex === pageTotal && !this.state.isEnd) {
      this.setState({
        footerText: this.props.msg('loadText.noData'),
        isEnd: true,
      })
      this.forceUpdate();
    }
  }

  onRefresh = () => {
    if (this.props.refreshFlag) return
    this.props.reloadOrderList({
      refresh: true,
      type: this.props.type,
      pagination: ORDER_LIST_PAGE_OPTION.page,
    })
  };
  onEndReached = () => {
    const { pageIndex, pageTotal } = this.props.pageInfo;
    if (pageIndex === pageTotal) {
      this.setState({ isEnd: true, footerText: this.props.msg('loadText.noData') })
      return;
    }
    if (this.props.loadingFlag) {
      return;
    }
    this.props.loadOrderList({
      type: this.props.type,
      pagination: {
        pageIndex: (pageIndex + 1),
        pageSize: ORDER_LIST_PAGE_OPTION.page.pageSize,
      },
    });
  }

  render() {
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 1,
        }}
      />
    );

    const row = (rowData, sectionID, rowID) => {
      return (
        <Panel
          openDetailForKey={(key) => {
            this.props.openDetailForKey(key)
          }}
          activeKey={this.props.activeKey}
          keyId={rowData.header.orderId}
          key={rowID}
          HeaderEle={<ListHeader {...rowData.header} />}
        >
          <OrderList>
            <Detail>
              <Progress>
                {
                  rowData.historyList && rowData.historyList.map((list, index) => {
                    const { title } = list;
                    if (title) {
                      return <ProgressItem key={index} {...list} />
                    } else {
                      return <ProgressItem key={index} {...list} />
                    }
                  })
                }
              </Progress>
              <OrderInfo
                dataSroce={rowData.detail}
              />
            </Detail>
          </OrderList>
        </Panel>
      );
    };
    return (
      <div className="pppp">
        {
          this.props.changeLoading ? <div
            className={styles.change_loading}
            style={{
              height: document.documentElement.clientHeight * 3 / 5,
            }}
          ><Icon type="loading" />
          </div> : (
            <ListView
              key={1}
              dataSource={this.state.dataSource}
              className={styles['order-list-view']}
              renderSeparator={separator}
              renderRow={row}
              renderSectionBodyWrapper={() => <Accordion key={this.props.type} />}
              renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                {this.props.loadingFlag ? <Icon type="loading" /> : this.state.footerText}
              </div>)}
              initialListSize={6}
              pageSize={20}
              scrollRenderAheadDistance={20}
              scrollEventThrottle={20}
              onEndReachedThreshold={60}
              style={{
                height: document.documentElement.clientHeight * 3 / 5,
              }}
              onEndReached={this.onEndReached}
              scrollerOptions={{
                scrollbars: true,
              }}
              refreshControl={<RefreshControl
                refreshing={this.props.refreshFlag}
                onRefresh={this.onRefresh}
              />}
            />
          )
        }

      </div>
    );
  }
}

export default ListRefreshControl;
