/* eslint-disable no-undef */
import React from 'react'
import { merge, omit, uniqWith, isEqual, isArray } from 'lodash'
import { Toast } from 'antd-mobile';
// import pathToRegexp from 'path-to-regexp'

// import { getLoginInfo } from '../services/mock'
import Description from '../components/description';
import ModalTitle from '../components/modal-title';
import { getGameConfig, getLoginInfo, getJDShareInfo } from '../services';
/* getLoginInfo1*/
import { descriptionParse, addStyle } from '../utils/commonFunctions'
import { WALLET_TYPE_MAP, OPEN_ERROR_TYPE } from '../constants/game-config'
import { modalStyles, LOGIN_STATES } from '../constants';
import apiListener from '../services/apiListener'
import CoinImgUrl from '../assets/icon/coin@2x.png';

import { makeSelectWalletType, makeSelectServerError, makeSelectResponeError } from './selector';

const globalErrorType = process.env.OPEN_ERROR_TYPE;
export default {
  namespace: 'common',
  state: {
    locale: 'zh-cn',
    account: {
      login: LOGIN_STATES.UNKNOWN,
      balance: 0,
      accountId: '',
    },
    cantIntoApp: false,
    loginUrl: '',
    appConf: {
      loading: false,
      gameName: '神豆猜球',
      channelId: '', // todo: 用jsBridge拿
      gameCode: '',
      forcedLogin: 0,
      walletType: WALLET_TYPE_MAP['第三方'],  // 是否外置钱包
      coinUrl: '/assets/icon/coin.jpg',  // 游戏币图标链接
      coinName: '神豆',  // 游戏币名称
      exchangeRate: 1000, // 游戏币除以人民币 兑换比例
      decimals: 2, // 小数点保留几位
      betMultiple: 100, // 输入投注金额最小单位
      betDefault: 100,
      description: [],
      showType: '1',
      theme: {
        color: '#F23030',
      },
      rechargeUrl: 'http://ylc.m.jd.com?h=buy',
      assets: {
        coin: {
          coinIcon: CoinImgUrl,
        },
      },
    },
    modal: {
      visible: false,
      style: modalStyles,
      transparent: true,
      maskClosable: true,
      title: '',
      content: <h2>loading...</h2>,
    },
    intervalHandles: { // todo: 去掉
    },
    handleCount: 0, // 去掉
    descriptionData: [],
    error: {
      serverError: {},
      responseError: [],
    },
    intervalQueue: {},
  },
  cumulate: 1,

  effects: {
    *getCorpSourceConf({ corpSource }, { call }) {
      switch (corpSource) {
        case 'JD':
          try {
            const data = yield call(getJDShareInfo);
            if (data) {
              // const { title, content, url, img } = data
              const jdShare = require('../utils/jdShare')
              jdShare.setShareInfo(data)
            }
          } catch (err) {
            console.error(err)
          }
          break
        default:
          break
      }
    },
    * goBeans(action, { select }) {
      const { title, jsbridge, rechargeUrl, walletType } = yield select(makeSelectWalletType);
      if (rechargeUrl.length && walletType === WALLET_TYPE_MAP['第三方']) {
        window.location.href = rechargeUrl;
      } else {
        Toast.info(`${title} ${jsbridge}`)
      }
    },
    * getLoginInfo(action, { call, put }) {
      const { balance, accountId, returnCode } = yield call(getLoginInfo);
      let login;
      if (returnCode !== -1) {
        login = LOGIN_STATES.LOGGING
      } else {
        login = LOGIN_STATES.UNLOGIN
      }
      yield put({
        type: 'saveLoginInfo',
        payload: {
          login,
          balance,
          accountId,
        },
      });
    },
    // listenLoginState: [function *({ take, select }) {
    //   while (true) {
    //     yield take('common/saveLoginInfo')
    //     const loginInfo = yield select(getLogin);
    //     const loginUrl = yield select(selectLoginUrl);
    //     if (loginInfo === LOGIN_STATES.UNLOGIN && loginUrl !== '') {
    //       window.location.href = `${loginUrl}`;
    //     }
    //   }
    // }, { type: 'watcher' }],
    listenServiceError: [function* ({ take, select, put }) {
      while (true) {
        yield take('common/pushServerError')
        const {
          errorMsg,
          json: {
            returnCode,
            loginUrl,
          },
        } = yield select(makeSelectServerError);
        if (errorMsg) {
          if (globalErrorType === OPEN_ERROR_TYPE.detail) {
            Toast.info(errorMsg)
          } else if (globalErrorType === OPEN_ERROR_TYPE.simple) {
            Toast.info('服务异常')
          }
        }
        if (returnCode === '3') {
          window.location.href = loginUrl;
          yield put({
            type: 'writeLoginState',
            cantIntoApp: true,
          })
        }
      }
    }, { type: 'watcher' }],
    listenResponeError: [function* ({ take, select }) {
      while (true) {
        yield take('common/pushResponseError')
        const { errorMsg } = yield select(makeSelectResponeError);
        if (errorMsg) {
          if (globalErrorType === OPEN_ERROR_TYPE.detail) {
            Toast.info(errorMsg)
          } else if (globalErrorType === OPEN_ERROR_TYPE.simple) {
            Toast.info('服务异常')
          }
        }
      }
    }, { type: 'watcher' }],
    * cancelHandle({ handleName }, { put }) {
      // const handle = yield select(state => get(state, `common.intervalHandles.${handleName}`))
      // if (isFunction(handle)) {
      // handle() // todo: 不再store存储handle而是使用handleName去注销
      apiListener.cancel(handleName)
      yield put({
        type: 'removeIntervalHandle',
        handleName,
      })
      // }
    },
    * showDescriptionModal(action, { put }) {
      yield put({
        type: 'optionModal',
        payload: {
          content: <Description />,
          title: <ModalTitle title="description" />,
          visible: true,
          style: {
            ...modalStyles,
            overflowY: 'hidden',
          },
        },
      })
    },
    * asyncOpenModal(action, { put }) {
      yield put({ type: 'clearModal' })
      yield put({ type: 'openModal' })
    },
    * getAppConf(action, { put, call }) {
      yield put({ type: 'setAppConfLoading' });
      const { data } = yield call(getGameConfig);
      if (data) {
        const {
          forcedLogin,
          description,
          walletType,
        } = data;
        // walletType: WALLET_TYPE_MAP['第三方'],  // 是否外置钱包
        addStyle(`
          .themeFontColor{color:${data.theme.color} !important}
          .themeBgColor{background-color:${data.theme.color} !important}
          .themeBorderColor{border-color:${data.theme.color} !important}
        `)
        yield put({
          type: 'setAppConf',
          payload: {
            appConf: {
              ...data,
              description: descriptionParse(description, 'title'),
            },
          },
        });
        if (forcedLogin === 1 && false) { // 强制登录
          switch (walletType) {
            case 1:// 章鱼
              console.error('章鱼需要jsbridge登录')
              break;
            default:// 第三方
              console.error('章鱼需要jsbridge登录')
          }
        } else {
          yield put({
            type: 'getLoginInfo',
          })
        }
      }
    },
  },

  reducers: {
    writeIntoApp(state, { canIntoApp }) {
      return {
        ...state,
        canIntoApp,
      }
    },
    writeLoginUrl(state, { loginUrl }) {
      return {
        ...state,
        loginUrl,
      }
    },
    intervalEnQueue(state, { payload }) {
      const intervalQueue = { ...state.intervalQueue };
      intervalQueue[payload.pathname] = payload.queue;
      return {
        ...state,
        intervalQueue,
      }
    },
    intervalDeQueue(state, { pathname }) {
      const intervalQueue = { ...state.intervalQueue };
      intervalQueue[pathname] = [];
      return {
        ...state,
        intervalQueue,
      }
    },
    saveLoginInfo(state, { payload }) {
      return {
        ...state,
        account: payload,
      }
    },
    openModal(state) {
      return {
        ...state,
        modal: {
          ...state.modal,
          visible: true,
        },
      }
    },
    closeModal(state) {
      return {
        ...state,
        modal: {
          ...state.modal,
          visible: false,
        },
      }
    },
    clearModal(state) {
      return {
        ...state,
        modal: {
          ...state.modal,
          title: '',
          content: <h2>loding...</h2>,
        },
      }
    },
    optionModal(state, { payload }) {
      return {
        ...state,
        modal: {
          ...state.modal,
          ...payload,
        },
      }
    },
    pushServerError(state, { serverError }) {
      const dataSource = { ...state };
      dataSource.error.serverError = serverError;
      return {
        ...dataSource,
        error: {
          ...dataSource.error,
        },
      }
    },
    pushResponseError(state, { responseError }) {
      const dataSource = { ...state };
      dataSource.error.responseError.push(responseError)
      dataSource.error.responseError = uniqWith(dataSource.error.responseError, isEqual)
      return {
        ...dataSource,
        error: {
          ...dataSource.error,
        },
      }
    },
    clearError(state, { errorType, command, code }) {
      const errorSource = state.error;
      if (!isArray(errorSource[errorType])) {
        errorSource[errorType] = {};
      } else {
        errorSource[errorType] = errorSource[errorType]
          .filter(item => item.command !== command || item.code !== code)
      }
      return {
        ...state,
        error: {
          ...errorSource,
        },
      }
    },
    // 保存轮询的handle到store中以备取消轮询使用
    saveIntervalHandle(state, { payload: { handleName, handle } }) {
      const modifier = {
        intervalHandles: {},
      }
      modifier.intervalHandles[handleName] = handle
      const newState = merge(state, modifier)
      newState.handleCount = Object.keys(newState.intervalHandles).length
      console.warn(`新增/更新轮询${handleName},当前轮询进程数目:${newState.handleCount}`, newState.intervalHandles)
      return newState
    },
    removeIntervalHandle(state, { handleName }) {
      const newState = {
        ...state,
        intervalHandles: omit(state.intervalHandles, handleName),
      }
      newState.handleCount = Object.keys(newState.intervalHandles).length
      console.warn(`去掉轮询${handleName},当前轮询进程数目:${newState.handleCount}`, newState.intervalHandles)
      return newState
    },
    changeLocale(state, { payload }) {
      return {
        ...state,
        localt: payload.locale,
      }
    },
    setAppConfLoading(state) {
      return {
        ...state,
        appConf: {
          ...state.appConf,
          loading: true,
        },
      }
    },
    setAppConf(state, { payload }) {
      // const {
      //   gameName,
      //   channelId, // todo: 用jsBridge拿
      //   gameCode,
      //   forcedLogin,
      //   walletType,  // 是否外置钱包
      //   coinUrl,  // 游戏币图标链接
      //   coinName,  // 游戏币名称
      //   exchangeRate, // 游戏币除以人民币 兑换比例
      //   decimals, // 小数点保留几位
      //   betMultiple, // 输入投注金额最小单位
      //   betDefault,
      //   description,
      //   showType = '1', // 暂时处理  接口无数据
      // } = payload.appConf;
      return {
        ...state,
        appConf: {
          ...state.appConf,
          ...payload.appConf,
          loading: false,
        },
      }
    },
  },

  subscriptions: {
    // setup({dispatch, history}) {
    //   return history.listen(({pathname, query}) => {
    //     const match = pathToRegexp('/game/detail/:sportType/:matchId').exec(pathname)
    //     if (match) {
    //       const [pathname, sportType, matchId] = match
    //       console.log('当前路由参数', sportType, matchId)
    //     }
    //   });
    // },  // todo: 监听路由确定返回按钮显示
  },
};
