'use strict';

const logger = require('../utils/logger');
const categoryStore = require('../models/category-store');
const uuid = require('uuid');

const category = {
  index(request, response) {
    const categoryId = request.params.id;
    logger.debug('Category id = ', categoryId);
    const viewData = {
      title: 'Category',
      category: categoryStore.getCategory(categoryId),
    };
    response.render('category', viewData);
  },
    deleteLink(request, response) {
    const categoryId = request.params.id;
    const linkId = request.params.linkid;
    logger.debug(`Deleting Link ${linkId} from Category ${categoryId}`);
    categoryStore.removeLink(categoryId, linkId);
    response.redirect('/category/' + categoryId);
  },
  
    addLink(request, response) {
    const categoryId = request.params.id;
    const category = categoryStore.getCategory(categoryId);
    const newLink = {
      id:request.body.id,
      title: request.body.title,
      url: request.body.url,
    };
    categoryStore.addLink(categoryId, newLink);
    response.redirect('/category/' + categoryId);
  },
};

module.exports = category;