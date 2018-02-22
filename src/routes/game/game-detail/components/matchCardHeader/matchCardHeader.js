import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import { Flex, Icon } from 'antd-mobile';
import MatchCardHeaderCls from './matchCardHeader.less';

class MatchCardHeader extends PureComponent {
  static propTypes = {
    title: PropTypes.node,
    isExplain: PropTypes.bool,
    handleTouchTapOperate: PropTypes.func,
    handleTouchTapExplain: PropTypes.func,
  }

  static defaultProps = {
    isExplain: false,
    handleTouchTapOperate: () => {
    },
  }

  render() {
    const {
      title,
      isExplain,
      handleTouchTapOperate,
      handleTouchTapExplain,
      isOperateSelected,
    } = this.props;
    const operateCls = classnames({
      [MatchCardHeaderCls.operate]: true,
      [MatchCardHeaderCls.operateSelected]: isOperateSelected,
    });
    return (
      <Flex justify="between">
        <Flex.Item className={MatchCardHeaderCls.title}>{title}{isExplain &&
        <Icon
          className={MatchCardHeaderCls.iconQuestion} color="#999" type={require('../../../../../assets/svg/question.svg')}
          onTouchTap={handleTouchTapExplain}
        />}</Flex.Item>
        <div className={operateCls} onTouchTap={handleTouchTapOperate}>
          <Icon
            className={MatchCardHeaderCls.iconUp}
            type={require('../../../../../assets/svg/stick.svg')}
          />
        </div>
      </Flex>
    );
  }
}

export default MatchCardHeader;
