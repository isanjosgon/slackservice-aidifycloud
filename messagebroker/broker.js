(function() {

'use strict';

const redis = require('redis');

class Broker {

	constructor(logger, assignPullRequest, notifyUser) {
		
		this.client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
		this.client.auth(process.env.REDIS_PASSWORD);
		this.client.subscribe('SERVICE:ACTIVITYMANAGEMENT');
		this.client.on('message', function(channel, message) {
			let service = channel.split(':')[1];
			let action = message.split(':')[0];
			if (logger) {
				logger.info('Action: ' + action + ', Message: ' + message);
			}
			let params = JSON.parse(message.substring(message.indexOf(':')+1, message.length));
			if(service == 'ACTIVITYMANAGEMENT' && action == 'CREATE_ACTIVITY'
				&& params.type == 'pullrequestevent' && (params.action == 'opened' || params.action == 'reopened')) {
				assignPullRequest.execute(params);
			} else {
				notifyUser.execute(params);
			}
		});
	}
}

module.exports = Broker;

})();