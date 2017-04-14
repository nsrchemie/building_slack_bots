'use strict';

let token = require('../firstapi.js').pass;
let Bot = require('./bot.js').Bot;

const bot = new Bot({
  token: token,
  autoReconnect: true,
  autoMark: true
 });
