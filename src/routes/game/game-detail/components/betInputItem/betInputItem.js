import React, { PureComponent } from 'react';
import { Flex, Button } from 'antd-mobile';
import betInputItemCls from './betInputItem.less';

class BetInputItem extends PureComponent {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  render() {
    const {
      disabled,
      label,
      inputCount,
      baseMultiple,
      buttonElement,
      handleClickButton,
      handleClickInput,
    } = this.props;
    return (
      <Flex className={betInputItemCls.main}>
        <Flex.Item className={betInputItemCls.input}>
          <Flex
            justify="between"
            onTouchTap={handleClickInput}
          >
            <div className={betInputItemCls.text}>{label}</div>
            <div className={betInputItemCls.count}>
              <span
                className={betInputItemCls.input_box}
              >{inputCount}</span>
              <span className={betInputItemCls.defaultCount}>{baseMultiple}</span>
            </div>
          </Flex>
        </Flex.Item>
        <Button
          onTouchTap={!disabled && handleClickButton}
          disabled={disabled}
          className={betInputItemCls.button}
        >
          <Flex className={betInputItemCls.button_span} justify="center" align="center">
            {buttonElement}
          </Flex>
        </Button>
      </Flex>
    );
  }
}

export default BetInputItem;
