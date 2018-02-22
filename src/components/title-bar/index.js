import React from 'react';
import { connect } from 'dva';
import { translate } from 'react-i18next';
import { get } from 'lodash';
import TitleBar from './title-bar';
import {
  makeFormatedBalance,
  makeBackButtonObj,
  getCoin,
  selectColor,
} from '../../models/selector'

function mapStateToProps(state, ownProps) {
  return {
    coin: getCoin(state),
    balance: makeFormatedBalance(state),
    accountId: get(state, 'common.account.accountId'),
    backButton: makeBackButtonObj(state, ownProps),
    themeColor: selectColor(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    goBeans: () => {
      dispatch({ type: 'common/goBeans' })
    },
    openOrderListModal: () => {
      dispatch({ type: 'orderList/showOrderList' })
    },
    getOrderListData: (params) => {
      dispatch({ type: 'orderList/getOrderListData', params })
    },
    showDescriptionModal: () => dispatch({ type: 'common/showDescriptionModal' }),
    mpingClickEvent: eventName => dispatch({ type: 'mping/clickEvent', eventName }),
  };
}

@translate()
@connect(mapStateToProps, mapDispatchToProps)
class Container extends React.Component {
  render() {
    const { t } = this.props
    const msgs = {
      counterMsg: t(['titleBar.orderRecord']),
    }

    return <TitleBar {...this.props} msgs={msgs} />
  }
}

/*
function mapStateToProps(state) {
  return {
    cumulate: get(state, 'sample.cumulate'),
    multiple: get(state, 'sample.multiple'),
    loadingSample: get(state, 'loading.models.sample'),
    multiedCounter: makeMultiedCounter(state),
  };
}
*/

export default Container;
