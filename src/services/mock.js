import request from '../utils/request';

export async function getLoginInfo() {
  return request('/mock/login');
}

export async function getGameTypes() {
  return request('/mock/gameType');
}
