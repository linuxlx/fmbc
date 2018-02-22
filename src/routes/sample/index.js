/* eslint-disable no-unused-vars */
// import registerModel from '../../utils/register-model';

export default (app, cached) => ({
  path: 'sample',
  getComponent(nextState, cb) {
    require.ensure([
      './containers/index.js',
      './models/index.js',
    ], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const Sample = require('./containers');
      // async registed model, can't be persist
      // const SampleModel = require('./models');

      /*  Add the reducer to the store on key 'counter'  */
      // registerModel(app, SampleModel, cached);  // registed globally

      /*  Return getComponent   */
      cb(null, Sample);

      /* Webpack named bundle   */
    }, 'sample');
  },
});
