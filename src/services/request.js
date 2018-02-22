/* eslint-disable max-len */
import { omit } from 'lodash'
import fetch from 'isomorphic-fetch';

import { ERROR_CODE } from './apiProtocol';
import { serializeQuery } from '../utils/commonFunctions';

const requestUrl = process.env.REQUEST_PATH;
// const requestUrl = '/api'

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  error.code = ERROR_CODE.HTTP_STATE_ERROR;
  throw error;
}

export function post(body, apiPath = '/gameLogic', contentType = 'application/json') {
  if (!body) throw new Error('lack post body')
  let bodyContent
  if (contentType === 'application/json') {
    bodyContent = `${JSON.stringify(body)}`
  } else if (contentType === 'application/x-www-form-urlencoded') {
    bodyContent = serializeQuery(body);
  }
  const options = {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: bodyContent,
    headers: {
      'Content-Type': contentType,
    },
  }
  if (process.env.NODE_ENV === 'development') {
    console.log(
      '//--------POST START--------//',
      body.gameRequest && JSON.parse(body.gameRequest).command,
      body.gameRequest && omit(JSON.parse(body.gameRequest).data, ['t', 's', 'k', 'ts']),
      '//--------POST END--------//')
  }

  return fetch(`${requestUrl}${apiPath}`, options)
        .then(checkStatus)
        .then(parseJSON)
        .catch((e) => {
          console.error('fetch error:', e)
          throw e;
        })
}

