/* eslint-disable no-unused-vars,no-param-reassign */
import { reduce } from 'lodash'

import * as mockServices from '../../../../services/mock';
import { getSportTypeList, listenMatchGroup, listenMatchList, getMatchUserCount } from '../../../../services';
import { intervalRegister } from '../../../../utils/interval-register'
import { GROUP_TYPE_MAP } from '../constants'
import { getActiveSportType, getActiveGroupType, getActiveGroupName } from './selector'


const initState = {
  gameTypes: [],  // 顶部比赛类型菜单 sportType
  matchGroups: [], // 左侧分组数据
  games: [],
  activeTypeIndex: 0,  // 顶部竞技类型分类菜单
  activeGroupType: GROUP_TYPE_MAP.byTime,  // 当前分组模式Tab，默认按时间
  activeGroupIndex: 0, // 左侧分组栏激活分组
  // promtImgUrl: 'https://ossweb-img.qq.com/upload/webplat/info/yxzj/20170621/1498036625180683.jpg',
  promtImgUrl: '',
  orderlist: [],
  matchUserCount: [],
  loadingOrderList: true,
  loadingGameList: true,
  loadingMatchGroups: true,
  loadingMatchUserCount: true,
}

export default {
  namespace: 'gamePortal',
  state: initState,
  reducers: {
    add(state, action) {
      return { ...state, cumulate: state.cumulate + action.payload.add };
    },
    rehydrate(state, { payload: { cumulate } }) {
      return { ...state, cumulate }
    },
    saveGameTypes(state, { payload: { gameTypes } }) {
      return { ...state, gameTypes }
    },
    saveGames(state, { payload: { games } }) {
      return { ...state, games, loadingGameList: false }
    },
    saveMatchGroups(state, { payload: { matchGroups } }) {  // 保存左侧分栏列表 todo: 去掉1，替换假数据
      return { ...state, matchGroups, loadingMatchGroups: false }
    },
    saveUserCount(state, { userCount }) {
      const formattedCounts = reduce(userCount, (result, value) => {
        result[value.matchId] = value.count
        return result
      }, {})
      return { ...state, matchUserCount: formattedCounts, loadingMatchUserCount: false }
    },
    changeGameType(state, { index: activeTypeIndex }) {
      return { ...state, activeTypeIndex, loadingMatchUserCount: true }
    },
    changeGroupType(state, { key: activeGroupType }) {
      return { ...state, activeGroupType, activeGroupIndex: initState.activeGroupIndex }
    },
    changeGroupIndex(state, { index: activeGroupIndex }) {
      return { ...state, activeGroupIndex }
    },
    clearGames(state) {
      return {
        ...state,
        games: initState.games,
        loadingGameList: initState.loadingGameList,
      }
    },
    clearMatchGroups(state) {
      return {
        ...state,
        matchGroups: initState.matchGroups,
        loadingGameList: initState.loadingGameList,
        loadingMatchGroups: initState.loadingMatchGroups,
      }
    },
  },
  effects: {
    * changeGameType(action, { call, put }) {
      yield put({
        type: 'getMatchUserCount',
      })
    },
    * getGameType(action, { call, put }) {
      const { data: { data: gameTypes } } = yield call(getSportTypeList);
      // const { data: gameTypes } = yield call(mockServices.getGameTypes);
      yield put({
        type: 'saveGameTypes',
        payload: {
          gameTypes,
        },
      })
      yield put({
        type: 'getMatchUserCount',
      });
      yield put({
        type: 'initMatchGroupAndGames',
      });
    },
    * getMatchUserCount(action, { call, put, select }) {
      const sportType = yield select(state => getActiveSportType(state))
      const { data: { data: userCount } } = yield call(getMatchUserCount, sportType)
      yield put({
        type: 'saveUserCount',
        userCount,
      })
      // const { data: usersCount } = yield call(getMatchUserCount, sportType);
    },
    * saveGamesEffects({ payload, interceptKeys }, { put, select }) {
      const sportType = yield select(state => getActiveSportType(state))
      const groupType = yield select(state => getActiveGroupType(state))
      const groupName = yield select(state => getActiveGroupName(state))
      if (
        interceptKeys[0] !== sportType ||
        interceptKeys[1] !== groupType ||
        interceptKeys[2] !== groupName
      ) {
        return false;
      }
      yield put({
        type: 'saveGames',
        payload,
      })
    },
    * saveMatchGroupsEffects({ payload, interceptKeys }, { put, select }) {
      const sportType = yield select(state => getActiveSportType(state))
      if (interceptKeys[0] !== sportType) {
        return false;
      }
      yield put({
        type: 'saveMatchGroups',
        payload,
      })
    },
    * subGameList(action, { call, put, select }) {
      const sportType = yield select(state => getActiveSportType(state))
      const groupType = yield select(state => getActiveGroupType(state))
      const groupName = yield select(state => getActiveGroupName(state))
      if (groupName === '') return false;
      yield put({ type: 'clearGames' })
      // yield put({ type: 'common/cancelHandle', handleName: 'games' })
      intervalRegister('/game', 'games', 'gamePortal/saveGamesEffects', listenMatchList, [sportType, groupType, groupName])
    },
    * subMatchGroups(action, { call, put, select }) {
      const sportType = yield select(state => getActiveSportType(state))
      const groupType = yield select(state => getActiveGroupType(state))
      yield put({ type: 'clearMatchGroups' })
      intervalRegister('/game', 'matchGroups', 'gamePortal/saveMatchGroupsEffects', listenMatchGroup, [sportType, groupType])
    },
    * initMatchGroupAndGames(action, { call, put, select }) {
      const sportType = yield select(state => getActiveSportType(state))
      const groupType = yield select(state => getActiveGroupType(state))
      const groupName = yield select(state => getActiveGroupName(state))
      yield intervalRegister('/game', 'matchGroups', 'gamePortal/saveMatchGroupsEffects', listenMatchGroup, [sportType, groupType])
      // intervalRegister(put, 'games', 'gamePortal/saveGames',
      // listenMatchList, [sportType, groupType, groupName]),
      // mock数据替代
      // const { data: gameTypes } = yield call(mockServices.getGameTypes);
    },
    * onlyGetGameType(action, { call, put }) {
      const { data: { data: gameTypes } } = yield call(getSportTypeList);
      yield put({
        type: 'saveGameTypes',
        payload: {
          gameTypes,
        },
      })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === `${process.env.PUBLIC_PATH ? '' : '/'}game`) {
          dispatch({ type: 'getGameType', payload: query });
          dispatch({ type: 'mping/pageEvent', pageName: 'gamePortal' });
          // dispatch({ type: 'initMatchGroupPoll' });
          // intervalRegister(dispatch, 'matchGroups', listenMatchGroup, ['0', '0'])
        }
      });
    },
  },
};
