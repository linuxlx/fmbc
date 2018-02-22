/* eslint-disable no-unused-vars */
// 非异步加载的models
// import gamePortalModel from '../routes/game-portal/models'
import persistModel from './persist'
import commonModel from './common'
import mping from './mping';
import orderList from '../routes/order-list/models/index';

export default function (app) {
  app.model(persistModel)
  app.model(commonModel)
  app.model(orderList)
  app.model(mping)
}
