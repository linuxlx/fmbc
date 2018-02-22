import React, { PureComponent, PropTypes } from 'react';
import classnames from 'classnames';
import { Button } from 'antd-mobile';
import styles from './index.less';

const componentName = 'numericKeyboard';

const keyboardMap = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['sub', 0, 'del'],
];

class NumericKeyboard extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    /**
     * 根元素的css类名称前缀.
     */
    preFixCls: PropTypes.string,
    /**
     * 输入值.
     */
    character: PropTypes.string,
    /**
     * 改变时触发.
     */
    onChange: PropTypes.func,
    /**
     * 触发确定时的回调函数.
     */
    onSubmit: PropTypes.func,
    /**
     * 删除按钮.
     */
    del: PropTypes.node,
    /**
     * 确认按钮.
     */
    sub: PropTypes.node,
  };

  static defaultProps = {
    preFixCls: 'lottery',
    character: '',
    del: '删除',
    sub: '确认',
  };

  state = {
    isEmpty: false,
  };

  handleClick = (ev, value) => {
    const { onChange, onSubmit, character } = this.props;
    const { isEmpty } = this.state;
    let currentCharacter = character;
    switch (value) {
      case 'del':
        currentCharacter = currentCharacter.substring(0, currentCharacter.length - 1);
        break;
      case 'sub':
        if (onSubmit) {
          onSubmit(currentCharacter);
        }
        return;
      default:
        if (isEmpty) {
          currentCharacter = value.toString();
        } else {
          currentCharacter += value;
        }
        break;
    }

    if (!currentCharacter || currentCharacter === 0) {
      currentCharacter = '';
      this.setState({
        isEmpty: true,
      });
    } else {
      this.setState({
        isEmpty: false,
      });
    }
    if (onChange) {
      onChange(currentCharacter)
    }
  };

  render() {
    const {
      children,
      preFixCls,
      del,
      sub,
    } = this.props;

    const sPreFixCls = `${preFixCls}-${componentName}`;

    const klassnames = classnames({
      [styles[`${sPreFixCls}`]]: true,
    });

    return (
      <div className={klassnames}>
        {keyboardMap.map((list, index) => {
          return (
            <ul key={index}>
              {list.map((value) => {
                const liCls = classnames({
                  [styles[value]]: value === 'del' || value === 'sub',
                });
                let element = value;
                if (value === 'del') {
                  element = del;
                } else if (value === 'sub') {
                  element = sub;
                }
                return (
                  <li key={value} className={liCls}>
                    <Button
                      onTouchTap={(event) => {
                        this.handleClick(event, value)
                      }}
                    >
                      <span className={styles.btn}>{element}</span>
                    </Button>
                  </li>)
              })}
            </ul>
          )
        })}
        {children}
      </div>
    )
  }
}

export default NumericKeyboard;
