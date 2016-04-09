(function() {

'use strict';

var SlackBot = require('slackbots');

var bot = new SlackBot({
	token: process.env.SLACKBOT_TOKEN,
	name: process.env.SLACKBOT_NAME
});

bot.on('start', function() {
	
	let params = {
		"icon_url": "https://raw.githubusercontent.com/isanjosgon/slackservice-aidifycloud/master/resources/images/aidify-logo.png",
		"username": "ai{D}fy"
	}
	bot.postMessageToChannel('general', "ai{D}fy!!!", params);
});

module.exports = bot;

})();