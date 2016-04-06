(function() {

'use strict';

const _ = require('lodash');
const ASSIGNABLE_USER_LOCATION = 'working';

class AssignPullRequest {

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
				
				self.messageRepository
					.send(user.login, params)
					.then(function(data) {
						res && res.ok(data);
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

module.exports = AssignPullRequest;

})();