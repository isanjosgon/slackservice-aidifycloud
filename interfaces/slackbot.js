(function() {

'use strict';

var SlackBot = require('slackbots');

var bot = new SlackBot({
	token: process.env.SLACKBOT_TOKEN,
	name: process.env.SLACKBOT_NAME
});

bot.on('start', function() {
	
	let params = {
		"icon_url": "https://apigateway-aidifycloud.herokuapp.com/images/logo.png",
		"username": "ai{D}fy"
	}
	bot.postMessageToChannel('general', "ai{D}fy is ready!!!", params);
});

module.exports = bot;

})();