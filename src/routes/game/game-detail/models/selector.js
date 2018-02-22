import { get, sortBy } from 'lodash';
import { createSelector } from 'reselect';
import Moment from 'moment';
import {
  TARGET_TYPE,
} from '../../../../constants/game-config';
import {
  matchStateTeamParser,
  getTeamScores,
  getMatchStatus,
  isLiveByMatchStatus,
  isLotteryBySportType,
  getBasketBallScore,
  combineArray,
  durationFormat,
  playtypesOptionsParser,
  processArray,
  getCurrentBetOptionInfo,
  processPlaytypeExplain,
  processRow,
} from './parser';
import {
  BALL_TYPE,
  TEAMFLAG,
  BETERRORCODE,
  MATCH_STATE_OFFICIAL,
  BALL_LIMITE_TIME,
  FOOTBALL_PERIOD_TYPE,
  PERIOD_TYPE,
  LOTTERY_TYPE,
  OPERATOR_TYPE,
  TIMER_SUFFIX,
  BUTTON_TEXT_CODE,
  DEFAULTERRORCODE,
  INPUT_BUTTON_TYPE,
} from '../constants';

export const selectAccountLogin = state => get(state, 'common.account.login');
export const selectAppConfBalance = state => get(state, 'common.account.balance');

export const selectAppConfCoinName = state => get(state, 'common.appConf.coinName');
export const selectAppConfDecimals = state => get(state, 'common.appConf.decimals');
export const selectAppConfBetMultiple = state => get(state, 'common.appConf.betMultiple');
export const selectAppConfBetDefault = state => get(state, 'common.appConf.betDefault');
export const selectAppConfShowType = state => get(state, 'common.appConf.showType');
export const selectAppConfFailureIcon = state => get(state, 'common.appConf.assets.bet.failureIcon');
export const selectAppConfSuccessIcon = state => get(state, 'common.appConf.assets.bet.successIcon');

export const selectGameDetailLoading = state => get(state, 'gameDetail.loading');
export const selectBetErrorLoading = state => get(state, 'gameDetail.betErrorLoading');
export const selectGameDetailError = state => get(state, 'gameDetail.error');
export const selectGameDetailEvents = state => get(state, 'gameDetail.data.events');
export const selectGameDetailPlayers = state => get(state, 'gameDetail.data.players');
export const selectGameDetailMatchStatus = state => get(state, 'gameDetail.data.matchStatus');
export const selectGameDetailMatchId = state => get(state, 'gameDetail.data.matchId');
export const selectGameDetailSportType = state => get(state, 'gameDetail.data.sportType');
export const selectGameDetailMatchTime = state => get(state, 'gameDetail.data.matchTime');
export const selectGameDetailPeriod = state => get(state, 'gameDetail.data.period');
export const selectGameDetailElapseTime = state => get(state, 'gameDetail.data.elapseTime');
export const selectGameDetailLeagueName = state => get(state, 'gameDetail.data.leagueName');
export const selectGameDetailPlaytypes = state => get(state, 'gameDetail.data.playtypes');
export const selectGameDetailHandicapType = state => get(state, 'gameDetail.data.handicapType');
export const selectGameDetailOptionIds = state => get(state, 'gameDetail.optionIds');
export const selectGameDetailOptionId = state => get(state, 'gameDetail.optionId');
export const selectGameDetailIsShowNumbericKeyBoard = state => get(state, 'gameDetail.isShowNumbericKeyBoard');
export const selectGameDetailInputCount = state => get(state, 'gameDetail.inputCount');
export const selectGameDetailInputCountTem = state => get(state, 'gameDetail.inputCountTem');
export const selectGameDetailBetLoading = state => get(state, 'gameDetail.betLoading');
export const selectGameDetailBetSuccess = state => get(state, 'gameDetail.betSuccess');
export const selectGameDetailBetError = state => get(state, 'gameDetail.betError');
export const selectGameDetailBetVisible = state => get(state, 'gameDetail.betVisible');
export const selectGameDetailPlaytypeStickiedIds = state => get(state, 'gameDetail.playtypeStickiedIds');
export const selectGameDetailBetErrorResult = state => get(state, 'gameDetail.betErrorResult');
export const selectGameDetailActiveKey = state => get(state, 'gameDetail.activeKey');
export const selectGameDetailPlaytypesOptionIdSort = state => get(state, 'gameDetail.playtypesOptionIdSort');
export const selectGameDetailHandicapStatus = state => get(state, 'gameDetail.data.handicapStatus');
export const selectGameDetailDefaultInputCount = state => get(state, 'gameDetail.defaultInputCount');
export const selectGameDetailBetBoxHeaderHeight = state => get(state, 'gameDetail.betBoxHeaderHeight');
export const selectSetIntervalTimes = state => get(state, 'gameDetail.times');
export const selectGameDetailPaused = state => get(state, 'gameDetail.data.paused');

