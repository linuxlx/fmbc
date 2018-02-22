// import Example from '../../../../components/Example';
import { TARGET_TYPE } from '../../../../constants/game-config';

export const MATCH_STATUS = {
  NOT_THE_START: 'not_the_start',
  IN_THE_GEME: 'in_the_game',
  GAME_OVER: 'game_over',
  GAME_PAUSE: 'game_pause',
  HALF_TIME: 'half_time',
};

export const LOTTERY_TYPE = {
  BASKETBALL: 0,
  FOOTBALL: 1,
};

export const PERIOD_TYPE = {
  FIRST_HALF: 5,
  SECOND_HALF: 6,
}

export const FOOTBALL_PERIOD_TYPE = {
  [PERIOD_TYPE.FIRST_HALF]: 'firstHalf',
  [PERIOD_TYPE.SECOND_HALF]: 'secondHalf',
}
export const BALL_TYPE = {
  [LOTTERY_TYPE.BASKETBALL]: 'basketball',
  [LOTTERY_TYPE.FOOTBALL]: 'football',
};

export const BASKETBALL_ALL_PERIOD = 4;
export const BASKETBALL_SCORE_DEFLAULT = '--';
export const MATCH_SCORES_DEFLAULT = 'VS';

export const PLAYTYPEEXPLAINMAPPING = {
  [LOTTERY_TYPE.FOOTBALL]: 'footballMapping',
  [LOTTERY_TYPE.BASKETBALL]: 'basketballMapping',
};

export const PLAYTYPEEXPLAIN = {
  [LOTTERY_TYPE.FOOTBALL]: {
    FTRFSF: {
      verify: [
        {
          period: [0, 5, 6],
          handicapType: -1,
        },
        {
          period: [0, 5, 6],
          handicapType: 0,
        },
      ],
    },
    FTDXQ: {
      verify: true,
    },
    FTBQC: {
      verify: true,
    },
  },
  [LOTTERY_TYPE.BASKETBALL]: {
    BSKRFSF: {
      verify: true,
    },
    BSKDXF: {
      verify: true,
    },
    BSKBQC: {
      verify: true,
    },
  },
};


export const TEAMFLAG = {
  HOME: 1,
  GUEST: 2,
};

export const BETERRORCODE = {
  1001: {
    codeText: 'notSufficientFunds',
    isOpenBridge: true,
    closeModal: true,
    targetUrl: '/ddd',
    targetType: TARGET_TYPE.recharge,
  },
  1002: {
    codeText: 'limitValue',
    isOpenBridge: false,
    closeModal: true,
    targetUrl: null,
    targetType: null,
  },
  1003: {
    codeText: 'handicapClose',
    isOpenBridge: false,
    closeModal: true,
    targetUrl: null,
    targetType: null,
  },
  1004: {
    codeText: 'oddsVerifyError',
    isOpenBridge: false,
    closeModal: true,
    targetUrl: null,
    targetType: null,
  },
  1005: {
    codeText: 'handicapInconformity',
    isOpenBridge: false,
    closeModal: true,
    targetUrl: null,
    targetType: null,
  },
  1006: {
    codeText: 'repeatOrder',
    isOpenBridge: false,
    closeModal: true,
    targetUrl: null,
  },
  1007: {
    codeText: 'accountTypeException',
    isOpenBridge: false,
    closeModal: true,
    targetUrl: null,
    targetType: null,
  },
  1000: {
    codeText: 'businessProcessException',
    isOpenBridge: false,
    closeModal: true,
    targetUrl: null,
    targetType: null,
  },
  20001: {
    codeText: 'deductErrorText',
    isOpenBridge: false,
    closeModal: true,
    targetUrl: null,
    targetType: null,
  },
  other: {
    codeText: 'defaultErrorText',
    isOpenBridge: false,
    closeModal: true,
    targetUrl: null,
    targetType: null,
  },
};
export const DEFAULTERRORCODE = 'other';
export const MATCH_STATE_OFFICIAL = {
  handicapStatusClose: {
    desc: 'desc',
    buttonText: 'buttonText',
    targetUrl: '/game',
    type: 'handicapStatusClose',
  },
  matchOver: {
    desc: 'desc',
    buttonText: 'buttonText',
    targetUrl: '/game',
    type: 'matchOver',
  },
  nodata: {
    desc: 'desc',
    buttonText: 'buttonText',
    targetUrl: '/game',
    type: 'nodata',
  },
};
export const BALL_LIMITE_TIME = {
  [LOTTERY_TYPE.BASKETBALL]: {
    max: 12,
    min: 0,
  },
  [LOTTERY_TYPE.FOOTBALL]: {
    firstHalf: {
      max: 45,
      min: 0,
    },
    secondHalf: {
      max: 90,
      min: 45,
    },
  },
};
export const OPERATOR_TYPE = {
  plus: 'plus',
  minus: 'minus',
};
export const TIMER_SUFFIX = "'";

export const BUTTON_TEXT_CODE = {
  isAllInState: 'betButtonAllText',
  isNotSufficientFunds: 'notSufficientFundsText',
  betButtonText: 'betButtonText',
}

export const INPUT_BUTTON_TYPE = {
  fullBet: 'betInputButtonFullText',
  All: 'betInputButtonAllText',
  notSufficientFundsText: 'notSufficientFundsText',
}

