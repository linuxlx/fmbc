import React, { PureComponent, PropTypes } from 'react';
import { Flex, Button, Icon } from 'antd-mobile';
import styles from './footBallEvent.less';
import Slide from '../../../../../components/Slide';

class FootBallEvent extends PureComponent {
  static propTypes = {
    teamHome: PropTypes.string,
    teamGuest: PropTypes.string,
    children: PropTypes.node,
  };

  state = {
    visibleSliderButton: false,
  }


  handleClickNext = () => {
    this.carousel.nextSlide();
  }

  handleClickPrev = () => {
    this.carousel.previousSlide();
  }

  visibleSlideButton = (value) => {
    this.setState({
      visibleSliderButton: value,
    })
  }

  render() {
    const {
      teamHome,
      teamGuest,
      children,
    } = this.props;
    return (
      <div className={styles.wrap}>
        <Flex className={styles.main} align="center">
          <Flex className={styles.body}>
            <div className={styles.cardLeft}>
              <div className={styles.item}>
                <span className={styles.teamHome}>{teamHome}</span>
              </div>
              <div className={styles.line} />
              <div className={styles.item}>
                <span className={styles.teamGuest}>{teamGuest}</span>
              </div>
            </div>
            <div className={styles.cardRight}>
              <Slide
                visibleSlideButton={this.visibleSlideButton}
                ref={(ref) => { this.carousel = ref }}
                slideWidth={70}
              >
                {children}
              </Slide>
            </div>
          </Flex>
        </Flex>
        {this.state.visibleSliderButton && (
          <div className={styles.action}>
            <Button onClick={this.handleClickPrev}><Icon type="left" /></Button>
            <Button onClick={this.handleClickNext}><Icon type="right" /></Button>
          </div>
        )}
      </div>
    );
  }
}

export default FootBallEvent;
