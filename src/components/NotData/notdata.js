import React, { Component } from 'react';
import { Flex } from 'antd-mobile';
import styles from './notdata.less';

class NotData extends Component {
  static defaultProps = {
    titleEle: (<div className={styles.text}>暂无数据</div>),
    descEle: (<div className={styles.desc}>请稍后再试</div>),
  }

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }

  render() {
    const {
      img,
      titleEle,
      descEle,
    } = this.props;
    return (
      <Flex
        direction="column"
        className={styles.wrap}
        justify="center"
        align="center"
      >
        {img && <img className={styles.img} src={img} alt="" />}
        {titleEle}
        {descEle}
      </Flex>
    );
  }
}

export default NotData;
