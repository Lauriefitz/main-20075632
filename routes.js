'use strict';

const express = require('express');
const router = express.Router();

const start = require('./controllers/start');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const category = require('./controllers/category.js');
const accounts = require ('./controllers/accounts.js');

router.get('/dashboard/deleteallpictures', dashboard.deleteAllPictures);
router.get('/dashboard/deletepicture', dashboard.deletePicture);
router.post('/dashboard/uploadpicture', dashboard.uploadPicture);

router.get('/dashboard', dashboard.index);

router.get('/about', about.index);
router.post('/addmessage', about.addMessage);

router.get('/category/:id', category.index);
router.get('/category/:id/deletelink/:linkid', category.deleteLink);
router.get('/dashboard/deletecategory/:id', dashboard.deleteCategory);
router.post('/category/:id/addlink', category.addLink);
router.post('/dashboard/addcategory', dashboard.addCategory);

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);



module.exports = router;