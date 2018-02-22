import React, { PureComponent, PropTypes } from 'react';
import { Helmet } from 'react-helmet';
import { translate } from 'react-i18next';
import { Modal, ActivityIndicator } from 'antd-mobile';

import styles from './MainLayout.less';

@translate()
class MainLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.element.isRequired,
    modal: PropTypes.shape({
      visible: PropTypes.bool,
      transparent: PropTypes.bool,
      maskClosable: PropTypes.bool,
      closable: PropTypes.bool,
      style: PropTypes.object,
      platform: PropTypes.string,
      onClose: PropTypes.func,
      title: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
      ]),
    }),
    closeModal: PropTypes.func,
    t: PropTypes.func,
  }

  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {};
  }


  render() {
    const {
      children,
      modal,
      // actions
      closeModal,
      loading,
      t,
    } = this.props;
    return (
      <div className={styles.normal}>
        <Helmet
          titleTemplate={`%s | ${t('mainLayout.titlePrefix')}`}
          title={t('mainLayout.title')}
        />
        <Modal
          {...modal}
          maskClosable={false}
          onClose={closeModal}
        >
          {modal.content}
        </Modal>
        {
          loading ? <div className={styles.loading}><ActivityIndicator size="large" /></div> : children
        }
      </div>
    );
  }
}


export default MainLayout;
