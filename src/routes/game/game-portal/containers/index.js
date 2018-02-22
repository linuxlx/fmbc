import React from 'react'
import { connect } from 'dva';
import { translate } from 'react-i18next';
import { get } from 'lodash';

import GamePortal from '../components/gamePortal';
import { changeGameType, changeGroupType } from '../models/actions'
import { selectColor } from '../../../../models/selector';
// import { makeMultiedCounter } from '../models/selector'

function mapStateToProps(state) {
  return {
    cumulate: get(state, 'gamePortal.cumulate'),
    gameTypes: get(state, 'gamePortal.gameTypes'),
    activeTypeIndex: get(state, 'gamePortal.activeTypeIndex'),
    activeGroupType: get(state, 'gamePortal.activeGroupType'),
    promtImgUrl: get(state, 'gamePortal.promtImgUrl'),
    loadingGamePortal: get(state, 'loading.models.gamePortal'),
    themeColor: selectColor(state),
  };
}

@connect(mapStateToProps, {
  changeGameType,
  changeGroupType,
})
@translate('gamePortal', { wait: true })
class Container extends React.Component {
  componentWillUnmount() {
    // this.props.cancelMatchGroupsHandle()
  }
  render() {
    const { t } = this.props
    const msgs = {
      byTime: t(['contentTitle.byTime']),
      byLeague: t(['contentTitle.byLeague']),
    }
    return <GamePortal {...this.props} msgs={msgs} />
  }
}

export default Container;
