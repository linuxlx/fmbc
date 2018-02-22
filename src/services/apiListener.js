/* eslint-disable no-unused-vars */
/**
 * Created by wangyu on 2017/7/5.
 */
import { requestGameApi } from './JDGameApi'
import { API_COMMAND } from './apiProtocol'

const _dataHashs = []

/**
 * 哈希对象
 */
class DataHash {
  constructor(hashData) {
    this.set(hashData)
  }
  set(hashData) {
    this.t = hashData.t
    this.s = hashData.s
    this.k = hashData.k
    this.ts = new Date()
  }
  hasExpired(interval) {
    return (new Date().getTime() - this.ts.getTime() > interval)
  }
  refreshHash(hashData) {
    let shouldRefresh = false
    if (this.t !== hashData.t || this.s !== hashData.s || this.k !== hashData.k) {
      shouldRefresh = true
    }
    this.set(hashData)
    return shouldRefresh
  }
}

/**
 * 取一个最近可用的hash
 * @param sportType
 * @param matchId
 * @return {*}
 * @private
 */
async function _getHashCache(sportType, matchId, expireTime) {
  const key = matchId ? sportType + matchId : sportType
  if (_dataHashs[key] && !_dataHashs[key].hasExpired(expireTime)) {
    return _dataHashs[key]
  }
  const request = {
    sportType,
  }
  if (matchId) request.matchId = matchId
  const { data } = await requestGameApi(API_COMMAND.OPEN_MATCH_PARAM, request)

  _dataHashs[key] = new DataHash(data);
  return _dataHashs[key]
}

class ApiListeners {
  constructor() {
    console.warn('ApiListeners start')
    this.apiListeners = new Map()
    setInterval(this.observer.bind(this), 100)
    this.canRequest = true;
  }
  async listen(intervalName, sportType, matchId, request, interval, cbk) {
    if (this.apiListeners.has(intervalName)) { // 监听函数已存在
      const listener = this.apiListeners.get(intervalName)
      listener.hash = await _getHashCache(sportType, matchId, interval)
      listener.request = request
      listener.interval = interval
      listener.sportType = sportType
      listener.matchId = matchId
      listener.cbk = cbk
      const resp = await request(listener.hash)
      cbk(resp)
    } else {
      this.apiListeners.set(intervalName, {
        hash: await _getHashCache(sportType, matchId, interval),
        request,
        interval,
        sportType,
        matchId,
        cbk,
      })
      const resp = await request(this.apiListeners.get(intervalName).hash)
      cbk(resp)
    }
  }
  cancel(intervalName) {
    if (this.apiListeners.has(intervalName)) delete this.apiListeners.delete(intervalName)
  }

  async observer() {
    for (const [key, value] of this.apiListeners) {
      const {
        hash,
        request,
        interval,
        sportType,
        matchId,
        cbk,
      } = value
      if (hash && request && interval && this.canRequest) {
        if (hash.hasExpired(interval)) {
          this.canRequest = false;
          const newHash = await _getHashCache(sportType, matchId, interval)
          this.canRequest = true;
          if (hash.refreshHash(newHash)) {
            const resp = await request(hash)
            cbk(resp)
          }
        }
      }
    }
  }
}
export default new ApiListeners()
