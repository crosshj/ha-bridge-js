const hueUpnpTemplate = require('../lib/hueUpnpTemplate.js');
const uuid = require('../config').uuid;
const urlBase = 'http://' + require('ip').address()+':80/';
const friendlyName = '(' + require('ip').address() + ')';
const filledTemplate = hueUpnpTemplate(urlBase, friendlyName, uuid);

module.exports.setup= function *setup(deviceId) {
  console.log('--- upnp setup happened')
  this.type = "application/xml";
  this.set('Server','Apache-Coyote/1.1'); //TODO: remove?
  this.set('Access-Control-Allow-Origin', '*');
  this.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  this.set('Access-Control-Max-Age', 3600);
  this.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  this.set('X-Application-Context', 'application:80');
  this.remove('Connection');
  this.body = filledTemplate;
};
