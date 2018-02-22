import React, { Component, PropTypes } from 'react';

class Counter extends Component {
  // 定义属性
  static propTypes = {
    onStep: PropTypes.func,
    onComplete: PropTypes.func,
    value: PropTypes.number,
    step: PropTypes.number,
  }


  // 这里面的操作可以移动到componentWillMount()里面去
  constructor(...pa) {
    super(...pa);
    this.initValue = this.props.value || 10;
    this.state = { count: this.initValue }
    this.interval = 0;
    this.step = this.props.step || 1;
  }

  componentDidMount() {
    this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  stop() {
    clearInterval(this.interval);
  }

  start() {
    this.stop();
    if (this.props.onStep) {
      this.props.onStep(this.state.count);
    }
    this.interval = setInterval(() => {
      const count = this.state.count - this.step;
      if (this.props.onStep) {
        this.props.onStep(count);
      }
      if (count === 0) {
        if (this.props.onComplete) this.props.onComplete();
        this.stop();
      } else {
        this.setState({ count });
      }
    }, 1000);
  }

  restart() {
    this.stop();
    this.setState({ count: this.initValue });
    this.start();
  }

  render() {
    return (<span>{this.props.children}</span>)
  }
}

export default Counter;
