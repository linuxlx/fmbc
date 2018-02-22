import React, { PureComponent, PropTypes } from 'react';
import { Result, Modal, Toast } from 'antd-mobile';
import classnames from 'classnames';
import BetResultCls from './betResult.less';


class BetResult extends PureComponent {

  static propTypes = {
    resultImgUrl: PropTypes.string,
    resultTitle: PropTypes.node,
    resultMessage: PropTypes.node,
  };

  componentWillReceiveProps(props) {
    const currentLoading = this.props.loading;
    const loading = props.loading;

    if (!currentLoading && loading) {
      Toast.loading('', 0);
    } else if (currentLoading && !loading) {
      if (!props.betErrorLoading) {
        Toast.hide();
      }
    }
  }

  render() {
    const {
      resultImgUrl,
      resultTitle,
      resultMessage,
      loading,
      ...other
    } = this.props;

    const modalProps = {
      closable: !loading,
      maskClosable: !!loading,
      ...other,
    };

    const betResultCls = classnames({
      gameDetail_betResult: true,
    });

    return !loading && (
      <Modal platform="ios" className={betResultCls} {...modalProps}>
        <Result
          img={<div className={BetResultCls.img}><img alt="resultImg" src={resultImgUrl} /></div>}
          title={resultTitle}
          message={resultMessage}
        />
      </Modal>
    );
  }
}

export default BetResult;
