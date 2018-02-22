import { ERROR_CODE, API_ERROR_TYPE } from '../services/apiProtocol'

export function processException(error) {
  const { json, type } = error;
  const app = require('../index').app;
  const { dispatch } = app._store;
  if (type === API_ERROR_TYPE.SERVER) {
    dispatch({
      type: 'common/pushServerError',
      serverError: {
        command: json.gameResponse && JSON.parse(json.gameResponse).command,
        msg: json.returnMsg,
        code: ERROR_CODE.JD_GATEWAY_ERROR,
        json,
      },
    })
  } else if (type === API_ERROR_TYPE.RESPONSE) {
    dispatch({
      type: 'common/pushResponseError',
      responseError: {
        command: json.command,
        msg: json.message,
        code: json.code,
      },
    });
  }
}
