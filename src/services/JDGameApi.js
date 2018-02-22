/** 此页面封装JD API
 *
 */
import fetch from 'isomorphic-fetch';
import { get } from 'lodash';

import { ERROR_CODE, API_PATH, API_ERROR_TYPE } from './apiProtocol'
import { post } from './request'
import { processException } from '../utils/processException';

/**
 *
 *
 * @param  {object} json   A json object from a network response
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkCode(json) {
  // console.log('JDProtocol Response', json)
  if (json.returnCode === undefined || json.returnCode !== 0) {
    const error = new Error(json.returnMsg);
    error.json = json;
    error.type = API_ERROR_TYPE.SERVER;
    error.code = ERROR_CODE.JD_GATEWAY_ERROR;
    throw error;
  }
  if (process.env.NODE_ENV === 'development') {
    console.log(
      '//^^^^^^^返回数据^^^^^^^//',
      json.gameResponse && JSON.parse(json.gameResponse).command,
      json.gameResponse && JSON.parse(json.gameResponse).data,
      // '//^^^^^^^返回数据结束^^^^^^^//',
    )
  }
  return json
}

function parseJDDProtocol(json) {
  if (!json.gameResponse) {
    return json
  }
  const jsonData = JSON.parse(json.gameResponse);

  if (jsonData.code === undefined || jsonData.code !== '0') {
    const error = new Error(get(jsonData, 'message', '接口未知错误'));
    jsonData.message = get(jsonData, 'message', '接口未知错误');
    error.json = jsonData;
    error.type = API_ERROR_TYPE.RESPONSE;
    throw error;
  }
  return json
}

export function processDataStructure(json) {
  const jsonData = JSON.parse(json.gameResponse);
  const resp = {
    data: get(jsonData, 'data', {}),
  };
  if (json.balance) resp.balance = json.balance
  if (jsonData.page) resp.page = jsonData.page;

  return resp;
}

/**
 *
 * @param {String} protocol 'API_COMMAND'
 * @param {Object} request { 接口请求内容 }
 * @param {Object} pagination page:{ pageSize：number，pageIndex:number}
 */

export function requestGameApi(protocol, request = {}, pagination) {
  const initRequest = {
    version: 'v1',
    command: protocol,
    data: request,
  };
  if (pagination) initRequest.page = pagination;
  const gameRequest = JSON.stringify(initRequest)

  const JDProtocol = {
    gameID: 600,
    feeType: 4,
    tranType: protocol === 'bet' ? 1 : 0,  // 所有投注类接口在此标识为1
    gameRequest,
  };

  return post(JDProtocol, undefined, 'application/x-www-form-urlencoded')
    .then(checkCode)
    .then(parseJDDProtocol)
    .then(processDataStructure)
    .catch((e) => {
      processException(e);
      throw e
    })
}

export function requestLoginApi() {
  const JDProtocol = {
    gameID: 600,
    feeType: 4,
    tranType: 0,  // 所有投注类接口在此标识为1
  };
  return post(JDProtocol, API_PATH.login, 'application/x-www-form-urlencoded')
    .then(checkCode)
    .then(parseJDDProtocol)
    .catch((e) => {
      console.error('fetch error:', e, e.json)
    })
}

export function requestJDShareInfo() {
  return fetch(API_PATH.JDShareInfo)
    .then(data => data)
    .catch((e) => {
      console.error('fetch error:', e, e.json)
    })
}
