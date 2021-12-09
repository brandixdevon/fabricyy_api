const routes = require('express').Router();

const createnewyy = require('./newyy');

const listofyy = require('./listofyy');

const uploadolr = require('./uploadolr');

routes.post('/createyy', createnewyy);

routes.post('/listofyy', listofyy);

routes.post('/uploadolr', uploadolr);

module.exports = routes;