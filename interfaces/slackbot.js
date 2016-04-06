(function() {

'use strict';

var SlackBot = require('slackbots');

var bot = new SlackBot({
	token: process.env.SLACKBOT_TOKEN,
	name: process.env.SLACKBOT_NAME
});

bot.on('start', function() {
	var params = {
			"icon_url": "https://raw.githubusercontent.com/isanjosgon/slackservice-aidifycloud/master/resources/images/accepted.png",
			"attachments": [
				{
					"fallback": "@josesalazar accepted your pull request",
					"color": "#6BAD6B",
					"fields": [
						{
							"title": "Description",
							"value": "@josesalazar merged your pull request\ntitle: \"new feature\"\nbody: \"please pull these awesome changes\"",
							"short": false
						},
						{
							"title": "Repo",
							"value": "aidify/test",
							"short": true
						},
						{
							"title": "Points earned",
							"value": "+2000",
							"short": true
						}
					]
				}
			]
		};
	
	bot.postMessageToChannel('general', '*ai{D}fy message*');
	bot.postMessageToUser('adriano90', '*ai{D}fy message*');
});

module.exports = bot;

})();