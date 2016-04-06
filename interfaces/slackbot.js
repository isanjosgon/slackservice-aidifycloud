(function() {

'use strict';

var SlackBot = require('slackbots');

var bot = new SlackBot({
	token: process.env.SLACKBOT_TOKEN,
	name: process.env.SLACKBOT_NAME
});

var object = require('json-templater/object');

bot.on('start', function() {
	bot.postMessageToChannel('general', "*ai{D}fy ready!!!*");
});

module.exports = bot;

})();