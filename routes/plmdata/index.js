const routes = require('express').Router();

const plmsession = require('./plmsession');
const plmseasonslist = require('./getseasonlist');
const getapperalboms = require('./getapperalboms');
const getrevisebomdata = require('./getrevisebomdata');
const getbomitems = require('./getbomitems');

routes.get('/plmsession', plmsession);

routes.post('/plmseasonslist', plmseasonslist);

routes.post('/plmapperalboms', getapperalboms);

routes.post('/plmbomdata', getrevisebomdata);

routes.post('/getbomitems', getbomitems);

module.exports = routes;