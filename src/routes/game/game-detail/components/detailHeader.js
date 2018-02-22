import React, { PureComponent, PropTypes } from 'react';
import { Carousel } from 'antd-mobile';
import classnames from 'classnames';
import MatchLive, { BasketBallEvent, BasketBallScoreItem, FootBallEvent, FootBallEventItem } from './matchLive/index';
import MatchState from './matchState';
import gameDetailCls from './gameDetail.less';
import adaptive from '../../../../utils/adaptive';

class Banner extends PureComponent {


  static propTypes = {
    ballType: PropTypes.oneOf(['basketball', 'football']),
  };

  state = {
    bannerKey: 0,
  }

  componentDidMount() {
    adaptive.setRemCallback = () => {
      this.setState({
        bannerKey: this.state.bannerKey + 1,
      })
    };
  }

  componentWillUnmount() {
    adaptive.setRemCallback = null;
  }


  render() {
    const {
      t: msg,
      players,
      matchStatusState,
      basketBallLive,
      footBallLive,
      ballType,
      elapseTimeInfo,
    } = this.props;

    const periodListLen = msg('period.list', { returnObjects: true }).length;
    const period = matchStatusState.period;
    let periodName = msg(`period.list.${matchStatusState.period}`);
    if (period >= periodListLen) {
      periodName = `${msg(`period.list.${periodListLen - 1}`)}${(period - periodListLen) + 2}`;
    }
    const liveElement = `${periodName} ${matchStatusState.elapseTime}'`;

    let matchLiveEle;

    if (ballType === 'basketball') {
      matchLiveEle = (
        <MatchLive>
          <BasketBallEvent teamGuest={msg('teamGuest')} teamHome={msg('teamHome')}>
            {
              basketBallLive.map((item, key) => {
                const basketballLiveLen = msg('basketballLive', { returnObjects: true }).length;
                let sessionName = msg(`basketballLive.${key}`);
                if (key >= basketballLiveLen - 1) {
                  sessionName = `${msg(`basketballLive.${basketballLiveLen - 1}`)}${(key - basketballLiveLen) + 2}`;
                }
                return (<BasketBallScoreItem
                  key={key} sessionName={sessionName} homeScore={item[1]}
                  guestScore={item[0]}
                />)
              })
            }
          </BasketBallEvent>
        </MatchLive>
      );
    } else if (ballType === 'football') {
      matchLiveEle = (
        <MatchLive>
          <FootBallEvent teamGuest={msg('teamGuest')} teamHome={msg('teamHome')}>
            {
              footBallLive && footBallLive.map(item => <FootBallEventItem {...item} />)
            }
          </FootBallEvent>
        </MatchLive>
      );
    }

    const styleCarouseCls = classnames({
      [gameDetailCls.carouselBox]: true,
      [gameDetailCls[ballType]]: true,
    })

    return (
      <div className={styleCarouseCls}>
        <Carousel
          key={this.state.bannerKey}
          autoplay={false}
          selectedIndex={0}
          swipeSpeed={80}
        >
          <div className={gameDetailCls.carouselBox_item}>
            <MatchState>
              {players && <MatchState.Team {...players[0]} />}
              <MatchState.State
                elapseTimeInfo={elapseTimeInfo}
                statusType={matchStatusState.statusType}
                leagueName={matchStatusState.leagueName}
                liveElement={liveElement}
                elapseTime={matchStatusState.elapseTime}
                periodName={periodName}
                time={matchStatusState.time}
                score={matchStatusState.scores}
                state={msg(`matchStatus.${matchStatusState.state}`)}
              />
              {players && <MatchState.Team {...players[1]} />}
            </MatchState>
          </div>
          <div className={gameDetailCls.carouselBox_item}>
            {matchLiveEle}
          </div>
        </Carousel>
      </div>
    );
  }
}

export default Banner;
