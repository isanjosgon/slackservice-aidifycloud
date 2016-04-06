(function() {

'use strict';

const _ = require('lodash');
const ASSIGNABLE_USER_LOCATION = 'working';

class NotifyUser {

	constructor(userRepository, messageRepository) {
		this.userRepository = userRepository;
		this.messageRepository = messageRepository;
	}
	
	execute(params, res) {
		let self = this;
		this.userRepository
			.getUsers({location : ASSIGNABLE_USER_LOCATION})
			.then(function(users) {
				
				let user = _.sample(_.reject(users, function(elem) {
					return elem.login == params.user;
				}));
				
				if(!user) {
					res && res.ko('No user to assign pull request');
					return;
				}
				
				let message = {
					receiver: user.login,
					from: params.user,
					type: params.type,
					action: params.action,
					repo: params.repo,
					points: params.points
				};
				
				console.log("Message %j", message);
				
				self.messageRepository
					.send(message)
					.then(function(res) {
						res && res.ok(true);
					})
					.catch(function(err) {
						res && res.ko(err);
					});
			})
			.catch(function(err) {
				res && res.ko(err);
			})
	}
}

module.exports = NotifyUser;

})();