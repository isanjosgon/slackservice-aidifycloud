(function() {

'use strict';

const restify = require('restify');
const config = require('../package.json');
const Response = require('./response');

class Server {
	
	constructor(logger) {
		let api = restify.createServer({
			name: config.name,
			version: config.version
		});
		api.use(restify.acceptParser(api.acceptable));
		api.use(restify.queryParser());
		api.use(restify.bodyParser());
		
		api.get('/',function (req,res) {
		  let response = new Response(res);
		  response.pong();
		});
		
		api.listen(process.env.PORT || 5008,function () {
			logger.config(config.name + ' up and ready');
		});
	}
}

module.exports = Server;

})();