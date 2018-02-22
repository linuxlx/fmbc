import React, { PureComponent } from 'react';
import { Flex, Button } from 'antd-mobile';
import betBoxCls from './betBox.less';
import Header from './header';

const Footer = (props) => {
  const {
    inputElement,
    tipText,
    disabled,
    buttonText,
    butttonDesc,
    handleClickButton,
  } = props;
  return (
    <Flex align="top" className={betBoxCls.footer}>
      <Flex.Item className={betBoxCls.footer_odds}>
        {inputElement}
        <div className={betBoxCls.footer_tipText}>{tipText}</div>
      </Flex.Item>
      <div className={betBoxCls.footer_show}>
        <Button onTouchTap={!disabled && handleClickButton} disabled={disabled}>
          <Flex className={betBoxCls.footer_content} direction="column" align="center" justify="center">
            <span className={betBoxCls.footer_content_text}>{buttonText}</span>
            {!disabled && (
              <span className={betBoxCls.footer_content_desc}>{butttonDesc}</span>
            )}
          </Flex>
        </Button>
      </div>
    </Flex>
  )
};

class Node extends PureComponent {
  static Header = Header;
  static Footer = Footer;

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Node;
