import { API_COMMAND } from './apiProtocol'
import { requestGameApi, requestLoginApi, requestJDShareInfo } from './JDGameApi'
import apiListeners from './apiListener'

const intervalTime = 5000   // 毫秒/刷新间隔/不同协议可定义不同刷新时间

/**
 * 监听开赛比赛分组
 * @param sportType  竞猜类型，0篮球1足球 99电竞
 * @param groupType  分组类型，0时间分组1联赛分组
 * @param cbk       回调函数
 * @return {function(): *}
 */
export async function listenMatchGroup(intervalName, sportType, groupType, cbk) {
  const request = (hash) => {
    const body = {
      groupType,
      ...hash,
    }
    return requestGameApi(API_COMMAND.OPEN_MATCH_GROUP, body)
  }
  await apiListeners.listen(
    intervalName,
    sportType,
    null,
    request,
    intervalTime,
    cbk)

  return () => (apiListeners.cancel(intervalName))
}

/**
 * 监听开赛比赛列表
 * @param sportType
 * @param groupType
 * @param groupName
 * @param cbk
 * @return {function(): *}
 */
export async function listenMatchList(intervalName, sportType, groupType, groupName, cbk) {
  const request = (hash) => {
    const body = {
      groupType,
      groupName,
      ...hash,
    }
    return requestGameApi(API_COMMAND.OPEN_MATCH_LIST, body)
  }
  await apiListeners.listen(
    intervalName,
    sportType,
    null,
    request,
    intervalTime,
    cbk)

  return () => (apiListeners.cancel(intervalName))
}
/**
 * 监听比赛详情
 * @param sportType
 * @param matchId
 * @param cbk
 * @return {function(): *}
 */
export async function listenMatchDetail(intervalName, sportType, matchId, cbk) {
  const request = (hash) => {
    const body = {
      ...hash,
    }
    return requestGameApi(API_COMMAND.OPEN_MATCH_DETAIL, body)
  }
  await apiListeners.listen(
    intervalName,
    sportType,
    matchId,
    request,
    intervalTime,
    cbk)

  return () => (apiListeners.cancel(intervalName))
}

/**
 * 游戏配置项
 * @return {*}
 */
export function getGameConfig(gameCode = 100, channelId) {
  const body = {
    gameCode,
    channelId,
  }
  return requestGameApi(API_COMMAND.GAME_CONFIG, body)
}


/**
 * 游戏类型列表
 * @return {*}
 */
export function getSportTypeList() {
  return requestGameApi(API_COMMAND.SPORT_TYPE_LIST)
}

/**
 * 参与竞猜人数
 * @return {*}
 */
export function getMatchUserCount(sportType) {
  const body = {
    sportType,
  }
  return requestGameApi(API_COMMAND.MATCH_USER_COUNT, body)
}

/**
 * 投注
 * @param bets
 * @param odds
 * @param matchId
 * @param betOption
 * @param sportType
 * @param handicap
 * @return {*}
 */
export function bet(bets, odds, matchId, betOption, sportType, handicap) {
  const body = {
    bets,
    odds,
    matchId,
    betOption,
    sportType,
    handicap,
  }
  return requestGameApi(API_COMMAND.BET, body)
}

export function getOrderListModalData({ type, pagination }) {
  const body = { type }

  return function () {
    return requestGameApi(API_COMMAND.GET_ORDER_LIST, body, pagination)
  }
}

export function getLoginInfo() {
  return requestLoginApi()
}

export function getJDShareInfo() {
  return requestJDShareInfo()
}
/**
 test() {
      listenMatchGroup('0', '0', (json) => {
        console.error('listenMatchGroup : cbk', json)
      })
        .then(
          (cancelHandel) => {
            setTimeout(() => (cancelHandel()), 10000)
          })
      listenMatchList('0', '0', '2017-06-30', (json) => {
        console.error('listenMatchList : cbk', json)
      })
        .then(
          (cancelHandel) => {
            setTimeout(() => (cancelHandel()), 10000)
          })
      listenMatchDetail('0', '988', (json) => {
        console.error('listenMatchList : cbk', json)
      })
        .then(
          (cancelHandel) => {
            setTimeout(() => (cancelHandel()), 10000)
          })
      console.error('getSportTypeList', getSportTypeList())
*/

