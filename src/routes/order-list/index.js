import registerModel from '../../utils/register-model';

export default (app, cached) => ({
  name: 'orderList',
  path: 'orderlist',
  getComponent(nextState, cb) {
    require.ensure([
      './containers/index.js',
      './models/index.js',
    ], (require) => {
      /*  Webpack - use require callback to define
       dependencies for bundling   */
      const OrderList = require('./containers');
      // async registed model, can't be persist
      const OrderListModel = require('./models');
      /*  Add the reducer to the store on key 'counter'  */
      registerModel(app, OrderListModel, cached);

      /*  Return getComponent   */
      cb(null, OrderList);

      /* Webpack named bundle   */
    }, 'orderlist');
  },
});
