import React, { PureComponent } from 'react';
import { Accordion, Flex } from 'antd-mobile';
import { browserHistory } from '../../../../index';
import gameDetailCls from './detailMain.less';

import ButtonItem from './buttonItem/buttonItem';
import MatchCardHeader from './matchCardHeader/matchCardHeader';
import GameDetailExplain from './modalContent';
import { Title } from '../../../../components/modal-title';
import MaskLayer from './maskLayer';

class DetailMain extends PureComponent {

  handleTouchTapButton = (optionIds, optionId, isSelected, event) => {
    event.preventDefault();
    if (!isSelected) {
      this.props.onSetInputCountDefault();
      this.props.onChangeBetOption(optionIds, optionId);
    } else {
      this.props.onClearBetOption();
    }
  };

  handleClickSetPlaytypeIds = (ids, sportType, e) => {
    e.preventDefault();
    this.props.onSetPlaytypeStickiedIds(ids, sportType);
  };

  handleClickExplain = (title, content, e) => {
    const { t: msg } = this.props;
    e.preventDefault();

    this.props.onShowDescriptionModal({
      content: <GameDetailExplain title={title} {...content} />,
      title: <Title title={msg('playingInstructions')} />,
    });
  };

  handleChangeAccordion = (activeKey) => {
    this.props.onChangeAccordion(activeKey, this.props.playtypesOptionIdSort);
  };

  render() {
    const {
      t: msg,
      playtypes,
      accordionActiveKey,
      params,
      showType,
      matchStateOfficial,
      betBoxHeaderHeight,
    } = this.props;

    const { sportType } = params;
    const {
      visible,
      buttonText,
      targetUrl,
      desc,
      type,
    } = matchStateOfficial;
    return (
      <MaskLayer
        visible={visible}
        buttonText={msg(`matchStateOfficial.${type}.${buttonText}`)}
        buttonCb={() => {
          browserHistory.push(targetUrl)
        }}
        desc={msg(`matchStateOfficial.${type}.${desc}`, { returnObjects: true, showType })}
      >
        <div style={{ paddingBottom: betBoxHeaderHeight }}>
          {
            playtypes && <div className={gameDetailCls.listBox}>
              <Accordion
                activeKey={accordionActiveKey}
                onChange={this.handleChangeAccordion}
                className={gameDetailCls.listBox_item}
              >
                {
                  playtypes.map((item, index) => {
                    return (
                      <Accordion.Panel
                        key={index} className={gameDetailCls.listBox_panel}
                        header={
                          <MatchCardHeader
                            title={item.title}
                            isExplain={item.isExplain}
                            isOperateSelected={item.isOperateSelected}
                            handleTouchTapExplain={
                              this.handleClickExplain.bind(this,
                                item.title,
                                msg(item.explainPointer, { returnObjects: true, showType }),
                              )
                            }
                            handleTouchTapOperate={
                              this.handleClickSetPlaytypeIds.bind(this, item.optionId, sportType)
                            }
                          />
                        }
                      >
                        <div className={gameDetailCls.content}>
                          {
                            item.options && item.options.map((option, key) => {
                              return (
                                <Flex
                                  className={item.isRow && gameDetailCls.row}
                                  key={key}
                                >
                                  {
                                    option && option.map((val) => {
                                      return (
                                        <Flex.Item
                                          key={val.optionId}
                                        >
                                          <ButtonItem
                                            isRow={item.isRow}
                                            title={val.title}
                                            odds={val.odds}
                                            isSelected={val.isSelected}
                                            disabled={val.disabled}
                                            onTouchTap={
                                              this.handleTouchTapButton
                                                .bind(
                                                  this, item.optionId, val.optionId, val.isSelected,
                                                )
                                            }
                                          />
                                        </Flex.Item>
                                      )
                                    })
                                  }
                                </Flex>
                              )
                            })
                          }
                        </div>
                      </Accordion.Panel>
                    )
                  })
                }
              </Accordion>
            </div>
          }
        </div>
      </MaskLayer>
    )
  }
}

export default DetailMain;
