/* eslint-disable class-methods-use-this */
import React from 'react'
import { connect } from 'dva';
import { translate } from 'react-i18next';
import { get } from 'lodash';

import GameList from '../components/game-list';
import { subGameList } from '../models/actions'
import { makeFormattedGames, getActiveSportType, getActiveGroupName } from '../models/selector'

// import { intervalEnQueue } from '../../../../intervalQueue';

function mapStateToProps(state) {
  return {
    sportType: getActiveSportType(state),
    groupType: get(state, 'gamePortal.activeGroupType'),
    groupName: getActiveGroupName(state),
    formatedGames: makeFormattedGames(state),
    matchUserCount: get(state, 'gamePortal.matchUserCount'),
    loadingGameList: get(state, 'gamePortal.loadingGameList'),
    loadingMatchUserCount: get(state, 'gamePortal.loadingMatchUserCount'),
  };
}

@connect(mapStateToProps, {
  subGameList,
})
@translate('gamePortal', { wait: true })
class Container extends React.Component {
  componentDidMount() {
    const { type, groupType } = this.props;
    if (type === groupType) { this.props.subGameList() }
  }
  componentWillReceiveProps(nextProps) {
    const { sportType, groupType, groupName } = this.props
    const {
      sportType: newSportType,
      groupType: newGroupType,
      groupName: newGroupName,
      type,
     } = nextProps
    const should = (sportType !== newSportType)
      || (groupType !== newGroupType)
      || (groupName !== newGroupName)
    if (should) {
      if (type === newGroupType) { this.props.subGameList() }
    }
  }
  render() {
    const { t } = this.props
    const msgs = {
      byTime: t(['gameList.goSitePending']),
    }
    return <GameList {...this.props} msgs={msgs} />
  }
}

export default Container;
