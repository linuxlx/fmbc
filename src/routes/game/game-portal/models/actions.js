export function changeGameType(index) {
  return {
    type: 'gamePortal/changeGameType',
    index,
  }
}

export function changeGroupIndex(index) {
  return {
    type: 'gamePortal/changeGroupIndex',
    index,
  }
}

export function changeGroupType(key) {
  return {
    type: 'gamePortal/changeGroupType',
    key,
  }
}

export function subGameList() {
  return {
    type: 'gamePortal/subGameList',
  }
}

export function subMatchGroups() {
  return {
    type: 'gamePortal/subMatchGroups',
  }
}

export function onlyGetGameType() {
  return {
    type: 'gamePortal/onlyGetGameType',
  }
}

/* // 自动取消 已经不用手动
 export function cancelMatchGroupsHandle() {
 return {
 type: 'common/cancelHandle',
 handleName: 'matchGroups',
 }
 }

 export function cancelGamesSubHandle() {
 return {
 type: 'common/cancelHandle',
 handleName: 'games',
 }
 }
 */
