(function() {

'use strict';

const request = require('superagent');

class IssueRepository {

	constructor(logger) {
		this.logger = logger;
	}

	save(issue) {
		let self = this;
		return new Promise(function(resolve, reject) {
			request
				.put(process.env.GITHUB_SERVICE + '/issue')
				.send(JSON.stringify(issue))
				.end(function(err, res) {
					if (err) {
						self.logger.info("Error updating issue " + err.response.text);
						return reject(JSON.parse(err.response.text).error);
					}
					
					resolve(true);
				})
		});
	}
}

module.exports = IssueRepository;

})();