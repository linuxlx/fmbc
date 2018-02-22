import { createSelector } from 'reselect'
import { get } from 'lodash'
import moment from 'moment'

import { GROUP_TYPE_MAP, HANDICAP_TYPES, HANDICAP_STATUS_MAP, FMTTIME_TEXT } from '../constants'

export const getMatchGroups = state => get(state, 'gamePortal.matchGroups')
export const getActiveGroupType = state => get(state, 'gamePortal.activeGroupType')
export const getActiveGroupIndex = state => get(state, 'gamePortal.activeGroupIndex')
export const getActiveTypeIndex = state => get(state, 'gamePortal.activeTypeIndex')
export const getGameTypes = state => get(state, 'gamePortal.gameTypes')
export const getGames = state => get(state, 'gamePortal.games')

export const getFormatedMatchGroups = createSelector(
  [getMatchGroups, getActiveGroupType],
  (matchGroup, activeGroupType) => {
    let result = []
    switch (activeGroupType) {
      case GROUP_TYPE_MAP.byTime:
        matchGroup.forEach(group => result.push({
          ...group,
          groupName: moment(group.groupName).format('dddd'),
          groupDate: moment(group.groupName).format('YYYY/MM/DD'),
        }))
        break
      default: // byLeague
        result = matchGroup
    }
    return result
  },
)

export const makeFormattedGames = createSelector(
  getGames, getActiveGroupType,
  (games, activeGroupType) => {
    const fmtedGames = [];
    if (games.length > 0) {
      games.forEach((game) => {
        const gameData = game;
        gameData.players.forEach((player) => {
          const playerData = player;
          playerData.scoreSum = player.score && player.score.reduce((a, b) => a + b, 0);
          return playerData;
        });
        gameData.isBeginning = (gameData.matchStatus !== 0);
        // 计算滚球待开始是否显示及内容类型
        let headerDescTransKey = ''
        const shouldDisplay = [
          HANDICAP_STATUS_MAP['滚球开售'],
          HANDICAP_STATUS_MAP['赛前滚球开售'],
        ].indexOf(gameData.handicapStatus) !== -1 // 本比赛开售滚球
        if (shouldDisplay && (gameData.handicapType === HANDICAP_TYPES['赛前盘'])) {  // 比赛没有开始
          headerDescTransKey = 'goSitePending'
        } else if (gameData.handicapType === HANDICAP_TYPES['走地盘']) {  // 比赛开始了
          headerDescTransKey = 'goSiteRolling'
        }
        // 计算时间格式
        const labelText = GROUP_TYPE_MAP.byLeague === activeGroupType ?
          moment(gameData.matchTime).calendar(null, {
            sameDay: FMTTIME_TEXT.sameDay,
            nextDay: FMTTIME_TEXT.nextDay,
            sameElse: FMTTIME_TEXT.sameElse,
            lastDay: FMTTIME_TEXT.sameElse,
            nextWeek: FMTTIME_TEXT.sameElse,
            lastWeek: FMTTIME_TEXT.sameElse,
          }) : `${gameData.leagueName} ${moment(gameData.matchTime).format('HH:SS')}`;
        fmtedGames.push({
          ...gameData,
          headerDescTransKey,
          labelText,
        })
      })
    }
    return fmtedGames
  },
)

export const getActiveSportType = createSelector(
  [getActiveTypeIndex, getGameTypes],
  (activeIndex, gameTypes) => {
    const sportType = get(gameTypes, `${activeIndex}.sportType`, 0)
    return sportType
  },
)

export const getActiveGroupName = createSelector(
  [getMatchGroups, getActiveGroupIndex],
  (groups, index) => {
    return get(groups, `${index}.groupName`, '')
  },
)

