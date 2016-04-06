(function() {

'use strict';

class NotifyUser {

	constructor(userRepository, messageRepository) {
		this.userRepository = userRepository;
		this.messageRepository = messageRepository;
	}
	
	execute(params, res) {
		let message = {
			to: params.user,
			from: params.eventUser,
			type: params.type,
			action: params.action,
			repo: params.repo,
			title: params.title,
			body: params.body,
			points: params.points
		};
		
		this.messageRepository
			.send(message)
			.then(function(res) {
				res && res.ok(true);
			})
			.catch(function(err) {
				res && res.ko(err);
			});
	}
}

module.exports = NotifyUser;

})();