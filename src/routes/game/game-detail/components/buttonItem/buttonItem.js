import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import { Button, Icon, Flex } from 'antd-mobile';
import ButtonItemCls from './buttonItem.less';
import Flicker from '../../../../../components/Flicker';
import Counter from '../../../../../components/Counter';

class ButtonItem extends PureComponent {

  static propTypes = {
    title: PropTypes.node,
    odds: PropTypes.node,
    isSelected: PropTypes.bool,
  };

  static defaultProps = {
    isSelected: false,
    disabled: false,
  };

  state = {
    tendency: '',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.odds > this.props.odds) {
      this.setState({
        tendency: 'up',
      })
    } else if (nextProps.odds < this.props.odds) {
      this.setState({
        tendency: 'down',
      });
    }
  }

  handleComplete = () => {
    this.setState({
      tendency: '',
    })
  };

  render() {
    const {
      title,
      isRow,
      odds,
      isSelected,
      disabled,
      onTouchTap,
      ...other
    } = this.props;
    const {
      tendency,
    } = this.state;

    const buttonCls = classnames({
      [ButtonItemCls.button]: true,
      [ButtonItemCls.selected]: isSelected,
      [ButtonItemCls.disabled]: disabled,
    });

    const ButtonWrap = classnames({
      [ButtonItemCls.wrap]: true,
      [ButtonItemCls.row]: isRow,
    })

    return (
      <div className={ButtonWrap}>
        <Button
          className={buttonCls}
          disabled={disabled}
          onTouchTap={!disabled && onTouchTap}
          {...other}
        >
          <Flex justify="center">
            <div className={ButtonItemCls.main}>
              <div className={ButtonItemCls.title}>{title}</div>
              <div className={ButtonItemCls.describe}>
                <div className={ButtonItemCls.odds}>{odds}
                  {
                    tendency && (
                      <Counter value={3} onComplete={this.handleComplete}>
                        <span className={`${ButtonItemCls.tendency}`}>
                          <Flicker>
                            {
                              tendency === 'up' ?
                                <Icon
                                  className={ButtonItemCls[tendency]}
                                  type={require('../../../../../assets/svg/up.svg')}
                                /> :
                                <Icon
                                  className={ButtonItemCls[tendency]}
                                  type={require('../../../../../assets/svg/up.svg')}
                                />
                            }
                          </Flicker>
                        </span>
                      </Counter>
                    )
                  }
                </div>
              </div>
            </div>
          </Flex>
        </Button>
      </div>
    );
  }
}

export default ButtonItem;