export const makeSelectMatchStateTeams = () => createSelector(
  selectGameDetailPlayers,
  (players) => {
    if (players && players.length) {
      return players.map(item => matchStateTeamParser(item))
    }
    return false;
  },
);

export const makeSelectMatchStateBallType = () => createSelector(
  selectGameDetailSportType,
  (sportType) => {
    return BALL_TYPE[sportType] || false;
  },
);

export const makeSelectMatchStateBasketBallLive = () => createSelector(
  selectGameDetailPlayers,
  selectGameDetailMatchStatus,
  (players, matchStatus) => {
    const state = getMatchStatus(matchStatus);

    if (players && players.length) {
      const result = players.map(item => getBasketBallScore(isLiveByMatchStatus(state) ? get(item, 'score') : []));
      return combineArray(result[0], result[1]);
    }
    return false;
  },
);

export const makeSelectMatchStateFootBallLive = () => createSelector(
  selectGameDetailEvents,
  (events) => {
    if (events && events.length) {
      return events.map((item) => {
        const eventTimeDurationFormat = durationFormat(get(item, 'eventTime'));
        return {
          key: get(item, 'eventId'),
          type: get(item, 'eventType'),
          isChange: get(item, 'teamFlag') === TEAMFLAG.HOME,
          time: `${eventTimeDurationFormat.minutes}'${eventTimeDurationFormat.seconds}''`,
        }
      })
    }
    return false;
  },
);

export const makeSelectIsLotteryType = () => createSelector(
  selectGameDetailSportType,
  sportType => isLotteryBySportType(sportType),
);

export const makeSelectMatchStatusState = () => createSelector(
  selectGameDetailMatchTime,
  selectGameDetailMatchStatus,
  selectGameDetailPeriod,
  selectGameDetailPlayers,
  selectGameDetailElapseTime,
  selectGameDetailLeagueName,
  (matchTime, matchStatus, period, players, elapseTime, leagueName) => {
    const state = getMatchStatus(matchStatus);
    const isLive = isLiveByMatchStatus(state);
    return {
      statusType: isLive ? 'live' : 'default',
      leagueName,
      period,
      elapseTime: `${durationFormat(elapseTime).minutes}'`,
      time: Moment(matchTime).format('YYYY-MM-DD HH:mm'),
      scores: isLive ? getTeamScores(players).join('-') : 'VS',
      state,
    }
  },
);

export const makeSelectMatchPlaytypesInfo = () => createSelector(
  selectGameDetailPlaytypes,
  selectGameDetailOptionId,
  selectGameDetailSportType,
  selectGameDetailPeriod,
  selectGameDetailHandicapType,
  (playtypes, currentOptionId, sportType, period, handicapType) => {
    if (playtypes && playtypes.length) {
      return playtypes.map((item) => {
        const options = processArray(
          playtypesOptionsParser(
            get(item, 'optionName'),
            get(item, 'sp'),
            get(item, 'optionId'),
            get(item, 'betLimit'),
            get(item, 'paused'),
            currentOptionId,
          ),
        );
        const { isExplain, explainPointer } = processPlaytypeExplain(sportType, get(item, 'playtypeCode'), period, handicapType);
        return {
          optionId: get(item, 'optionId'),
          title: get(item, 'playtypeName'),
          isExplain,
          explainPointer,
          isRow: processRow(options),
          options,
        }
      })
    }
    return false;
  },
);

