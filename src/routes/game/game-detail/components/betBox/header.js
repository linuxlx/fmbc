import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { Icon } from 'antd-mobile';
import betBoxCls from './betBox.less';

class Header extends PureComponent {

  state = {
    isOddsChange: false,
    isDelete: false,
    mainAnimate: false,
  };

  componentDidMount() {
    this.props.handleChangeHeight(this.wrap.clientHeight);
  }

  componentWillReceiveProps(nextProps) {
    const prevProps = this.props;
    if (nextProps.optionId === prevProps.optionId && nextProps.odds !== prevProps.odds) {
      this.setState({
        isOddsChange: true,
        isDelete: true,
      });
    } else if (prevProps.optionId && (nextProps.optionId !== prevProps.optionId)) {
      this.setState({
        isOddsChange: false,
        isDelete: false,
        mainAnimate: true,
      });
    }
  }

  componentDidUpdate() {
    if (this.state.mainAnimate) {
      setTimeout(() => {
        this.setState({
          mainAnimate: false,
        });
      }, 200)
    }
    this.props.handleChangeHeight(this.wrap.clientHeight);
  }

  componentWillUnmount() {
    this.props.handleChangeHeight(0);
  }

  handleClick = () => {
    this.setState({
      isDelete: true,
    });
  };

  render() {
    const {
      playTypeName,
      optionName,
      odds,
      playNames,
      oddsChangeText,
      handleClickDelete,
    } = this.props;

    const {
      isOddsChange,
      isDelete,
    } = this.state;

    const oddsChangeCls = classnames({
      [betBoxCls.oddsChange]: isOddsChange,
    });

    const betBoxMainCls = classnames({
      [betBoxCls.main]: true,
      [betBoxCls.mainAnimate]: this.state.mainAnimate,
    });
    return (
      <div
        ref={(ref) => { this.wrap = ref }}
        className={betBoxMainCls}
        onTouchTap={this.handleClick}
      >
        <div className={betBoxCls.optionName}>
          <div className={oddsChangeCls}>
            {optionName}
            <span className={betBoxCls.odds}>{odds}</span>
            <span className={betBoxCls.oddsChangeText}>{oddsChangeText}</span>
          </div>
        </div>
        <div>{`${playNames[0]} vs ${playNames[1]}`}</div>
        <div>{playTypeName}</div>
        {isDelete && (
          <div>
            <Icon
              onTouchTap={handleClickDelete}
              className={betBoxCls.delete}
              type={require('../../../../../assets/svg/delete.svg')}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Header;
