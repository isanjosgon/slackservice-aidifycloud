(function() {

'use strict';

class MessageRepository {

	constructor(templates, slackbot) {
		this.templates = templates;
		this.slackbot = slackbot;
	}
	
	send(message){
		const templateIdFormat = `${message.type}-${message.action}`; 
		console.log("Template %j", templates[templateIdFormat]);
	}

}

module.exports = MessageRepository;

})();