export const makeSelectMatchPlaytypesOptionIdSort = () => createSelector(
  selectGameDetailPlaytypes,
  selectGameDetailPlaytypeStickiedIds,
  selectGameDetailSportType,
  (playtypes, playtypeStickiedIds, sportType) => {
    const playtypeStickiedSportTypeIds = get(playtypeStickiedIds, sportType, []);
    if (playtypes && playtypes.length) {
      const result = sortBy(playtypes, (item) => {
        return playtypeStickiedSportTypeIds.indexOf(get(item, 'optionId')) > -1 ?
          playtypeStickiedSportTypeIds.indexOf(get(item, 'optionId')) :
          playtypeStickiedSportTypeIds.length;
      });

      return result.map((item) => {
        return item.optionId;
      });
    }
    return false;
  },
);

export const makeSelectMatchPlaytypesOptionIdSortActiveKey = () => createSelector(
  selectGameDetailActiveKey,
  selectGameDetailPlaytypesOptionIdSort,
  (activeKey, playtypesOptionIdSort) => {
    const playtypesOptionIdSortActiveKey = {};
    if (playtypesOptionIdSort && playtypesOptionIdSort.length) {
      playtypesOptionIdSort.forEach((item, index) => {
        if (activeKey.indexOf(index.toString()) > -1) {
          playtypesOptionIdSortActiveKey[item] = true;
        } else {
          playtypesOptionIdSortActiveKey[item] = false;
        }
      })
    }
    return playtypesOptionIdSortActiveKey;
  },
);

export const makeSelectMatchCards = () => createSelector(
  makeSelectMatchPlaytypesInfo(),
  selectGameDetailPlaytypeStickiedIds,
  makeSelectMatchPlaytypesOptionIdSortActiveKey(),
  selectGameDetailSportType,
  (playtypesInfo, playtypeStickiedIds, playtypesOptionIdSortActiveKey, sportType) => {
    const playtypeStickiedSportTypeIds = get(playtypeStickiedIds, sportType, []);
    if (playtypesInfo) {
      const result = sortBy(playtypesInfo, (item) => {
        return playtypeStickiedSportTypeIds.indexOf(get(item, 'optionId')) > -1 ?
          playtypeStickiedSportTypeIds.indexOf(get(item, 'optionId')) :
          playtypeStickiedSportTypeIds.length;
      });
      return result.map((item) => {
        return {
          ...item,
          active: playtypesOptionIdSortActiveKey[get(item, 'optionId')] == null ? true : playtypesOptionIdSortActiveKey[get(item, 'optionId')],
          isOperateSelected: playtypeStickiedSportTypeIds.indexOf(get(item, 'optionId')) > -1,
        }
      })
    }

    return playtypesInfo;
  },
);

export const makeSelectMatchPlaytypeCodes = () => createSelector(
  selectGameDetailPlaytypes,
  (playtypes) => {
    if (playtypes && playtypes.length) {
      return playtypes.map(item => get(item, 'optionId'))
    }
    return false;
  },
);

export const makeSelectMatchAccordionActiveKey = () => createSelector(
  makeSelectMatchCards(),
  (matchCards) => {
    const activeKey = [];
    if (matchCards) {
      matchCards.forEach((item, index) => {
        if (item.active) {
          activeKey.push(index.toString());
        }
      })
    }
    return activeKey;
  },
);

export const makeSelectMatchCurrentBetOptionInfo = () => createSelector(
  selectGameDetailPlaytypes,
  selectGameDetailOptionIds,
  selectGameDetailOptionId,
  (playtypes, optionIds, optionId) => {
    return getCurrentBetOptionInfo(playtypes, optionIds, optionId);
  },
);

export const makeSelectMatchInputCountDefault = () => createSelector(
  selectAppConfBetDefault,
  selectAppConfBetMultiple,
  (betDefault, betMultiple) => (
    betDefault > betMultiple ? parseInt(betDefault / betMultiple, 10) : 1
  ),
)

