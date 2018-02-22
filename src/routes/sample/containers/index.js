import React from 'react';
import { connect } from 'dva';
import { get } from 'lodash';
import { translate } from 'react-i18next';

import Sample from '../components/sample';
import { makeMultiedCounter } from '../models/selector'

// 通过装饰器传递命名空间，使用t function将命名空间内的key对应翻译文案统一传入msgs
@translate('sample')
@connect(mapStateToProps)
class Container extends React.Component {
  render() {
    const { t } = this.props
    const msgs = {
      counterMsg: t('counter'),
    }
    return <Sample {...this.props} msgs={msgs} />
  }
}

function mapStateToProps(state) {
  return {
    cumulate: get(state, 'sample.cumulate'),
    multiple: get(state, 'sample.multiple'),
    loadingSample: get(state, 'loading.models.sample'),
    multiedCounter: makeMultiedCounter(state),
  };
}

export default Container;
