(function() {

'use strict';

const config = require('./config');
const Logger = require('./interfaces/logger');
const env = require('node-env-file');
env(__dirname + '/.env');

// Create logger
let logger = new Logger();

// Init slackbot
let bot = require('./interfaces/slackbot');

// Broker bootstrap
const Broker = require('./messagebroker/broker');
const AssignPullRequestUserCase = require('./usecases/assignpullrequest');
const NotifyUserUseCase = require('./usecases/notifyuser');
const UserRepository = require('./model/userrepository');
const MessageRepository = require('./model/messagerepository');

let userRepository = new UserRepository();
let messageRepository = new MessageRepository(logger, config.templates, bot);
let assignPullRequestUseCase = new AssignPullRequestUserCase(userRepository, messageRepository);
let notifyUserUseCase = new NotifyUserUseCase(messageRepository);

let broker = new Broker(logger, assignPullRequestUseCase, notifyUserUseCase);

})();