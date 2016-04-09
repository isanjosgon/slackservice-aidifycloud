(function() {

'use strict';

const _ = require('lodash');
const async = require('async');
const ASSIGNABLE_USER_LOCATION = 'working';

class AssignPullRequest {

	constructor(logger, userRepository, issueRepository, messageRepository) {
		this.logger = logger;
		this.userRepository = userRepository;
		this.messageRepository = messageRepository;
		this.issueRepository = issueRepository;
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
				
				async.parallel([function(callback) {
					// Send slack message even if we could't update github issue
					self.messageRepository
						.send(user.login, params)
						.then(function(data) {
							callback(data);
						})
						.catch(function(err) {
							callback(err);
						});
					}, function(callback) {
					
					// Update github issue
					
					let splitLink = params.link.split('/');
					let issue = {
						"user": params.repo.split('/')[0],
						"repo": params.repo.split('/')[1],
						"number": splitLink[splitLink.length-1],
						"assignee": user.login
					};
					
					self.issueRepository
						.save(issue)
						.then(function(res) {
							self.logger.info("The user " + issue.assignee + " was assigned to the issue: " + issue.number);
							callback(null, res);
						})
						.catch(function(err) {
							self.logger.err("Fail assigning the user " + issue.assignee + " to the issue: " + issue.number);
							callback();
						});
					}], function(err, result) {
							if(err) {
								res && res.ko(err);
								return;
							}
							
							res && res.ok(data);
						});
			})
			.catch(function(err) {
				res && res.ko(err);
			});
	}
}

module.exports = AssignPullRequest;

})();