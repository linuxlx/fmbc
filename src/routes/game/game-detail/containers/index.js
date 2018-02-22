import React, { Component } from 'react';
import { connect } from 'dva';
import {
  createStructuredSelector,
} from 'reselect';
import { translate } from 'react-i18next';

import GameDetail from '../components/gameDetail';
import {
  selectGameDetailLoading,
  selectGameDetailError,
  selectGameDetailSportType,
  selectGameDetailIsShowNumbericKeyBoard,
  selectGameDetailBetVisible,
  selectAppConfCoinName,
  selectGameDetailBetLoading,
  selectAppConfShowType,
  selectGameDetailInputCount,
  selectGameDetailInputCountTem,
  selectGameDetailBetBoxHeaderHeight,
  makeSelectMatchStateTeams,
  makeSelectMatchStatusState,
  makeSelectIsLotteryType,
  makeSelectMatchStateBasketBallLive,
  makeSelectMatchStateFootBallLive,
  makeSelectMatchStateBallType,
  makeSelectMatchCards,
  makeSelectMatchPlaytypeCodes,
  makeSelectMatchAccordionActiveKey,
  makeSelectMatchCurrentBetOptionInfo,
  makeSelectMatchBetArea,
  makeSelectMatchBetModalInfo,
  makeSelectMatchPlaytypesOptionIdSort,
  makeSelectHandicapStatusClose,
  makeSelectMatchOver,
  makeSelectMatchStateOfficial,
  makeSelectGameDetailElapseTimeInfo,
  selectBetErrorLoading,
} from '../models/selector';
import { selectColor } from '../../../../models/selector';

function mapDispatchToProps(dispatch) {
  return {
    onGoBeans: () => dispatch({
      type: 'common/goBeans',
    }),
    onShowDescriptionModal: payload => dispatch({
      type: 'common/optionModal',
      payload: {
        ...payload,
        visible: true,
      },
    }),
    onCancelMatchDetailHandle: () => dispatch({
      type: 'common/cancelHandle',
      handleName: 'data',
    }),
    onChangeBetOption: (optionIds, optionId) => dispatch({
      type: 'gameDetail/changeGameBetOption',
      optionIds,
      optionId,
    }),
    onClearBetOption: () => dispatch({
      type: 'gameDetail/clearGameBetOption',
    }),
    onShowNumbericKeyBoard: () => dispatch({
      type: 'gameDetail/showNumbericKeyBoard',
    }),
    onHideNumbericKeyBoard: () => dispatch({
      type: 'gameDetail/hideNumbericKeyBoard',
    }),
    onSetInputCount: inputCount => dispatch({
      type: 'gameDetail/setInputCount',
      inputCount,
    }),
    onSetInputCountTem: inputCountTem => dispatch({
      type: 'gameDetail/setInputCountTem',
      inputCountTem,
    }),
    onBet: () => dispatch({
      type: 'gameDetail/bet',
    }),
    onBetModalVisible: visible => dispatch({
      type: 'gameDetail/betModalVisible',
      visible,
    }),
    onSetPlaytypeStickiedIds: (id, sportType) => dispatch({
      type: 'gameDetail/setPlaytypeStickiedIds',
      id,
      sportType,
    }),
    onGetGameDetailInfo: params => dispatch({
      type: 'gameDetail/initMatchGameDetail',
      params,
      dispatch,
    }),
    onChangeAccordion: (activeKey, playtypesOptionIdSort) => dispatch({
      type: 'gameDetail/changeAccordion',
      activeKey,
      playtypesOptionIdSort,
    }),
    onSetInputCountDefault: () => dispatch({
      type: 'gameDetail/setInputCountDefault',
    }),
    onClearGameDetail: () => dispatch({
      type: 'gameDetail/clearGameDetail',
    }),
    onChangeBetBoxHeaderHeight: height => dispatch({
      type: 'gameDetail/changeBetBoxHeaderHeight',
      height,
    }),
  };
}

const mapStateToProps = createStructuredSelector({
  themeColor: selectColor,
  loading: selectGameDetailLoading,
  betErrorLoading: selectBetErrorLoading,
  error: selectGameDetailError,
  sportType: selectGameDetailSportType,
  isShowNumbericKeyBoard: selectGameDetailIsShowNumbericKeyBoard,
  betVisible: selectGameDetailBetVisible,
  coinName: selectAppConfCoinName,
  betLoading: selectGameDetailBetLoading,
  showType: selectAppConfShowType,
  inputCount: selectGameDetailInputCount,
  inputCountTem: selectGameDetailInputCountTem,
  betBoxHeaderHeight: selectGameDetailBetBoxHeaderHeight,
  players: makeSelectMatchStateTeams(),
  matchStatusState: makeSelectMatchStatusState(),
  isLotteryType: makeSelectIsLotteryType(),
  basketBallLive: makeSelectMatchStateBasketBallLive(),
  footBallLive: makeSelectMatchStateFootBallLive(),
  ballType: makeSelectMatchStateBallType(),
  playtypes: makeSelectMatchCards(),
  playtypeCodes: makeSelectMatchPlaytypeCodes(),
  accordionActiveKey: makeSelectMatchAccordionActiveKey(),
  betOptionInfo: makeSelectMatchCurrentBetOptionInfo(),
  betArea: makeSelectMatchBetArea(),
  betResult: makeSelectMatchBetModalInfo(),
  playtypesOptionIdSort: makeSelectMatchPlaytypesOptionIdSort(),
  handicapStatusClose: makeSelectHandicapStatusClose(),
  matchOver: makeSelectMatchOver(),
  matchStateOfficial: makeSelectMatchStateOfficial(),
  elapseTimeInfo: makeSelectGameDetailElapseTimeInfo(),
});

@connect(mapStateToProps, mapDispatchToProps)
@translate('detail', { wait: true })
class Node extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  componentWillMount() {
    const { params, onGetGameDetailInfo } = this.props;
    onGetGameDetailInfo(params);
  }

  componentWillUnmount() {
    const { onCancelMatchDetailHandle, onClearGameDetail } = this.props;
    onCancelMatchDetailHandle();
    onClearGameDetail();
  }

  render() {
    return <GameDetail {...this.props} />
  }
}

export default Node;
