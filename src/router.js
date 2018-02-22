import React from 'react';
import { Router } from 'dva/router';
import { get } from 'lodash';
import { pathToRegexpGlobal } from './utils/commonFunctions';

// import { findPathNameInRoutes } from './utils/commonFunctions';

import MainLayout from './components/Layouts/main-layout';

import { intervalDeQueue } from './utils/cancel-register';

const App = require('./index').app;


const cached = {};

function RouterConfig({ history, app }) {
  const routes = [
    {
      path: '/',
      name: 'IndexPage',
      component: MainLayout,
      indexRoute: { onEnter: (nextState, replace) => replace('/game') },
      // indexRoute: require('./routes/game-portal/index.js')(app, cached),
      getChildRoutes(location, cb) {
        require.ensure([], (require) => {
          cb(null, [
            require('./routes/game/index.js')(app, cached),
          ])
        })
      },
      onChange(state) {
        const getState = get(App, '_store.getState');
        // const nowRoute = findPathNameInRoutes(state.routes, state.location.pathname);
        const intervalQueue = get(getState(), 'common.intervalQueue');
        for (const key in intervalQueue) {
          if (pathToRegexpGlobal(`${state.location.basename}${key}`).test(`${state.location.basename}${state.location.pathname}`)) {
            intervalDeQueue(state.location.basename + state.location.pathname);
          }
        }
        // let namespace = '';
        // if (nowRoute.name) {
        //   namespace = nowRoute.name
        // } else if (nowRoute.indexRoute) {
        //   namespace = nowRoute.indexRoute.name
        // }
        // intervalDeQueue(namespace);
      },
    },
    /* sync routes
     {
     path: '/login',
     name: 'LoginPage',
     component: TitledLayout,
     indexRoute: { component: LoginPage },
     childRoutes: [
     UsersRoute(app, cached),
     ],
     },
     */
  ]

  return <Router history={history} routes={routes} />;
}

export default RouterConfig;
