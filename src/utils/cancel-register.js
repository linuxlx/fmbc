import { get } from 'lodash';
import { app } from '../index';

/**
 * 注销轮询操作
 * @param {*string} pathname 需要注销轮询的页面的pathname
 */
export function intervalDeQueue(pathname) {
  const dispatch = get(app, '_store.dispatch');
  const getState = get(app, '_store.getState');
  const intervalQueue = get(getState(), `common.intervalQueue.${pathname}`);
  if (intervalQueue) {
    for (let i = 0; i < intervalQueue.length; i += 1) {
      const item = intervalQueue[i];
      dispatch({
        type: 'common/cancelHandle',
        handleName: item,
      })
    }
    dispatch({
      type: 'common/intervalDeQueue',
      pathname,
    })
  }
}

export function intervalCancel(handleName) {
  const dispatch = get(app, '_store.dispatch');
  dispatch({
    type: 'common/cancelHandle',
    handleName,
  })
}
