// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ 
  dev,
  dir: './client'
});
const handle = nextApp.getRequestHandler();

require('dotenv').config();
require('./db');

nextApp.prepare().then(() => {
  const server = express();
  server.use(bodyParser.json());
  server.use(cookieParser());

  require('./server/routes')(server, nextApp);
  require('./server/api/user')(server, nextApp);

  server.get('*', (req, res) => {
    return handle(req, res);
  });
    
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
})