export const makeSelectMatchBetArea = () => createSelector(
  selectGameDetailInputCount,
  makeSelectMatchCurrentBetOptionInfo(),
  selectAppConfBalance,
  selectAppConfBetMultiple,
  selectGameDetailBetLoading,
  selectAppConfDecimals,
  selectGameDetailIsShowNumbericKeyBoard,
  makeSelectMatchInputCountDefault(),
  (inputCount,
   option,
   balance,
   betMultiple,
   betLoading,
   decimals,
   isShowNumbericKeyBoard,
   inputCountDefault) => {
    const betLimit = parseInt(get(option, 'betLimit') / betMultiple, 10);
    const odds = parseFloat(get(option, 'odds'));
    const inputCountNum = parseInt(inputCount, 10);
    const currentBalance = parseInt(balance / betMultiple, 10);
    let tem = 0;
    let inputButtonType;

    if (currentBalance > betLimit) {
      tem = betLimit;
      inputButtonType = INPUT_BUTTON_TYPE.fullBet;
    } else {
      tem = currentBalance;
      inputButtonType = INPUT_BUTTON_TYPE.All;
    }

    const currentInputCountNum = inputCountNum > tem ? tem : inputCountNum;
    const isAllInState = currentInputCountNum >= currentBalance;
    const isNotSufficientFunds = balance < inputCountDefault * betMultiple;
    let buttonTextCode;
    if (isNotSufficientFunds) {
      buttonTextCode = BUTTON_TEXT_CODE.isNotSufficientFunds;
      inputButtonType = INPUT_BUTTON_TYPE.notSufficientFundsText;
    } else if (isAllInState) {
      buttonTextCode = BUTTON_TEXT_CODE.isAllInState;
    } else {
      buttonTextCode = BUTTON_TEXT_CODE.betButtonText;
    }

    return {
      inputCount: isNaN(currentInputCountNum) ? '' : currentInputCountNum.toString(),
      inputButtonType,
      disabled: betLoading || isNaN(currentInputCountNum) || currentInputCountNum === 0,
      isInputCountMax: currentInputCountNum === tem || isNotSufficientFunds,
      inputCountMax: tem.toString(),
      forecastSum: isNaN(currentInputCountNum) ? '' : (currentInputCountNum * odds * betMultiple).toFixed(decimals),
      baseMultiple: betMultiple.toString().substring(1),
      betLimit: get(option, 'betLimit'),
      isAllInState,
      buttonTextCode,
      isNotSufficientFunds,
      isInputAllIn: inputButtonType === INPUT_BUTTON_TYPE.All,
      balance,
      isShowNumbericKeyBoard,
    }
  },
);

export const makeSelectMatchBetInfo = () => createSelector(
  selectGameDetailMatchId,
  selectGameDetailSportType,
  makeSelectMatchCurrentBetOptionInfo(),
  makeSelectMatchBetArea(),
  selectAppConfBetMultiple,
  (matchId, sportType, option, betArea, betMultiple) => {
    return {
      inputCount: get(betArea, 'inputCount'),
      bets: get(betArea, 'inputCount') * betMultiple,
      odds: get(option, 'odds'),
      matchId,
      betOption: get(option, 'optionId'),
      sportType,
      handicap: get(option, 'handicap') || 1,
    }
  },
);

export const makeSelectMatchBetModalInfo = () => createSelector(
  selectGameDetailBetLoading,
  selectGameDetailBetSuccess,
  selectGameDetailBetError,
  selectGameDetailBetErrorResult,
  selectAppConfFailureIcon,
  selectAppConfSuccessIcon,
  (betLoading, betSuccess, betError, betErrorResult, failureIcon, successIcon) => {
    if (betLoading) {
      return {
        loading: true,
      }
    }
    if (betSuccess) {
      return {
        loading: false,
        resultType: 'success',
        resultImgUrl: successIcon,
      }
    } else if (betError) {
      const betErrorResultCode = get(
        BETERRORCODE,
        betErrorResult.code,
        BETERRORCODE[DEFAULTERRORCODE]);
      return {
        loading: false,
        resultMessageCode: betErrorResultCode.codeText,
        resultType: 'error',
        resultImgUrl: failureIcon,
        buttonType: betErrorResultCode.codeText,
        buttonTarget: betErrorResultCode.targetUrl,
        isButtonTargetRecharge: (
          betErrorResultCode.targetType === TARGET_TYPE.recharge
        ),
        modalClose: betErrorResultCode.closeModal,
        openBridge: betErrorResultCode.isOpenBridge,
      }
    }
    return false;
  },
);
// 自动关盘列表
export const makeSelectHandicapStatusClose = () => createSelector(
  selectGameDetailHandicapStatus,
  handicapStatus => handicapStatus === 9,
)

