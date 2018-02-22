import React from 'react';
import classnames from 'classnames/bind'
import { get } from 'lodash'
import { Icon } from 'antd-mobile'
import { browserHistory } from '../../../../index';

import styles from './game-list.less'

const cx = classnames.bind(styles);

const GameList = ({
                    t,
                    loadingGameList,
                    formatedGames,
                    sportType,
                    matchUserCount,
                    loadingMatchUserCount,
                    // fns
                  }) => {
  return (
    <div className={styles.wrapper}>
      {loadingGameList ? <Icon type="loading" className={styles.loading} /> : <ul>
        {formatedGames.map((game, index) => {
          const {
            matchId,
            isBeginning,
            headerDescTransKey,
            labelText,
            players,
          } = game;
          return (<li
            key={index}
            onTouchTap={() => browserHistory.push(`/game/detail/${sportType}/${matchId}`)}
          >
            <p className={styles.header}>
              <span className={styles.leaguName}>
                {labelText}
              </span>
              {headerDescTransKey &&
              <span
                className={cx('status', {
                  rolling: headerDescTransKey === 'goSiteRolling',
                  pending: headerDescTransKey === 'goSitePending',
                })}
              >
                {t([`gameList.${headerDescTransKey}`])}
              </span>}
            </p>
            <div className={styles.content}>
              <div className={styles.teams}>
                <div className={styles.team}>
                  <img src={get(players, '0.picUrl')} alt="" />
                  <span>{get(players, '0.shortName')}</span>
                  {isBeginning && <span className={styles.sum}>{get(players, '0.scoreSum')}</span>}
                </div>
                <div className={styles.team}>
                  <img src={get(players, '1.picUrl')} alt="" />
                  <span>{get(players, '1.shortName')}</span>
                  {isBeginning && <span className={styles.sum}>{get(players, '1.scoreSum')}</span>}
                </div>
              </div>
              {!loadingMatchUserCount && <div className={styles.participants}>
                <span>{`${get(matchUserCount, matchId) || '0 '}人竞猜 >`}</span>
              </div>}
            </div>
          </li>)
        })}
      </ul>}

    </div>
  );
};

GameList.propTypes = {};

export default GameList;
