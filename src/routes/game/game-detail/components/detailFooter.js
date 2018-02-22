import React, { PureComponent } from 'react';
import { Toast } from 'antd-mobile';
import BetBox from './betBox/index';
import BetInputItem from './betInputItem/betInputItem';
import NumbericKeyBoard from '../../../../components/NumericKeyboard';
import gameDetailCls from './gameDetail.less';

class Node extends PureComponent {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  componentWillReceiveProps(props) {
    const { onClearBetOption } = props;
    if (this.props.betOptionInfo !== props.betOptionInfo ||
      this.props.betOptionInfo.disabled !== props.betOptionInfo.disabled) {
      if (props.betOptionInfo.disabled) onClearBetOption();
      if (!props.betOptionInfo) onClearBetOption();
    }
  }

  handleClickDelete = () => {
    this.props.onClearBetOption();
  };

  handleClickInput = () => {
    this.props.onShowNumbericKeyBoard();
  };

  handleClickInputButton = (value, isInputAllIn) => {
    const { t: msg, coinName, showType } = this.props;
    if (isInputAllIn) {
      Toast.info(msg('betFullTip', { coinName, showType }));
    }
    this.props.onSetInputCount(value);
  };

  handleClickNumbericKeyBoardSubmit = (value) => {
    this.props.onHideNumbericKeyBoard();
    if (value) this.props.onSetInputCount(value);
  };

  handleClickNumbericKeyBoardChange = (value) => {
    this.props.onSetInputCount(value);
  };

  handleClickBetButton = () => {
    this.props.onBet();
  };

  handleChangeHeight = (height) => {
    this.props.onChangeBetBoxHeaderHeight(height);
  };


  render() {
    const {
      t: msg,
      betOptionInfo,
      players,
      isShowNumbericKeyBoard,
      betArea,
      coinName,
      showType,
    } = this.props;
    return (
      <div className={gameDetailCls.footer}>
        {
          betOptionInfo && (
            <BetBox>
              <div className={gameDetailCls.footer_betContent}>
                <BetBox.Header
                  optionId={betOptionInfo.optionId}
                  playTypeName={betOptionInfo.playtypeName}
                  optionName={betOptionInfo.optionName}
                  odds={betOptionInfo.odds}
                  oddsChangeText={msg('oddsChangeText')}
                  playNames={[players[0].name, players[1].name]}
                  handleClickDelete={this.handleClickDelete}
                  handleChangeHeight={this.handleChangeHeight}
                />
                <BetBox.Footer
                  tipText={msg('betTipText', { coinName, balance: betArea.balance })}
                  buttonText={msg(betArea.buttonTextCode, { showType, coinName })}
                  butttonDesc={msg('betButttonDesc', { forecastSum: betArea.forecastSum })}
                  handleClickButton={this.handleClickBetButton}
                  disabled={betArea.disabled}
                  inputElement={
                    <BetInputItem
                      label={msg('betInputLabel', { coinName, showType })}
                      inputCount={betArea.inputCount}
                      baseMultiple={betArea.baseMultiple}
                      disabled={betArea.isInputCountMax}
                      buttonElement={
                        msg(betArea.inputButtonType, { betLimit: betArea.betLimit, coinName })
                      }
                      handleClickInput={!betArea.isShowNumbericKeyBoard && this.handleClickInput}
                      handleClickButton={
                        this.handleClickInputButton
                          .bind(this, betArea.inputCountMax, betArea.isInputAllIn)
                      }
                    />
                  }
                />
              </div>
              {isShowNumbericKeyBoard && (
                <NumbericKeyBoard
                  sub={msg('numbericKeyBoardSub')}
                  del="删除"
                  character={betArea.inputCount}
                  onSubmit={this.handleClickNumbericKeyBoardSubmit}
                  onChange={this.handleClickNumbericKeyBoardChange}
                />
              )}
            </BetBox>
          )
        }
      </div>
    );
  }
}

export default Node;
