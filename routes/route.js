const routes = require('express').Router(); //now routes allows us to create diff routes in this route file
const controller = require('../controller/controller.js');
  
routes.route('/api/categories')
  //.get(controller.create_Categories/*(req, res) => res.json("Get request from categories")*/);
  .post(controller.create_Categories) //used earlier, (req, res) => res.json("Get request from categories") is a callback function that sends a response to the client //.get changed to .post
  .get(controller.get_Categories) 

routes.route('/api/transaction')
  .post(controller.create_Transaction) 
  .get(controller.get_Transaction)
  .delete(controller.delete_Transaction)

routes.route('/api/labels')
  .get(controller.get_Labels)

module.exports = routes; //export the routes so that it can be used in serverfe.js
