'use strict';

const logger = require('../utils/logger');
const messageStore = require('../models/message-store');

const about = {
  index(request, response) {
    logger.info('about rendering');
    const viewData = {
      title: 'About the Author',
      messages: messageStore.getAllMessages(),
    };
    response.render('about', viewData);
  },
  
  addMessage(request, response) {
    const message = request.body.message;
    const name = request.body.name;
    logger.info('message recieved' + message);
    const newMessage = {
      name: name,
      messagetext: message,
    };
    messageStore.addMessage(newMessage);
    response.redirect ('/about');
},
};

module.exports = about;