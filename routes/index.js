const routes = require('express').Router();
const express = require('express');

const login =require('./login');
const fabricyy =require('./fabricyy');
const plmaccess =require('./plmdata');
const masterdata =require('./masterdata');

routes.use('/login',login);
routes.use('/fabricyy',fabricyy);
routes.use('/plmaccess',plmaccess);
routes.use('/masterdata',masterdata);

routes.use(express.json());

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Fabric YY Api Connected!' });
});

module.exports = routes;