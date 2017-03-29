'use strict';

const logger = require('../utils/logger');
const categoryCollection = require('../models/category-store.js');
const categoryStore = require('../models/category-store');
const accounts = require ('./accounts.js');
const userstore = require ('../models/user-store.js');
const pictureStore = require('../models/picture-store.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Bookmark Dashboard',
      user: loggedInUser,
      album: pictureStore.getAlbum(loggedInUser.id),
      category: categoryStore.getUserCategories(loggedInUser.id),
    };
    logger.info('about to render', categoryStore.getAllCategories());
    response.render('dashboard', viewData);
  },  
    deleteCategory(request, response) {
    const categoryId = request.params.id;
    logger.debug(`Deleting Category ${categoryId}`);
    categoryStore.removeCategory(categoryId);
    response.redirect('/dashboard');
  },
   addCategory(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newCategory = {
      id: request.body.id,
      userid: loggedInUser.id,
      title: request.body.title,
      links: [],
    };
    categoryStore.addCategory(newCategory);
    response.redirect('/dashboard');
  },
  
  uploadPicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.addPicture(loggedInUser.id, request.body.title, request.files.picture, function () {
      response.redirect('/dashboard');
    });
  },
  
   deleteAllPictures(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deleteAllPictures(loggedInUser.id);
    response.redirect('/dashboard');
  },

  deletePicture(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    pictureStore.deletePicture(loggedInUser.id, request.query.img);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;