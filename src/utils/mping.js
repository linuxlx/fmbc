
class JDMping {
  constructor(options) {
    window.jap = window.jap || options;
    const _script = document.createElement('script');
    _script.type = 'text/javascript';
    _script.async = 'async';
    _script.defer = 'defer';
    _script.src = '//wl.jd.com/unify.min.js';
    document.body.appendChild(_script);
  }
  static createMpingEvent({ eventId, eventParam, pageName, pageId, eventLevel }) {
    try {
      const click = new window.MPing.inputs.Click(eventId); // 构造click请求
      if (eventParam) click.event_param = eventParam; // 设置click的参数
      if (pageName) click.page_name = pageName; // 当前页面类名或（M页）去参URL
      if (pageId) click.page_id = pageId;
      if (eventLevel) click.event_level = eventLevel; // 设置事件等级
      click.updateEventSeries();  // 更新事件串
      const mping = new window.MPing(); // 构造上报实例
      mping.send(click);  // 上报click
    } catch (e) {
      console.error(e)
    }
  }
  static createPvEvent(pageId) {
    try {
      // 构造pv 请求,可选参数为pageId，
      // 可以为数字、字符串、或者{page_id: "1212"}；如埋点方案未要求或者未提到pageid，
      // 请忽略，即 var pv = new MPing.inputs.PV();
      const pv = new window.MPing.inputs.PV(pageId);
      const mping = new window.MPing();  // 构造上报实例
      mping.send(pv); // 上报pv
    } catch (e) {
      console.error(e)
    }
  }
}

export default JDMping;
