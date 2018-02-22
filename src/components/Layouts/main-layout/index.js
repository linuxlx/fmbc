import React from 'react';
import { connect } from 'dva';
import { I18nextProvider } from 'react-i18next';
import { get } from 'lodash';
import { closeModal, getAppConf, getCorpSourceConf } from '../../../models/actions/common'

import i18n from '../../../utils/i18n'; // initialized i18next instance
import MainLayout from './MainLayout';
import {
  makeSelectServerError,
  selectIntoApp,
  selectAppConfLoading,
} from '../../../models/selector'

class Container extends React.Component {
  componentWillMount() {
    this.props.getAppConf();
    this.props.getCorpSourceConf(process.env.CORP_SOURCE);
  }

  render() {
    const { cantIntoApp } = this.props;
    return !cantIntoApp && (
      <I18nextProvider i18n={i18n}>
        <MainLayout {...this.props} />
      </I18nextProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: selectAppConfLoading(state),
    cantIntoApp: selectIntoApp(state),
    modal: get(state, 'common.modal'),
    serverError: makeSelectServerError(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeModal: () => {
      dispatch(closeModal())
    },
    getAppConf: () => {
      dispatch(getAppConf())
    },
    getCorpSourceConf: (corpSource) => {
      dispatch(getCorpSourceConf(corpSource))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
