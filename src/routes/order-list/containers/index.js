import { translate } from 'react-i18next';
import { connect } from 'dva';
import { get } from 'lodash';
import TabsCard from '../components/tabs-card';

function mapStateToProps(state) {
  return {
    overList: get(state, 'orderList.overList'),
    overPage: get(state, 'orderList.overPage'),
    unOverList: get(state, 'orderList.unOverList'),
    unOverPage: get(state, 'orderList.unOverPage'),
    loadingFlag: get(state, 'orderList.loading'),
    activeKey: get(state, 'orderList.activeKey'),
    refreshFlag: get(state, 'orderList.refreshFlag'),
    coinName: get(state, 'common.appConf.coinName'),
    showType: get(state, 'common.appConf.showType'),
    changeLoading: get(state, 'orderList.changeLoading'),

  }
}

function mapDispatchToProps(dispatch) {
  return {
    openDetailForKey: key => dispatch({ type: 'orderList/openDetailForKey', key }),
    showOrderList: () => {
      dispatch({ type: 'orderList/showOrderList' })
    },
    loadOrderList: (params) => {
      dispatch({ type: 'orderList/loadOrderList', params })
    },
    reloadOrderList: (params) => {
      dispatch({ type: 'orderList/getOrderListData', params })
    },
    onChhangeOrderListData: (params) => {
      dispatch({ type: 'orderList/getOnChhangeOrderListData', params })
    },


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(translate('order', { wait: true })(TabsCard));
