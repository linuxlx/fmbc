import React from 'react';
import classnames from 'classnames/bind';
import { Icon } from 'antd-mobile'

import styles from './left-tabs.less'

const cx = classnames.bind(styles);

class LeftTabs extends React.Component {
  componentDidUpdate() {
    const {
      matchGroups,
      activeGroupIndex,
      changeGroupIndex,
    } = this.props;
    let defaultActiveGroupIndex = matchGroups.findIndex((value, index) => {
      return index === activeGroupIndex
    })
    if (defaultActiveGroupIndex === -1) defaultActiveGroupIndex = 0;
    changeGroupIndex(defaultActiveGroupIndex)
  }
  render() {
    const {
      matchGroups,
      activeGroupIndex,
      loadingMatchGroups,
      // actions
      changeGroupIndex,
    } = this.props
    let defaultActiveGroupIndex = matchGroups.findIndex((value, index) => {
      return index === activeGroupIndex
    })
    if (defaultActiveGroupIndex === -1) defaultActiveGroupIndex = 0;
    return (
      <div className={styles.wrapper}>
        {loadingMatchGroups ? <Icon type="loading" className={styles.loading} /> : <ul>
          {matchGroups.map((group, index) => {
            return (
              <li
                key={index}
                className={cx({ active: index === defaultActiveGroupIndex })}
                onTouchTap={() => changeGroupIndex(index)}
              >
                <p>{group.groupName}({group.matchCount})</p>
                <p>{group.groupDate}</p>
              </li>
            )
          },
          )}
        </ul>}
      </div>
    )
  }
}


LeftTabs.propTypes = {
};

export default LeftTabs;
