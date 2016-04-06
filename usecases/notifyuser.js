(function() {

'use strict';

class NotifyUser {

	constructor(messageRepository) {
		this.messageRepository = messageRepository;
	}
	
	execute(params, res) {
		
		this.messageRepository
			.send(params.user, params)
			.then(function(data) {
				res && res.ok(data);
			})
			.catch(function(err) {
				res && res.ko(err);
			});
	}
}

module.exports = NotifyUser;

})();