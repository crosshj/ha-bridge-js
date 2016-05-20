'use strict';
require('./win-die'); //lame, lame, lame
const route = require('koa-route');
const koa = require('koa');
const app = module.exports = koa();
const upnpListener = require('./lib/upnpListener');

//controllers
const devices = require('./controllers/devices');
const emulator = require('./controllers/emulator');
const upnp = require('./controllers/upnp');

// to modify devices stored internally
// See DeviceResource.java
app.use(route.post('/api/devices', devices.create));
app.use(route.get('/api/devices', devices.findAll));
app.use(route.put('/api/devices/:lightId', devices.update));
app.use(route.del('/api/devices/:lightId', devices.remove));
app.use(route.get('/api/devices/:lightId', devices.find));

// emulate the Hue Hub
// See HueMulator.java
//app.use(route.get('/(.*)', emulator.wildcard));
app.use(route.post('/(.*)', emulator.postwildcard));
app.use(route.get('/api/:userId', emulator.root));
app.use(route.get('/api/:userId/lights', emulator.list));
app.use(route.get('/api/:userId/lights/:lightId', emulator.list));
app.use(route.put('/api/:userId/lights/:lightId/state', emulator.update));

// See UpnpListener & UpnpSettingsResource
app.use(route.get('/upnp/:deviceId/setup.xml', upnp.setup));

if (!module.parent) {
  app.listen(80);
  console.log('listening on port 80');
}
