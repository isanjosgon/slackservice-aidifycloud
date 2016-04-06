(function() {

'use strict';

const request = require('superagent');

class UserRepository {
	
	getUsers(params) {
		return new Promise(function (resolve,reject) {
			
			let query = {};
			if(params.location) {
				query['location'] = params.location;
			}
			
			request
				.get(process.env.USER_SERVICE + '/user')
				.query(query)
				.end(function(err, res) {
					if (err) {
						return reject(err);
					}

					resolve(res.body.result);
				});
		});
	}
}

module.exports = UserRepository;

})();