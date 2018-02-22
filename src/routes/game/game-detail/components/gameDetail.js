import React, { PureComponent } from 'react';
import { Flex } from 'antd-mobile';
import classnames from 'classnames';
import { get } from 'lodash';
import gameDetailCls from './gameDetail.less';

import { browserHistory } from '../../../../index';
import BetResult from './betResult/betResult';
import DetailHeader from './detailHeader';
import DetailMain from './detailMain';
import DetailFooter from './detailFooter';
import Spin from '../../../../components/Spin';

class GameDetail extends PureComponent {

  state = {
    count: '',
  };

  handleClickBetModalCloseButton = () => {
    this.props.onBetModalVisible(false);
  };

  handleCloseStep = (value) => {
    this.setState({
      count: value,
    });
  };

  handleCloseComplete = () => {
    browserHistory.go(-1);
  };

  render() {
    const {
      t: msg,
      isLotteryType,
      loading,
      error,
      betResult,
      betVisible,
      params,
      coinName,
      showType,
      onGoBeans,
      themeColor,
      betErrorLoading,
    } = this.props;

    const { sportType, matchId } = params;

    let childrenElement = null;
    // const CouterModalEle = (
    //   <Modal className={gameDetailCls.closeModal} visible maskClosable={false} transparent>
    //     <Counter
    //       value={5}
    //       onStep={this.handleCloseStep}
    //       onComplete={this.handleCloseComplete}
    //     >
    //       {msg('closeModalText', { count: this.state.count })}
    //     </Counter>
    //   </Modal>
    // );
    if (!loading) {
      if (error) {
        childrenElement = (<p>{msg('errorTip')}</p>);
      } else {
        const betResultType = get(betResult, 'resultType');
        const betResultImgUrl = get(betResult, 'resultImgUrl');
        const resultMessageCode = get(betResult, 'resultMessageCode');
        const betloading = get(betResult, 'loading');
        const buttonType = get(betResult, 'buttonType');
        const modalClose = get(betResult, 'modalClose');
        const openBridge = get(betResult, 'openBridge');
        const buttonTarget = get(betResult, 'buttonTarget');
        const isButtonTargetRecharge = get(betResult, 'isButtonTargetRecharge');
        // const betResultProps = betResultType ?
        // { ...msg(`resultModal.${betResultType}`, { returnObjects: true }) } : {};
        const betResultProps = betResultType ? {
          ...msg(`resultModal.${betResultType}`, {
            returnObjects: true,
            showType,
          }),
        } : {};
        if (resultMessageCode) {
          betResultProps.resultMessage = msg(`resultModal.${betResultType}.resultMessageCode.${resultMessageCode}`, {
            coinName,
            showType,
          });
        }
        if (betResultType) {
          betResultProps.resultImgUrl = betResultImgUrl;
          if (betResultType === 'error') {
            betResultProps.footer = [{
              style: themeColor ? { backgroundColor: themeColor } : {},
              text: msg(`resultButtonGainText.${buttonType}`, { returnObjects: true, showType, coinName }),
              onPress: () => {
                if (modalClose) {
                  this.handleClickBetModalCloseButton()
                }
                if (openBridge) {
                  if (isButtonTargetRecharge) {
                    onGoBeans();
                  } else {
                    // window.alert(buttonTarget);
                  }
                } else if (buttonTarget) {
                  browserHistory.push(buttonTarget);
                }
              },
            }];
          }
        }
        const gameDetailMainCls = classnames({
          [gameDetailCls.main]: true,
        })
        childrenElement = (
          <Flex key={`detail-${sportType}-${matchId}`} direction="column" className={gameDetailCls.warp}>
            <Flex.Item className={gameDetailMainCls}>
              {isLotteryType && <DetailHeader {...this.props} />}
              <DetailMain {...this.props} />
            </Flex.Item>
            <DetailFooter {...this.props} />
            <BetResult
              visible={betVisible}
              transparent
              onClose={this.handleClickBetModalCloseButton}
              loading={betloading}
              betErrorLoading={betErrorLoading}
              {...betResultProps}
            />
          </Flex>
        )
      }
    }

    const wrapCls = classnames({
      [gameDetailCls.wrap]: true,
      [gameDetailCls.error]: error,
      [gameDetailCls.loading]: loading,
    });

    return (
      <div className={wrapCls}>
        <Spin spinning={loading}>
          {childrenElement}
        </Spin>
      </div>
    );
  }
}

export default GameDetail;
