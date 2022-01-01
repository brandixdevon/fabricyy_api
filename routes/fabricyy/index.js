const routes = require('express').Router();

const createnewyy = require('./newyy');

const listofyy = require('./listofyy');

const uploadolr = require('./uploadolr');

const addplmcolordata = require('./addplmcolordata');

const addplmitemdata = require('./addplmitemdata');

routes.post('/createyy', createnewyy);

routes.post('/listofyy', listofyy);

routes.post('/uploadolr', uploadolr);

routes.post('/addplmcolordata', addplmcolordata);

routes.post('/addplmitemdata', addplmitemdata);

module.exports = routes;