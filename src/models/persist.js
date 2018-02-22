import { get } from 'lodash';

export default {

  namespace: 'persist',

  state: {},

  effects: {
    *REHYDRATE({ payload }, { call, put }) {  // eslint-disable-line
      const defaultInputCount = get(payload, 'gameDetail.defaultInputCount');
      const playtypeStickiedIds = get(payload, 'gameDetail.playtypeStickiedIds');
      if (defaultInputCount != null) {
        yield put({
          type: 'gameDetail/setDefaultInputCount',
          defaultInputCount,
        });
      }

      if (playtypeStickiedIds != null) {
        yield put({
          type: 'gameDetail/createPlaytypeStickiedIds',
          playtypeStickiedIds,
        });
      }
    },
  },

/*  reducers: {
    rehydrate(state, action) {
      return state
    },
  },*/

};
