/* eslint-disable no-underscore-dangle,no-unused-vars */
import dva from 'dva';
// import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
// import { browserHistory } from 'dva/router';
import { createHistory } from 'history'
import { useRouterHistory } from 'react-router'
// import { whyDidYouUpdate } from 'why-did-you-update'

// 第三方插件
// https://github.com/dvajs/dva/blob/master/docs/API_zh-CN.md 支持effect级别loading状态
import createLoading from 'dva-loading'
import { autoRehydrate, persistStore } from 'redux-persist';
import moment from 'moment'
import * as locales from 'moment/min/locales';
import Perf from 'react-addons-perf'

// relative imports
import './index.less';
import persistConfig from './plugins/get-redux-persist-config'
import modelRegister from './models/model-register'

// high definition
import adaptive from './utils/adaptive';

// userScalable
import userScalable from './utils/userScalable';

injectTapEventPlugin()
console.warn('当前的env环境是:', process.env)

export const browserHistory = useRouterHistory(createHistory)({
  basename: process.env.PUBLIC_PATH || '',
})

// 1. Initialize
export const app = dva({
  history: browserHistory,
  extraEnhancers: [autoRehydrate()],
});
// 2. Plugins
app.use(createLoading()); // dva-loading
moment.locale('zh-cn');   // moment设置中文

// 3. Model
modelRegister(app)

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

// 6. Things to be done after app start
persistStore(app._store, persistConfig, () => {
  console.log('rehydration complete')
}); // 持久化store

// 7.high definition
adaptive.desinWidth = 640;
adaptive.maxWidth = 640;
adaptive.baseFont = 24;
adaptive.init();

// 8.userScalable
userScalable();

// 9. react perf
if (process.env.NODE_ENV === 'development') {
  // whyDidYouUpdate(React)
}

// console.error({ nodeEnv: process.env.NODE_ENV })
