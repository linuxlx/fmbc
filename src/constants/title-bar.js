/* eslint-disable no-unused-vars */
import { browserHistory } from '../index';

export const ROUTE_BACK_BUTTON_LIST = [
  {
    pathname: 'gameDetail',
    pathReg: '/game/detail/:sportType/:matchId',
    displayBtn: true,
    button: {
      action: () => browserHistory.push('/game'),
      label: null,
      labelFromStore: 'common.appConf.gameName',
    },
  },
  {
    pathname: 'gamePortal',
    pathReg: '/game',
    displayBtn: false,
    button: {
      action: null,
      label: null,
      labelFromStore: null,
    },
  },
]

