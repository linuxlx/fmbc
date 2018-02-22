import React from 'react';
import { getOrderListModalData } from '../../../services';
import OrderList from '../containers';
import { Title } from '../../../components/modal-title';
import { modalStyles } from '../../../constants';


export default {
  namespace: 'orderList',
  state: {
    overList: [], // 已开奖列表
    unOverList: [], // 未开奖列表
    overPage: {}, // 已开奖page信息
    unOverPage: {}, // 未开奖列表
    activeKey: '', // 打开订单详情列表
    loading: true, // 加载标识符
    refreshFlag: false, // 刷新标识符
    changeLoading: false,
  },
  /*  控制加载状态的 reducer */
  reducers: {
    showLoading(state) {
      return { ...state, loading: true };
    },
    showChangeLoading(state) {
      return { ...state, changeLoading: true };
    },
    hideChangeLoading(state) {
      return { ...state, changeLoading: false };
    },
    /* 控制刷新加载状态的 reducer */
    showRefresh(state) {
      return { ...state, refreshFlag: true }
    },
    /* 已开列表刷新写入 */
    reloadOverOrderListModal(state, { payload: { list, page } }) {
      return { ...state, overList: list, overPage: page, loading: false, refreshFlag: false }
    },
    /* 已开奖列表添加 */
    setOverOrderListModal(state, { payload: { list, page } }) {
      const oldList = [...state.overList];
      const newList = oldList.concat(list);
      const newData = newList
      return { ...state, overList: newData, overPage: page, loading: false }
    },
    /* 待开奖列表写入 */
    reloadUnOverOrderListModal(state, { payload: { list, page } }) {
      return { ...state, unOverList: list, unOverPage: page, loading: false, refreshFlag: false }
    },
    /* 待开奖列表添加 */
    setUnOverOrderListModal(state, { payload: { list, page } }) {
      const oldList = [...state.unOverList];
      const newList = oldList.concat(list);
      const newData = newList
      return { ...state, unOverList: newData, unOverPage: page, loading: false }
    },
    /* 控制详情打开 */
    openDetailForKey(state, { key }) {
      const oldKey = state.activeKey;
      const newKey = key !== oldKey ? key : '';
      return { ...state, activeKey: newKey }
    },
  },
  effects: {
    * getOrderListData(action, { call, put }) {
      if (action.params) {
        if (action.params.refresh) {
          yield put({
            type: 'showRefresh',
          })
        }
      }
      try { // 防止出错后点击记录没反应
        const { data: { data }, page } = yield call(getOrderListModalData(action.params));
        if (data) {
          let reducersName;
          if (action.params) {
            switch (action.params.type) {
              case '1':
                reducersName = 'reloadOverOrderListModal';
                break;
              default:

                reducersName = 'reloadUnOverOrderListModal'
            }
          } else {
            reducersName = 'reloadUnOverOrderListModal';
          }
          yield put({
            type: reducersName,
            payload: {
              list: data,
              page,
            },
          })
        }
      } catch (e) {
        console.error(e)
      }
    },
    * getOnChhangeOrderListData(action, { call, put }) {
      yield put({ type: 'showChangeLoading' });
      const { data: { data }, page } = yield call(getOrderListModalData(action.params));
      if (data) {
        let reducersName;
        yield put({ type: 'hideChangeLoading' });
        if (action.params) {
          switch (action.params.type) {
            case '1':
              reducersName = 'reloadOverOrderListModal';
              break;
            default:

              reducersName = 'reloadUnOverOrderListModal'
          }
        } else {
          reducersName = 'reloadUnOverOrderListModal';
        }
        yield put({
          type: reducersName,
          payload: {
            list: data,
            page,
          },
        })
      }
    },
    * showOrderList(action, { put }) {
      yield put({
        type: 'common/optionModal',
        payload: {
          content: <OrderList />,
          title: <Title title="orderList" />,
          visible: true,
          style: {
            ...modalStyles,
            overflowY: 'hidden',
          },
        },
      })
    },
    * loadOrderList(action, { call, put }) {
      yield put({
        type: 'showLoading',
      })
      const { data: { data }, page } = yield call(getOrderListModalData(action.params));
      if (data) {
        let reducersName;
        if (action.params) {
          switch (action.params.type) {
            case '1':
              reducersName = 'setOverOrderListModal';
              break;
            default:
              reducersName = 'setUnOverOrderListModal';
              break;
          }
        } else {
          reducersName = 'setUnOverOrderListModal';
        }

        yield put({
          type: reducersName,
          payload: {
            list: data,
            page,
          },
        })
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if ((/^\/game\/orderList/g).test(pathname)) {
          dispatch({ type: 'mping/pageEvent', pageName: 'orderList' });
        }
      });
    },
  },

};

