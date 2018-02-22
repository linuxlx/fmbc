import request from '../utils/request';

export async function getGameDetail() {
  return request('/mock/detail');
}
