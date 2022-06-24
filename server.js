// Bring in our dependencies
const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const routes = require('./routes');
const Settings = require("./settings");

//  Connect all our routes to our application

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true,limit: '50mb' }));
app.use(cors());
app.use('/', routes);

// Turn on that server!
app.listen(Settings.port, () => {
  console.log(`App listening on port ${Settings.port}`);
});