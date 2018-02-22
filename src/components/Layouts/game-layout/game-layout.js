import React, { PropTypes } from 'react';
import TitleBar from '../../title-bar'

import styles from './game-layout.less';

function GameLayout({
  children,
  location,
}) {
  return (<div className={styles.normal}>
    <TitleBar location={location} />
    <div className={styles.content}>
      {children}
    </div>
  </div>)
}

GameLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default GameLayout;
