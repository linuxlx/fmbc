import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import MatchTimer from '../matchTimer';
import styles from './matchState.less';

const Team = (props) => {
  const { logo, name } = props;
  return (
    <div className={styles.team}>
      <div className={styles.team_logo}>
        <img src={logo} alt="" />
      </div>
      <div className={styles.team_name}>
        {name}
      </div>
    </div>
  )
};

const State = (props) => {
  const {
    time,
    score,
    state,
    leagueName,
    statusType,
    periodName,
    elapseTimeInfo,
  } = props;
  const statusCls = classnames({
    [styles.status]: true,
    [styles[statusType]]: true,
  })
  return (
    <div className={statusCls}>
      <div className={styles.leagueName}>{leagueName}</div>
      <div className={styles.liveEle}>
        <MatchTimer
          {...elapseTimeInfo}
          period={periodName}
        />
      </div>
      <div className={styles.time}>{time}</div>
      <div className={styles.score}>{score}</div>
      <div className={styles.state}>{state}</div>
    </div>
  )
};

State.propTypes = {
  time: PropTypes.string,
  score: PropTypes.string,
  state: PropTypes.string,
  leagueName: PropTypes.string,
  statusType: PropTypes.oneOf(['default', 'scroll', 'live']),
}
State.defaultProps = {
  statusType: 'default',
}


class MatchState extends PureComponent {
  static Team = Team;
  static State = State;

  render() {
    return (
      <div className={styles.warp}>
        {this.props.children}
      </div>
    );
  }
}

export default MatchState;
