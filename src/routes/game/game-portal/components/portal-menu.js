import React from 'react';
import classnames from 'classnames'

import styles from './portal-menu.less'

class PortalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folded: true,
    };
  }
  getShouldHide(index) {
    if (this.props.types.length > 8) {
      if (!this.state.folded) {
        return false
      } else {
        return index > 6
      }
    } else {
      return false
    }
  }
  render() {
    const {
      types,
      activeIndex,
      // actions
      onChangeGameType,
    } = this.props
    return (<div className={styles.wrapper}>
      <ul>
        {types && types.map(
          (type, index) => <li
            key={index}
            wrap="wrap"
            className={classnames({
              [styles.hide]: this.getShouldHide(index),
            })}
          >
            <div
              onClick={() => onChangeGameType(index, type)}
              className={classnames(
                styles.item,
                {
                  [styles.selected]: (activeIndex === index),
                  [styles.hide]: (index > 2),
                  themeBorderColor: activeIndex === index,
                  themeBgColor: activeIndex === index,
                },
              )}
            >
              <span>{`${type.displayName || '分类'} ${type.matchCount}`}</span>
            </div>
          </li>)}
        {(types && types.length > 8)
        && <li onTouchTap={() => this.setState({ folded: !this.state.folded })}>
          <div className={styles.item}>
            <span>{this.state.folded ? '更多' : '收起'}</span>
          </div>
        </li>}
      </ul>
    </div>)
  }
  /* getDisplayTypes(types) {
   const shouldFold = types.length > 8
   const shouldSlice = shouldFold && this.state.folded
   return shouldSlice ? slice(types, 0, 7) : types
   }*/
}

PortalMenu.propTypes = {
};

export default PortalMenu;
