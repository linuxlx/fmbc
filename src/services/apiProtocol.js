export const API_COMMAND = {
  GAME_CONFIG: 'gameConfig',
  OPEN_MATCH_PARAM: 'openMatchParam',
  SPORT_TYPE_LIST: 'sportTypeList',
  OPEN_MATCH_GROUP: 'openMatchGroup',
  OPEN_MATCH_LIST: 'openMatchList',
  OPEN_MATCH_DETAIL: 'openMatchDetail',
  BET: 'bet',
  GET_ORDER_LIST: 'orderList',
  GET_GAME_DESCRIPTION: 'gameInfo',
  MATCH_USER_COUNT: 'matchUserCount',
  GAME_LOGIN_INFO: 'login',
};

export const ERROR_CODE = {
  NO_ERROR: 0, // 无错误
  JD_GATEWAY_ERROR: 999999998,  //  http状态错误
  HTTP_STATE_ERROR: 999999999,  //  http状态错误
};

export const API_PATH = {
  login: '/login',
  JDShareInfo: process.env.NODE_ENV === 'development'
    ? '/jdapi/roll/shareInfo.action'
    : '/roll/shareInfo.action',
}

export const API_ERROR_TYPE = {
  SERVER: 'server',
  RESPONSE: 'response',
}
