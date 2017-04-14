'use strict';

const RtmClient = require('@slack/client').RtmClient;
const MemoryDataStore = require('@slack/client').MemoryDataStore;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const token = require('../firstapi.js').pass;

let slack = new RtmClient(token, {
  logLevel: 'error',
  dataStore: new MemoryDataStore(),
  autoReconnect: true,
  autoMark: true
});

slack.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () =>
{ let user = slack.dataStore.getUserById(slack.activeUserId);
  let team = slack.dataStore.getTeamById(slack.activateTeamId);

let channels = getChannels(slack.dataStore.channels);

let channelNames = channels.map((channel) => {
 return channel.name;
}).join(', ');
console.log(`Currently in ${channelNames} under the name ${user.name}`);

channels.forEach((channel) => {
   let members = channel.members.map((id) => {
     return slack.dataStore.getUserById(id);
});

members = members.filter((member) => {
return !member.is_bot;
});

let memberNames = members.map((member) => {
 return member.name;
}).join(', ');
console.log('Members of Channel:', memberNames);


slack.sendMessage(`Hello ${memberNames}!`, channel.id);
});
});

slack.start();




function getChannels(allChannels) {
 let channels = [];

for (let id in allChannels) {
let channel = allChannels[id];

if (channel.is_member) {
 channels.push(channel);
 }
}
return channels;
}