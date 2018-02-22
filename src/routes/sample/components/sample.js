import React from 'react';
import { Helmet } from 'react-helmet';
import { Grid, Icon } from 'antd-mobile';
import styles from './sample.less';

const icons = [
  'check-circle', 'check', 'check-circle-o',
  'cross-circle', 'cross', 'cross-circle-o',
  'up', 'down', 'left',
  'right', 'ellipsis',
  'koubei-o', 'koubei', 'loading',
];
/* eslint global-require: 0 */

const Demo = ({
  cumulate,
  multiple,
  multiedCounter,
  msgs,
}) => {
  const data = icons.map(item => ({
    icon: (<Icon type={item} />),
    text: item,
  }));
  const { counterMsg } = msgs
  return (
    <div className={styles.normal}>
      <Helmet title="覆盖标题" />
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497962653472&di=48be3327f7eac0c22f16ca15b09b146d&imgtype=0&src=http%3A%2F%2Fi1.hdslb.com%2Fbfs%2Farchive%2F48576de8272805834054587529b192299af80e1c.jpg" alt="" className={styles.img} />
      <p>{`${counterMsg}: ${cumulate} x ${multiple} = ${multiedCounter}`}</p>
      <Grid data={data} columnNum={3} hasLine={false} />
    </div>
  );
};

export default Demo;

/*
import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);*/
