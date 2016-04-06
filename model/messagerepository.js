(function() {

'use strict';

var object = require('json-templater/object');

class MessageRepository {

	constructor(logger, templates, slackbot) {
		this.logger = logger;
		this.templates = templates;
		this.slackbot = slackbot;
	}
	
	send(user, params){
		let self = this;
		return new Promise(function (resolve,reject) {
			let templateIdFormat = `${params.type}-${params.action}`;
			if(!self.templates[templateIdFormat]) {
				self.logger.info('Unknown activity received:' + templateIdFormat);
				return reject('unknown activity');
			}
			let message = object(self.templates[templateIdFormat], params);
			self.slackbot.postMessageToUser(user, "*ai{D}ify message*", message)
				.then(function(data) {
					resolve(data);
				})
				.fail(function(err) {
					reject(err);
				});
		});
	}

}

module.exports = MessageRepository;

})();