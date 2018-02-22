/* eslint-disable no-unused-vars */
import { createSelector } from 'reselect';
import { get, each, dropRight, isEmpty } from 'lodash';
import numeral from 'numeral';
import pathToRegexp from 'path-to-regexp'
import { browserHistory } from '../index';
import { WALLET_TYPE_CONFIG } from '../constants/game-config';
import { LOGIN_STATES } from '../constants/index';
import { ROUTE_BACK_BUTTON_LIST } from '../constants/title-bar'
import { pathToRegexpGlobal } from '../utils/commonFunctions';

export const getBalance = state => get(state, 'common.account.balance')
export const getCoin = state => get(state, 'common.appConf.assets.coin.coinIcon')
export const getExRate = state => get(state, 'common.appConf.exchangeRate')
export const getLogin = state => get(state, 'common.account.login')
export const getDecimals = state => get(state, 'common.appConf.decimals')
export const selectAppConfLoading = state => get(state, 'common.appConf.loading')
export const selectWalletType = state => get(state, 'common.appConf.walletType')
export const selectServerError = state => get(state, 'common.error.serverError')
export const selectResponeError = state => get(state, 'common.error.responseError')
export const selectRechargeUrl = state => get(state, 'common.appConf.rechargeUrl')
export const selectLoginUrl = state => get(state, 'common.loginUrl')
export const selectColor = state => get(state, 'common.appConf.theme.color');
export const selectIntoApp = state => get(state, 'common.cantIntoApp')

export const makeFormatedBalance = createSelector(
  [getBalance, getExRate],
  (balance, exRate) => {
    const balanceStr = balance.toString()
    let limit = 6
    let formattedBalance = numeral(balance).format('0,0')
    switch (exRate) {
      case 100:
        limit = 7
        break
      case 1000:
        limit = 8
        break
      default:
        break
    }
    if (balanceStr.length >= limit) {
      const result = (balance / 10000).toString();
      formattedBalance = `${Math.floor(result * 100) / 100}万`;
    }
    return formattedBalance
  },
)

export function getTitleBarBackButton(location) {
  const { pathname, basename } = location
  let button = {
    label: null,
    labelFromStore: null,
    action: () => browserHistory.goBack(),
  }
  if (pathname) {
    each(ROUTE_BACK_BUTTON_LIST, (route) => {
      if (route.displayBtn) {
        const regPath = basename + route.pathReg
        const isMatch = pathToRegexpGlobal(regPath).test(`${basename}${pathname}`);
        if (isMatch) {
          button = route.button
          return false
        }
      }
    })
  }
  return button
}

export const makeSelectLogin = createSelector(
  getLogin,
  login => login === LOGIN_STATES.LOGGING,
)

export const makeBackButtonObj = (state, ownProps) => {
  const { location } = ownProps
  const backButton = getTitleBarBackButton(location)
  if (backButton.labelFromStore && !backButton.label) {
    backButton.label = get(state, backButton.labelFromStore, '后退')
  }
  return backButton
}

export const makeSelectWalletType = createSelector(
  [selectWalletType, selectRechargeUrl],
  (walletType, rechargeUrl) => ({
    ...WALLET_TYPE_CONFIG[walletType],
    rechargeUrl,
    walletType,
  }),
)


export const makeSelectServerError = createSelector(
  selectServerError,
  (serverError) => {
    const data = {
      errorState: get(serverError, 'code'),
      errorMsg: get(serverError, 'msg'),
      json: get(serverError, 'json'),
    };
    return !isEmpty(serverError) && data;
  },
);

export const makeSelectResponeError = createSelector(
  selectResponeError,
  (responeErrors) => {
    const lastError = responeErrors[responeErrors.length - 1];
    const data = {
      errorState: get(lastError, 'code'),
      errorMsg: get(lastError, 'msg'),
    };
    return !isEmpty(lastError) && data;
  },
);
