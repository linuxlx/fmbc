export const WALLET_TYPE_MAP = {
  章鱼: 1,
  第三方: 2,
}
/* orderList page option */

export const ORDER_LIST_PAGE_OPTION = {
  page: {
    pageSize: 10,
    pageIndex: 1,
  },
}

export const WALLET_TYPE_CONFIG = {
  [WALLET_TYPE_MAP.章鱼]: {
    title: '跳转主站钱包',
    jsbridge: '主站地址',
  },
  [WALLET_TYPE_MAP.第三方]: {
    title: '跳转第三方钱包',
    jsbridge: '第三方地址',
  },
};

/* detail-option*/

export const OPTION_ROW_MAX_BETY = {
  bigBt: 16,
  smallBt: 8,
}

export const TARGET_TYPE = {
  recharge: 'recharge',
}

export const OPEN_ERROR_TYPE = {
  detail: 'detail',
  simple: 'simple',
}
