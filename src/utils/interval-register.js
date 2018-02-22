import { get } from 'lodash';
import { app } from '../index'

const { dispatch, getState } = app._store
/**
 * 注册页面轮询helper
 * 运行轮询并将取消轮询的handle放入store:common/intervalHandle备用
 * @param pathname: react router的pathname
 * @param intervalName: String 注册在store的轮询名
 * @param actionType: String 回调中保存数据用的action名
 * @param listenFn： Func 轮询的service Func
 * @param args: Array 轮询service所需的所有参数
 */

export async function intervalRegister(pathname, intervalName, actionType, listenFn, args) {
  await listenFn(intervalName, ...args, (result) => {
    const { data } = result;
    const resData = Object.prototype.hasOwnProperty.call(data, 'data') ? data.data : data;
    const action = {
      type: actionType,
      payload: {},
      interceptKeys: args,
    };
    action.payload[intervalName] = resData;
    dispatch(action)
  })
  let intervalQueue = get(getState(), `common.intervalQueue.${pathname}`);
  if (!intervalQueue) {
    intervalQueue = [];
  }
  if (intervalQueue.indexOf(intervalName) === -1) {
    intervalQueue.push(intervalName);
    dispatch({
      type: 'common/intervalEnQueue',
      payload: {
        queue: intervalQueue,
        pathname,
      },
    })
  }

  // dispatch({
  //   type: 'common/saveIntervalHandle',
  //   payload: {
  //     handleName: intervalName,
  //     handle: cancelHandel,
  //   },
  // })
}
