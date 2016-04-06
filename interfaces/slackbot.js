(function() {

'use strict';

var SlackBot = require('slackbots');

var bot = new SlackBot({
	token: process.env.SLACKBOT_TOKEN,
	name: process.env.SLACKBOT_NAME
});

bot.on('start', function() {
	var params = {
			"icon_url": "http://icons.iconarchive.com/icons/kyo-tux/aeon/256/Sign-LogOff-icon.png",
			"attachments": [
				{
					"fallback": "New pull request to check from @josesalazar",
					"color": "#FFA74D",
					"fields": [
						{
							"title": "Description",
							"value": "New pull request to check from @josesalazar\ntitle: \"new feature\"\nbody: \"please pull these awesome changes\"",
							"short": false
						},
						{
							"title": "Repo",
							"value": "aidify/test",
							"short": true
						}
					]
				}
			]
		};
	
	bot.postMessageToChannel('general', '*ai{D}fy message*', params);
});

module.exports = bot;

})();