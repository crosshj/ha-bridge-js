'use strict';
const route = require('koa-route');
const koa = require('koa');
let koaBodyParser = require('koa-bodyparser');
let koaStatic = require('koa-static');
const app = module.exports = koa();
const upnpListener = require('./lib/upnpListener');

//controllers
const devices = require('./controllers/devices');
const emulator = require('./controllers/emulator');
const upnp = require('./controllers/upnp');

app.use(koaBodyParser());

// serve files in public folder (css, js etc)
app.use(koaStatic(__dirname + '/public'));

// user interface to modify devices stored internally
app.use(route.post('/api/devices', devices.create));
app.use(route.get('/api/devices', devices.find));
app.use(route.put('/api/devices/:lightId', devices.update));
app.use(route.del('/api/devices/:lightId', devices.remove));
app.use(route.get('/api/devices/:lightId', devices.find));

// emulate the Hue Hub
app.use(route.post('/(.*)', emulator.postwildcard));
app.use(route.get('/api/:userId', emulator.root));
app.use(route.get('/api/:userId/lights', emulator.list));
app.use(route.get('/api/:userId/lights/:lightId', emulator.list));
app.use(route.put('/api/:userId/lights/:lightId/state', emulator.update));
app.use(route.get('/upnp/:deviceId/setup.xml', upnp.setup));

if (!module.parent) {
  var server = app.listen(80);
  require('./lib/win-die')(server); //lame, lame, lame
  console.log('listening on port 80');
}