// 比赛结束
export const makeSelectMatchOver = () => createSelector(
  selectGameDetailMatchStatus,
  matchStatus => matchStatus === 9,
)

// 暂无数据
export const makeSelectMatchPlaytypeNodata = () => createSelector(
  selectGameDetailPlaytypes,
  playtypes => playtypes && playtypes.length === 0,
);

// 关盘、比赛结束、暂无数据 状态文案
export const makeSelectMatchStateOfficial = () => createSelector(
  makeSelectHandicapStatusClose(),
  makeSelectMatchOver(),
  makeSelectMatchPlaytypeNodata(),
  (handicapStatusClose, matchOver, nodata) => {
    const visible = matchOver || handicapStatusClose || nodata;

    let desc;
    let buttonText;
    let targetUrl;
    let type;
    if (matchOver) { // 比赛结束
      desc = MATCH_STATE_OFFICIAL.matchOver.desc;
      buttonText = MATCH_STATE_OFFICIAL.matchOver.buttonText;
      targetUrl = MATCH_STATE_OFFICIAL.matchOver.targetUrl;
      type = MATCH_STATE_OFFICIAL.matchOver.type;
    } else if (handicapStatusClose) { // 关盘
      desc = MATCH_STATE_OFFICIAL.handicapStatusClose.desc;
      buttonText = MATCH_STATE_OFFICIAL.handicapStatusClose.buttonText;
      targetUrl = MATCH_STATE_OFFICIAL.handicapStatusClose.targetUrl;
      type = MATCH_STATE_OFFICIAL.handicapStatusClose.type;
    } else if (nodata) {
      desc = MATCH_STATE_OFFICIAL.nodata.desc;
      buttonText = MATCH_STATE_OFFICIAL.nodata.buttonText;
      targetUrl = MATCH_STATE_OFFICIAL.nodata.targetUrl;
      type = MATCH_STATE_OFFICIAL.nodata.type;
    }
    return {
      visible,
      desc,
      buttonText,
      targetUrl,
      type,
    }
  },
);

export const makeSelectGameDetailElapseTimeInfo = () => createSelector(
  selectGameDetailElapseTime,
  selectGameDetailPaused,
  selectGameDetailPeriod,
  selectGameDetailSportType,
  (elapseTime, paused, period, sportType) => {
    let maxMinute;
    let minMinute;
    let operator;

    if (Number(sportType) === LOTTERY_TYPE.BASKETBALL) {
      maxMinute = BALL_LIMITE_TIME[sportType].max;
      minMinute = BALL_LIMITE_TIME[sportType].min;
      operator = OPERATOR_TYPE.minus;
    } else if (Number(sportType) === LOTTERY_TYPE.FOOTBALL) {
      operator = OPERATOR_TYPE.plus;
      switch (period) {
        case PERIOD_TYPE.FIRST_HALF:
          maxMinute = BALL_LIMITE_TIME[sportType][FOOTBALL_PERIOD_TYPE[period]].max;
          minMinute = BALL_LIMITE_TIME[sportType][FOOTBALL_PERIOD_TYPE[period]].min;
          break;
        case PERIOD_TYPE.SECOND_HALF:
          maxMinute = BALL_LIMITE_TIME[sportType][FOOTBALL_PERIOD_TYPE[period]].max;
          minMinute = BALL_LIMITE_TIME[sportType][FOOTBALL_PERIOD_TYPE[period]].min;
          break;
        default:
          maxMinute = BALL_LIMITE_TIME[sportType][FOOTBALL_PERIOD_TYPE[PERIOD_TYPE.FIRST_HALF]].max;
          minMinute = BALL_LIMITE_TIME[sportType][FOOTBALL_PERIOD_TYPE[PERIOD_TYPE.FIRST_HALF]].min;
      }
    }

    return {
      minute: Math.floor(elapseTime / 60 / 1000),
      paused: paused === 1,
      maxMinute,
      minMinute,
      operator,
      timerSuffix: TIMER_SUFFIX,
    }
  },
)
