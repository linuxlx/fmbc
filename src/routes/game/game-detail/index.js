// import Perf from 'react-addons-perf';
import registerModel from '../../../utils/register-model';
// window.Perf = Perf;

export default (app, cached) => ({
  name: 'gameDetail',
  path: 'detail/:sportType/:matchId',
  getComponent(nextState, cb) {
    require.ensure([
      './containers/index.js',
      './models/index.js',
    ], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const gameDetail = require('./containers/index');
      // async registed model, can't be persist
      const gameDetailModel = require('./models/index');

      /*  Add the reducer to the store on key 'counter'  */
      registerModel(app, gameDetailModel, cached);

      /*  Return getComponent   */
      cb(null, gameDetail);

      /* Webpack named bundle   */
    }, 'gameDetail');
  },
});
