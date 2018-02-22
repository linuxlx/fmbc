import registerModel from '../../../utils/register-model';

export default (app, cached) => ({
  // path: 'portal',
  name: 'gamePortal',
  getComponent(nextState, cb) {
    require.ensure([
      './containers/index.js',
      './models/index.js',
    ], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const gamePortal = require('./containers/index');
      // async registed model, can't be persist
      const gamePortalModel = require('./models/index');

      /*  Add the reducer to the store on key 'counter'  */
      registerModel(app, gamePortalModel, cached);

      /*  Return getComponent   */
      cb(null, gamePortal);

      /* Webpack named bundle   */
    }, 'gamePortal');
  },
});
