import Moment from 'moment';
import { get } from 'lodash';
import { OPTION_ROW_MAX_BETY } from '../../../../constants/game-config'

import {
  MATCH_STATUS,
  LOTTERY_TYPE,
  BASKETBALL_ALL_PERIOD,
  BASKETBALL_SCORE_DEFLAULT,
  PLAYTYPEEXPLAIN,
  PLAYTYPEEXPLAINMAPPING,
} from '../constants';

export function matchStateTeamParser({ picUrl, shortName }) {
  return {
    logo: picUrl,
    name: shortName,
  }
}

export function getTeamScores(players) {
  if (players && players.length === 2) {
    return players.map((item) => {
      return item.score.reduce((a, b) => a + b);
    });
  }
  return [];
}

export function getBasketBallScore(score) {
  const newArr = padArray(score, BASKETBALL_ALL_PERIOD, BASKETBALL_SCORE_DEFLAULT);
  const halfPeriod = BASKETBALL_ALL_PERIOD / 2;
  const beforeScores = newArr.slice(0, halfPeriod);
  const afterScores = newArr.slice(halfPeriod);
  const halfScore = beforeScores.reduce((a, b) => {
    return (b === BASKETBALL_SCORE_DEFLAULT) ? a : (a + b);
  });
  return beforeScores.concat([halfScore]).concat(afterScores);
}

export function getMatchStatus(matchStatus) {
  switch (matchStatus) {
    case 0:
      return MATCH_STATUS.NOT_THE_START;
    case 7:
      return MATCH_STATUS.HALF_TIME;
    case 8:
      return MATCH_STATUS.GAME_PAUSE;
    case 9:
      return MATCH_STATUS.GAME_OVER;
    default:
      return MATCH_STATUS.IN_THE_GEME;
  }
}

export function isLiveByMatchStatus(matchStatus) {
  return (
    [
      MATCH_STATUS.IN_THE_GEME,
      MATCH_STATUS.HALF_TIME,
      MATCH_STATUS.GAME_PAUSE,
    ].indexOf(matchStatus) > -1
  );
}

export function isLotteryBySportType(sportType) {
  const lotteryTypes = [];
  for (const attr in LOTTERY_TYPE) {
    if (Object.prototype.hasOwnProperty.call(LOTTERY_TYPE, attr)) {
      lotteryTypes.push(LOTTERY_TYPE[attr]);
    }
  }

  return lotteryTypes.indexOf(sportType) > -1;
}

function padArray(arr, num, defaultValue) {
  if (arr.length >= num) {
    return arr;
  } else {
    return arr.concat(Array(...Array(num - arr.length)).map(() => defaultValue));
  }
}

export function combineArray(arr1, arr2) {
  return arr1.map((item, index) => [item, arr2[index]])
}


export function durationFormat(time) {
  const seconds = Moment.duration(time).asSeconds();
  const minutes = Moment.duration(time).asMinutes();
  return {
    minutes: parseInt(minutes, 10),
    seconds: parseInt(seconds - Moment.duration(parseInt(minutes, 10), 'minutes').asSeconds(), 10),
  }
}

export function playtypesOptionsParser(optionName,
  sp,
  optionIds,
  betLimit,
  paused,
  currentOptionId) {
  const titleArr = splitArray(optionName);
  const oddsArr = splitArray(sp);
  const optionIdArr = splitArray(optionIds);
  const betLimitArr = splitArray(betLimit);

  if (titleArr.length === oddsArr.length &&
    oddsArr.length === optionIdArr.length &&
    betLimitArr.length === optionIdArr.length
  ) {
    return titleArr.map((item, index) => {
      return {
        title: item,
        odds: oddsArr[index] <= 1 ? '--' : oddsArr[index],
        optionId: optionIdArr[index],
        betLimit: betLimitArr[index],
        disabled: oddsArr[index] <= 1 ? true : !!paused,
        isSelected: optionIdArr[index] === currentOptionId,
      }
    })
  }

  return false;
}

export function processArray(array) {
  const len = array.length;
  const maxLength = 3;
  const minLength = 2;
  const maxNum = Math.floor(len / maxLength);
  const rem = len % maxLength;
  let numArr = [];

  if (rem === 0) {
    numArr = numArr.concat(Array(...Array(maxNum)).map(() => maxLength));
  } else if (rem === maxLength - minLength) {
    numArr = [minLength, minLength]
      .concat(Array(...Array(maxNum - (maxLength - minLength))).map(() => maxLength));
  } else if (rem === minLength) {
    numArr = [minLength].concat(Array(...Array(maxNum)).map(() => maxLength));
  }

  let index = 0;

  return numArr.map((value) => {
    const start = index;
    const end = index += value;
    return array.slice(start, end);
  })
}

export function getCurrentBetOptionInfo(playtypes, optionIds, optionId) {
  const currentOptions = playtypes && playtypes.filter(item => item.optionId === optionIds)[0];
  const index = splitArray(optionIds).indexOf(optionId);
  const optionNameArr = splitArray(get(currentOptions, 'optionName'));
  const oddsArr = splitArray(get(currentOptions, 'sp'));
  const betLimitArr = splitArray(get(currentOptions, 'betLimit'));
  const handicap = get(currentOptions, 'handicap');
  const disabled = oddsArr[index] <= 1 ? true : !!get(currentOptions, 'paused');

  if (currentOptions) {
    return {
      playtypeName: get(currentOptions, 'playtypeName'),
      betLimit: betLimitArr[index],
      odds: oddsArr[index],
      optionName: optionNameArr[index],
      optionId,
      handicap,
      disabled,
    }
  }
  return false;
}

function splitArray(str) {
  return str ? str.split(',') : [];
}

export function processPlaytypeExplain(sportType, playtypeCode, period, handicapType) {
  const verify = get(PLAYTYPEEXPLAIN, `${sportType}.${playtypeCode}.verify`);
  if (typeof verify === 'object') {
    for (const attr in verify) {
      if (Object.prototype.hasOwnProperty.call(verify, attr)) {
        const obj = verify[attr];
        if (get(obj, 'period').indexOf(period) > -1 && get(obj, 'handicapType') === handicapType) {
          return {
            isExplain: true,
            explainPointer: `${PLAYTYPEEXPLAINMAPPING[sportType]}.${playtypeCode}.${attr}`,
          };
        }
      }
    }
  } else if (verify === true) {
    return {
      isExplain: true,
      explainPointer: `${PLAYTYPEEXPLAINMAPPING[sportType]}.${playtypeCode}`,
    };
  }

  return {
    isExplain: false,
    explainPointer: '',
  };
}

export function processRow(arr) {
  let isRowFlag = false;
  arr.forEach((options) => {
    const optionLength = options.length;
    options.forEach((option) => {
      if (optionLength === 2) {
        if (getStrByteLen(option.title) > OPTION_ROW_MAX_BETY.bigBt) {
          isRowFlag = true;
          return false;
        }
      } else if (optionLength === 3) {
        if (getStrByteLen(option.title) > OPTION_ROW_MAX_BETY.smallBt) {
          isRowFlag = true;
          return false;
        }
      }
    })
  })
  return isRowFlag;
}

function getStrByteLen(str) {
  const l = str.length;
  let n = l;
  for (let i = 0; i < l; i++) {
    if (str.charCodeAt(i) > 255) {
      n++;
    }
  }
  return n;
}
