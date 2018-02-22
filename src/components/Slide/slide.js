import React, { Component } from 'react';

class Node extends Component {

  state = {
    left: 0,
    slideWidth: 0,
    listWidth: 0,
    singleWidth: 0,
    singleHeight: 0,
  };

  componentDidMount() {
    this.setDimensions(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setDimensions(nextProps);
  }

  componentDidUpdate() {
    const frameWidth = this.frame.offsetWidth;
    const { listWidth } = this.state;
    this.props.visibleSlideButton(frameWidth < listWidth);
  }

  setDimensions = (props) => {
    const singleEle = this.list.childNodes[0].childNodes[0];
    const singleWidth = singleEle ? singleEle.offsetWidth : 0;
    const singleHeight = singleEle ? singleEle.offsetHeight : 0;
    const slideWidth = props.slideWidth || singleWidth;
    this.setState({
      slideWidth,
      listWidth: singleWidth * React.Children.count(this.props.children),
      singleWidth,
      singleHeight,
    });
  };

  getSliderStyles = () => {
    return {
      position: 'relative',
      display: 'block',
      width: '100%',
      height: 'auto',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      visibility: this.state.slideWidth ? 'visible' : 'hidden',
    }
  }

  getListStyles = () => {
    const transform = `translate3d(${
      this.state.left}px, ${
      0}px, 0)`;
    return {
      transform,
      WebkitTransform: transform,
      msTransform: `translate(${
        this.state.left}px, ${
        0}px)`,
      position: 'relative',
      display: 'block',
      margin: 0,
      padding: 0,
      width: this.state.listWidth,
      height: this.state.singleHeight,
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
      transition: 'all .2s',
    }
  }

  getFrameStyles = () => {
    return {
      position: 'relative',
      display: 'block',
      overflow: 'hidden',
      width: '100%',
      height: 'auto',
      margin: 0,
      padding: 0,
      transform: 'translate3d(0, 0, 0)',
      WebkitTransform: 'translate3d(0, 0, 0)',
      msTransform: 'translate(0, 0)',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
    }
  }

  getSlideStyles = (index) => {
    const targetPosition = this.getSlideTargetPosition(index);
    return {
      position: 'absolute',
      left: targetPosition,
      top: 0,
      display: 'inline-block',
      listStyleType: 'none',
      verticalAlign: 'top',
      width: this.state.singleWidth,
      height: 'auto',
      boxSizing: 'border-box',
      MozBoxSizing: 'border-box',
    }
  };

  getSlideTargetPosition = index => (this.state.singleWidth) * index;

  nextSlide = () => {
    const frameWidth = this.frame.offsetWidth;
    const { listWidth, left, slideWidth } = this.state;
    let currentLeft = left - slideWidth;
    const lerpWidth = frameWidth > listWidth ? frameWidth : (frameWidth - listWidth);
    if (lerpWidth > currentLeft) {
      currentLeft = lerpWidth;
    }

    this.setState({
      left: currentLeft,
    })
  };

  previousSlide = () => {
    const { left, slideWidth } = this.state;
    this.setState({
      left: (left + slideWidth) > 0 ? 0 : (left + slideWidth),
    });
  };

  formatChildren = (children) => {
    return React.Children.map(children, (child, index) => {
      return <li className="slider-slide" style={this.getSlideStyles(index)} key={index}>{child}</li>
    });
  };

  render() {
    const { children } = this.props;
    return (
      <div className="slider" style={this.getSliderStyles()}>
        <div
          className="slider-frame"
          ref={(ref) => {
            this.frame = ref;
          }}
          style={this.getFrameStyles()}
        >
          <ul
            className="slider-list"
            ref={(ref) => {
              this.list = ref;
            }}
            style={this.getListStyles()}
          >
            {this.formatChildren(children)}
          </ul>
        </div>
      </div>
    )
  }
}

export default Node;
