'use strict';

const RtmClient = require('@slack/client').RtmClient;
const MemoryDataStore = require('@slack/client').MemoryDataStore;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;

class Bot {
  constructor(opts) {
   let slackToken = opts.token;
   let autoReconnect = opts.autoReconnect || true;
   let autoMark = opts.autoMark || true;

   this.slack = new RtmClient(slackToken, {
   logLevel: 'error',
   dataStore: new MemoryDataStore(),
   autoReconnect: autoReconnect,
   autoMark, autoMark
   });

  this.slack.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
    let user = this.slack.dataStore.getUserById(this.slack.activeUserId)
    let team = this.slack.dataStore.getTeamById(this.slack.activeTeamId);
    this.name = user.name;
 console.log(`Connected as ${user.name}!`);
 });

this.slack.start();
}}


exports.Bot = Bot;
