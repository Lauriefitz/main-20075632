'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const categoryStore = {

  store: new JsonStore('./models/category-store.json', { categoryCollection: [] }),
  collection: 'categoryCollection',

  getAllCategories() {
    return this.store.findAll(this.collection);
  },

  getCategory(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addCategory(category) {
    this.store.add(this.collection, category);
  },

  removeCategory(id) {
    const category = this.getCategory(id);
    this.store.remove(this.collection, category);
  },

  removeAllCategory() {
    this.store.removeAll(this.collection);
  },

  addLink(id, link) {
    const category = this.getCategory(id);
    category.links.push(link);
  },
  
  removeLink(id, linkId) {
    const category = this.getCategory(id);
    const links = category.links;
    _.remove(links, { id: linkId});
  },
  
   getUserCategories(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
};

module.exports = categoryStore;