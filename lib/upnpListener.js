const uuid = require('../config').uuid;
const ssdpPort = require('../config').ssdpPort;
let serverPort = require('../config').serverPort;
var Server = require('node-ssdp').Server;

serverPort = serverPort
	? ':' + serverPort
	: '';

const location = 'http://'
  + require('ip').address()
  + serverPort
  + '/upnp/amazon-ha-bridge/setup.xml';

var options = {
  location,
  ssdpPort,
  ttl: 86400
};

var server = new Server(options);

// the following is an overrride because node-ssdp is a little too rigid here
server._respondToSearch = require('./upnpCustomResponse');
server._nls = uuid;
server.addUSN('urn:schemas-upnp-org:device:basic:1');
server.addUSN('uuid:Socket-1_0-221438K0100073::urn:Belkin:device:**\r\n\r\n');

server.start();

process.on('exit', function(){
  server.stop();
});

module.exports = server;
