'use strict';

let token = require('../firstapi.js').pass;
let Bot = require('./bot.js').Bot;

const bot = new Bot({
  token: token,
  autoReconnect: true,
  autoMark: true
 });

bot.respondTo('hello', (message, channel, user) => {
  bot.send(`Hello to you too, ${user.name}!`, channel)
}, true);

bot.respondTo('roll', (message,channel,user) => {
  let args = getArgs(message.text);

let firstRoll = Math.round(Math.random() * 100);
let secondRoll = Math.round(Math.random() * 100);

let challenger = user.name;
let opponent = args[0];

while (firstRoll === secondRoll) {
  secondRoll = Math.round(Math.random() * 100);
}

let winner = firstRoll > secondRoll ? challenger : opponent;

bot.send(
 `${challenger} fancies their chances against ${opponent}!\n
  ${challenger} rolls: ${firstRoll}\n
  ${opponent} rolls: ${secondRoll}\n\n
  *${winner} is the winner!*`,
  channel);

}, true);

function getArgs(msg) {
  return msg.split(' ').slice(1);
}


