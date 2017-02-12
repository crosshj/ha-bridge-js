'use strict';
const serverPort = require('./config').serverPort;
const route = require('koa-route');
const koa = require('koa');
const koaBodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const addTrailingSlashes = require('koa-add-trailing-slashes');

const app = module.exports = koa();

require('./lib/upnpListener');

const config = require('./config');
const database = require('./database')(
	config,
	()=>{}  //empty callback swallows errors
);

//controllers
const devices = require('./controllers/devices')
	.attachDatabase(database);
const emulator = require('./controllers/emulator');
const upnp = require('./controllers/upnp');

app.use(addTrailingSlashes());
app.use(koaBodyParser());

// serve files in public folder (css, js etc)
app.use(koaStatic(__dirname + '/build/client'));

// user interface to modify devices stored internally
app.use(route.post('/local-api/devices', devices.create));
app.use(route.get('/local-api/devices', devices.find));
app.use(route.put('/local-api/devices/:lightId', devices.update));
app.use(route.del('/local-api/devices/:lightId', devices.remove));
app.use(route.get('/local-api/devices/:lightId', devices.find));

// emulate the Hue Hub
app.use(route.post('/(.*)', emulator.postwildcard));
app.use(route.put('/(.*)', emulator.wildcard));
app.use(route.get('/api/:userId', emulator.root));
app.use(route.get('/api/:userId/lights', emulator.list));
app.use(route.get('/api/:userId/lights/:lightId', emulator.list));
app.use(route.put('/api/:userId/lights/:lightId/state', emulator.update));
app.use(route.get('/upnp/:deviceId/setup.xml', upnp.setup));

if (!module.parent) {
  var server = app.listen(serverPort);
  require('./lib/win-die')(server); //lame, lame, lame
  console.log('listening on port ' + serverPort); //eslint-disable-line no-console
}
