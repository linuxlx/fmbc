import React, { Component, PropTypes } from 'react';

class Node extends Component {
  static propTypes = {
    maxMinute: PropTypes.number,
    minMinute: PropTypes.number,
    minute: PropTypes.number,
    period: PropTypes.string,
    timerSuffix: PropTypes.string,
    paused: PropTypes.bool,
    operator: PropTypes.oneOf(['plus', 'minus']),
  };
  static defaultProps = {
    maxMinute: 45,
    minMinute: 0,
    minute: 10000,
    period: '半场',
    timerSuffix: "'",
    paused: false,
    operator: '+',
  };

  // 构造
  constructor(props) {
    super(props);
    // 初始状态 this.props.minute
    const nowminute = this.processTimer(this.props.minute);
    this.state = {
      minute: nowminute,
    };
  }

  componentDidMount() {
    this.timeDifference(this.props);
  }


  componentWillReceiveProps(props) {
    if (this.props.minute !== props.minute) {
      this.setState({
        minute: props.minute,
      });
      if (this.timer) window.clearInterval(this.timer);
      this.timeDifference(props);
    }
  }

  componentWillUnmount() {
    if (this.timer) window.clearInterval(this.timer);
  }

  processTimer = (minute) => {
    const {
      maxMinute,
    } = this.props;
    return minute > maxMinute && minute > 0 ? `${maxMinute}+` : minute
  };
  timeDifference = (props) => {
    const {
      paused,
      maxMinute,
      minMinute,
      operator,
    } = props;
    if (!paused) {
      this.timer = setInterval(() => {
        let nowMinute;
        if (operator === 'plus') {
          if ((this.state.minute / 1) + (1) >= maxMinute) {
            if (this.timer) window.clearInterval(this.timer);
            nowMinute = `${maxMinute}+`;
          } else {
            nowMinute = (this.state.minute / 1) + (1)
          }
        } else if (operator === 'minus') {
          if ((this.state.minute / 1) - (1) <= minMinute) {
            if (this.timer) window.clearInterval(this.timer);
            nowMinute = 0;
          } else {
            nowMinute = (this.state.minute / 1) - (1);
          }
        }
        this.setState({
          minute: nowMinute,
        })
      }, 60 * 1000)
    }
  }

  render() {
    const { timerSuffix, period } = this.props;
    return (
      <div>{`${period} ${this.state.minute}${timerSuffix}`}</div>
    );
  }
}

export default Node;
