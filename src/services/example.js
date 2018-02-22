// api 为webpack 定义的proxy 参加.roadhogrc.js中proxy的定义
// 参考文档 http://www.jianshu.com/p/3bdff821f859
import request from '../utils/request';

export async function query() {
  return request('/api/users');
}
