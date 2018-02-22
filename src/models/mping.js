
import JDMping from '../utils/mping';

export default {

  namespace: 'mping',

  state: {},

  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'appendMiping' })
    },
  },

  effects: {
    * appendMiping() {
      const jap = {
        siteId: 'MO-J2011-1', // 站点编号，必传字段，如无需要从子午线申请
        // account: '',  // 业务方将pin以前端变量的形式传入，如果不需独立上传pin，务必请该字段去掉
        // skuid: '', // 商详页上报skuid
        // shopid: '', // 店铺页上报店铺id
        // orderid: '', // 订单成功提交页上报订单号
        autoLogPv: true,  // 是否自动上报pv
      };
      yield new JDMping(jap);
    },
    /** pageEvent({ pageName }) {
       switch (pageName) {
        case 'gameDetail':
          JDMping.createPvEvent(pageName);
          break;
        case 'gamePortal':
          JDMping.createPvEvent(pageName);
          break;
        case 'orderList':
          JDMping.createPvEvent(pageName);
          break;
        default:
          break;
      }
    },*/
    * clickEvent({ eventName }) {
      let pageName = window.location.href;
      if (window.location.search !== '') pageName = pageName.split(window.location.search);
      if (window.location.hash !== '') pageName = pageName.split(window.location.hash);
      switch (eventName) {
        case 'openOrderListModal':
          JDMping.createMpingEvent({
            eventId: 'MMagicBeanGuessBallBetList_Record',
            pageId: 'MMagicBeanGuessBall_Betlist',
            pageName,
          });
          break;
        case 'openHowToPlayModal':
          JDMping.createMpingEvent({
            eventId: 'MMagicBeanGuessBallBetList_Help',
            pageId: 'MMagicBeanGuessBall_Betlist',
            pageName,
          });
          break;
        default:
          break;
      }
    },
  },

  reducers: {

  },

};
