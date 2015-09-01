const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const http = require('http');
const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  ws: true,
});
const app = express();
const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 3000;
const publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

app.all('/db/*', function(req, res) {
  proxy.web(req, res, {
    target: 'https://glowing-carpet-4534.firebaseio.com/',
  });
});

if (!isProduction) {
  const bundle = require('./server/bundle.js');
  bundle();
  app.all('/build/*', function(req, res) {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:3001',
    });
  });
  app.all('/socket.io*', function(req, res) {
    proxy.web(req, res, {
      target: 'http://127.0.0.1:3001',
    });
  });


  proxy.on('error', function(e) {
    // Just catch it
    console.error(e);
  });

  // We need to use basic HTTP service to proxy
  // websocket requests from webpack
  const server = http.createServer(app);

  server.on('upgrade', function(req, socket, head) {
    proxy.ws(req, socket, head);
  });

  server.listen(port, function() {
    console.log('Server running on port ' + port);
  });
} else {
  // And run the server
  app.listen(port, function() {
    console.log('Server running on port ' + port);
  });
}
