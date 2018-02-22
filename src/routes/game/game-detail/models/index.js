import { listenMatchDetail, bet } from '../../../../services';
import { intervalRegister } from '../../../../utils/interval-register';
import {
  selectAccountLogin,
  selectGameDetailDefaultInputCount,
  makeSelectMatchBetInfo,
  makeSelectMatchInputCountDefault,
} from './selector';
import { LOGIN_STATES } from '../../../../constants/index';

// const delay = (time) => new Promise((resolve)=>{
// setTimeout(resolve, time);
// });

const initialState = {
  data: {},
  loading: false,
  error: false,
  optionIds: false,
  optionId: false,
  isShowNumbericKeyBoard: false,
  inputCount: '1',
  inputCountTem: '1',
  betVisible: false,
  playtypeStickiedIds: {},
  betErrorResult: false,
  activeKey: [],
  playtypesOptionIdSort: [],
  defaultInputCount: 0,
  betBoxHeaderHeight: 0,
  betErrorLoading: false,
};

export default {
  namespace: 'gameDetail',
  state: initialState,
  reducers: {
    gameDetailInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
        loading: false,
        error: false,
      };
    },
    setGameDetailCancel(state, { cancelHandel }) {
      return { ...state, cancelHandel };
    },
    gameDetailError(state) {
      return { ...state, error: true, loading: false };
    },
    gameDetailLoading(state) {
      return { ...state, loading: true, error: false };
    },
    changeGameBetOption(state, { optionIds, optionId }) {
      return { ...state, optionIds, optionId, isShowNumbericKeyBoard: false };
    },
    clearGameBetOption(state) {
      return { ...state, optionIds: false, optionId: false, isShowNumbericKeyBoard: false };
    },
    clearGameDetail(state) {
      return {
        ...initialState,
        defaultInputCount: state.defaultInputCount,
        playtypeStickiedIds: state.playtypeStickiedIds,
      };
    },
    showNumbericKeyBoard(state) {
      return {
        ...state,
        isShowNumbericKeyBoard: true,
        inputCountTem: state.inputCount,
        inputCount: '',
      };
    },
    hideNumbericKeyBoard(state) {
      return {
        ...state,
        isShowNumbericKeyBoard: false,
        inputCount: state.inputCountTem,
      };
    },
    setInputCount(state, { inputCount }) {
      return { ...state, inputCount };
    },
    betLoading(state) {
      return { ...state, betLoading: true, betErrorLoading: false };
    },
    betSuccess(state) {
      return { ...state, betSuccess: true, betLoading: false, betError: false };
    },
    betError(state, { payload }) {
      return {
        ...state,
        betError: true,
        betLoading: false,
        betSuccess: false,
        betErrorResult: payload,
      };
    },
    betResponeError(state) {
      return {
        ...state,
        betVisible: false,
        betLoading: false,
        betErrorLoading: true,
      }
    },
    betModalVisible(state, { visible }) {
      return { ...state, betVisible: visible };
    },
    setPlaytypeStickiedIds(state, { id, sportType }) {
      const { playtypeStickiedIds } = state;
      if (!sportType) {
        return { ...state };
      } else {
        const currentArr = playtypeStickiedIds[sportType] || [];

        const index = currentArr.indexOf(id);
        let newArr = [];
        if (index > -1) {
          newArr = [
            ...currentArr.slice(0, index),
            ...currentArr.slice(index + 1, currentArr.length),
          ];
        } else {
          newArr = [id, ...currentArr];
        }
        return {
          ...state,
          playtypeStickiedIds: {
            ...state.playtypeStickiedIds,
            [sportType]: newArr,
          },
        };
      }
    },
    createPlaytypeStickiedIds(state, { playtypeStickiedIds }) {
      return { ...state, playtypeStickiedIds };
    },
    changeAccordion(state, { activeKey, playtypesOptionIdSort }) {
      return { ...state, activeKey, playtypesOptionIdSort };
    },
    setDefaultInputCount(state, { defaultInputCount }) {
      return { ...state, defaultInputCount: defaultInputCount || initialState.defaultInputCount }
    },
    changeBetBoxHeaderHeight(state, { height }) {
      return { ...state, betBoxHeaderHeight: height }
    },
  },
  effects: {
    * initMatchGameDetail(action, { put }) {
      const { params } = action;
      const { sportType, matchId } = params;
      yield put({ type: 'gameDetailLoading' });
      try {
        yield intervalRegister('/game', 'data', 'gameDetail/gameDetailInfo', listenMatchDetail, [sportType, matchId]);
      } catch (error) {
        yield put({ type: 'gameDetailError' });
      }
    },
    * bet({ payload }, { select, call, put }) {
      const login = yield select(selectAccountLogin);

      if (login !== LOGIN_STATES.LOGGING) {
        window.alert('触发登录');
      } else {
        yield put({ type: 'betLoading' });
        yield put({ type: 'betModalVisible', visible: true });

        try {
          const {
            inputCount, bets, odds, matchId, betOption, sportType, handicap,
          } = yield select(makeSelectMatchBetInfo());
          const { data } = yield call(bet, bets, odds, matchId, betOption, sportType, handicap);
          if (data.code === 0) {
            yield put({ type: 'setDefaultInputCount', defaultInputCount: inputCount });
            yield put({ type: 'betSuccess' });
            yield put({ type: 'clearGameBetOption' });
            // 刷新余额
            yield put({ type: 'common/getLoginInfo' });
          } else {
            // 1001余额不足、1002超出口注阀值、1003盘口已关闭、1004赔率校验错误、1005盘口不一致、1006订单重复、1007帐户状态异常、1000业务处理异常
            // 20001 消费失败
            // 默认  请求异常
            if (data.code === 1001 || data.code === 20001) {
              yield put({ type: 'common/getLoginInfo' });
            }
            yield put({ type: 'betError', payload: data });
          }
        } catch (e) {
          yield put({ type: 'betResponeError' });
        }
      }
    },
    * setInputCountDefault({ payload }, { select, put }) {
      const lastInputCount = yield select(selectGameDetailDefaultInputCount);
      const inputCount = yield (lastInputCount || select(makeSelectMatchInputCountDefault()));
      yield put({ type: 'setInputCount', inputCount });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if ((/^\/game\/detail/g).test(pathname)) {
          dispatch({ type: 'mping/pageEvent', pageName: 'gameDetail' });
        }
      });
    },
  },
}
