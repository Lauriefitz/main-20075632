'use strict';

const logger = require('../utils/logger');
const categoryStore = require('../models/category-store');
const categoryCollection = require('../models/category-store.js');
const accounts = require ('./accounts.js');

const start = {
  index(request, response) {
    logger.info('start rendering');
    const loggedInUser = accounts.getCurrentUser(request);
     const viewData = {
       title: 'Welcome',
       sizeAll: categoryStore.getAllCategories().length,
       sizeUser: categoryStore.getUserCategories(loggedInUser.id).length,
       totalLinks: categoryStore.getTotalNumberOfLinks(),
       average: categoryStore.getTotalNumberOfLinks()/categoryStore.getUserCategories(loggedInUser.id).length,
       averageAll: categoryStore.getAllLinks()/categoryStore.getAllCategories().length,
    };
    response.render('start', viewData);
  },
};

module.exports = start;
