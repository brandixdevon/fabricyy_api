const routes = require('express').Router();

const createnewyy = require('./newyy');

const listofyy = require('./listofyy');

const uploadolr = require('./uploadolr');

const addplmcolordata = require('./addplmcolordata');

const addplmitemdata = require('./addplmitemdata');

const getplmitemsindb = require('./getplmitemsindb');

const updateorderdate = require('./updateorderdate');

const getiteminbom = require('./getiteminbom');

const getsizeinbom = require('./getsizeinbom');

const updatebomitemdata = require('./updatebomitemdata');

const olritemprocess = require('./olritemprocess');

const olrlineprocess = require('./olrlineprocess');

const getolrdata = require('./getolrdata');

const getolrsizes = require('./getolrsizes');

const updatesizeitemdata = require('./updatesizeitemdata');

const updateyyplmdata = require('./updateyyplmdata');

const getplmcolorways = require('./getplmcolorways');

const syncgraphics = require('./syncgraphics');

const syncdyewash = require('./syncdyewash');

const plmlineprocess = require('./plmlineprocess');

const getplmbomitems = require('./getplmbomitems');

routes.post('/createyy', createnewyy);

routes.post('/listofyy', listofyy);

routes.post('/uploadolr', uploadolr);

routes.post('/addplmcolordata', addplmcolordata);

routes.post('/addplmitemdata', addplmitemdata);

routes.get('/getplmitemsindb/:fabyyid', getplmitemsindb);

routes.post('/updateorderdate', updateorderdate);

routes.get('/getiteminbom/:itemid', getiteminbom);

routes.get('/getsizeinbom/:itemid', getsizeinbom);

routes.post('/updatebomitemdata', updatebomitemdata);

routes.get('/olritemprocess/:fabyyid', olritemprocess);

routes.get('/olrlineprocess/:fabyyid', olrlineprocess);

routes.get('/getolrdata/:fabyyid', getolrdata);

routes.get('/getolrsizes/:fabyyid', getolrsizes);

routes.post('/updatesizeitemdata', updatesizeitemdata);

routes.post('/updateyyplmdata', updateyyplmdata);

routes.get('/getplmcolorways/:fabyyid', getplmcolorways);

routes.get('/syncgraphics/:fabyyid', syncgraphics);

routes.get('/syncdyewash/:fabyyid', syncdyewash);

routes.get('/plmlineprocess/:fabyyid', plmlineprocess);

routes.get('/getplmbomitems/:fabyyid', getplmbomitems);

module.exports = routes;