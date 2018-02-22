/* ------------- plain Actions ------------- */
export function closeModal() {
  return {
    type: 'common/closeModal',
  }
}

export function openModal() {
  return {
    type: 'common/asyncOpenModal',
  }
}

export function clearModal() {
  return {
    type: 'common/clearModal',
  }
}

export function optionModal(payload) {
  return {
    type: 'common/optionModal',
    payload,
  }
}

export function getLoginInfo() {
  return {
    type: 'common/getLoginInfo',
  }
}

export function getLoginInfo1() {
  return dispatch =>
    dispatch({
      type: 'common/getLoginInfo',
    })
}
export function getAppConf() {
  return {
    type: 'common/getAppConf',
  }
}

export function getCorpSourceConf(corpSource) {
  return {
    type: 'common/getCorpSourceConf',
    corpSource,
  }
}
