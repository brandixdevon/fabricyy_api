const routes = require('express').Router();

const plmsession = require('./plmsession');
const plmseasonslist = require('./getseasonlist');
const getapperalboms = require('./getapperalboms');

routes.get('/plmsession', plmsession);

routes.post('/plmseasonslist', plmseasonslist);

routes.post('/plmapperalboms', getapperalboms);

module.exports = routes;