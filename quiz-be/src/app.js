const express = require('express');
const apiIndex = require('../src/api/index')
const apis = express.Router();

const defaultApis = [
    {
      path: '/question',
      route: apiIndex.questionApis,
    },
    {
      path: '/user-response',
      route: apiIndex.userResponseApis,
    },
  ];

  defaultApis.forEach((api) => {
    apis.use(api.path, api.route);
});

module.exports = apis;