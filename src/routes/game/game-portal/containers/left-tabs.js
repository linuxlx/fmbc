/* eslint-disable class-methods-use-this */
import React from 'react'
import { connect } from 'dva';
import { get, isArray, reduce } from 'lodash';

import LeftTabs from '../components/left-tabs';
import { changeGroupIndex, subMatchGroups, onlyGetGameType } from '../models/actions'
import { getFormatedMatchGroups, getActiveSportType } from '../models/selector'

function mapStateToProps(state) {
  return {
    sportType: getActiveSportType(state),
    groupType: get(state, 'gamePortal.activeGroupType'),
    matchGroups: getFormatedMatchGroups(state),
    activeGroupIndex: get(state, 'gamePortal.activeGroupIndex'),
    loadingMatchGroups: get(state, 'gamePortal.loadingMatchGroups'),
  };
}

@connect(mapStateToProps, {
  changeGroupIndex,
  subMatchGroups,
  onlyGetGameType,
})
class Container extends React.PureComponent {
  componentDidMount() {
    const { type, groupType } = this.props;
    if (type === groupType) {
      this.props.subMatchGroups()
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      sportType,
      groupType,
      matchGroups,
      activeTypeIndex,
    } = this.props;
    const { sportType: newSportType, groupType: newGroupType, type } = nextProps
    const should = (sportType !== newSportType)
      || (groupType !== newGroupType)
    if (should) {
      if (type === newGroupType) {
        this.props.subMatchGroups()
      }
    }
    if (groupType === newGroupType && activeTypeIndex === newGroupType.activeTypeIndex) {
      if (this.redurceMatchNum(matchGroups) !== this.redurceMatchNum(nextProps.matchGroups)
        && this.redurceMatchNum(matchGroups) > 0
        && this.redurceMatchNum(nextProps.matchGroups) > 0) {
        this.props.onlyGetGameType();
      }
    }
  }

  componentWillUnmount() {
    // this.props.cancelMatchGroupsHandle()
  }

  redurceMatchNum = (arr) => {
    if (!isArray(arr)) return 0;
    return reduce(arr, (sum, currentItem) => {
      return sum + currentItem.matchCount
    }, 0)
  }


  render() {
    return <LeftTabs {...this.props} />
  }
}

export default Container;
