export default {
  // 支持值为 Object 和 Array
  'GET /mock/login': {
    balance: 12321434493,
    accountId: 1314,
    returnCode: 0,
    returnMsg: 'true',
  },
  'GET /mock/gameType': [
    {
      sportType: 0,
      displayName: '篮球',
      iconUrl: '',
      matchCount: 29,
    },
    {
      sportType: 1,
      displayName: '足球',
      iconUrl: '',
      matchCount: 13,
    },
    {
      sportType: 99,
      displayName: '王者荣耀',
      iconUrl: '',
      matchCount: 3,
    },
    {
      sportType: 99,
      displayName: 'DOTA',
      iconUrl: '',
      matchCount: 0,
    },
    {
      sportType: -9,
      displayName: '羽毛球',
      iconUrl: '',
      matchCount: 192,
    },
    {
      sportType: -9,
      displayName: '网球',
      iconUrl: '',
      matchCount: 2,
    },
    {
      sportType: -9,
      displayName: '终极挑战',
      iconUrl: '',
      matchCount: 1920,
    },
    {
      sportType: -9,
      displayName: '新',
      iconUrl: '',
      matchCount: 19211,
    },
    {
      sportType: -9,
      displayName: '？',
      iconUrl: '',
      matchCount: 12,
    },
  ],
  'GET /mock/matchGroup': [
    {
      groupName: '2017-7-7',
      matchCount: '13',
    },
    {
      groupName: '2017-7-8',
      matchCount: '21',
    },
    {
      groupName: '2017-7-9',
      matchCount: '1',
    },
    {
      groupName: '2017-7-11',
      matchCount: '13',
    },
    {
      groupName: '2017-7-12',
      matchCount: '13',
    },
    {
      groupName: '2017-7-13',
      matchCount: '13',
    },
    {
      groupName: '2017-7-14',
      matchCount: '13',
    },
  ],
};
