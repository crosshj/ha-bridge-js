var milight = require('./milight/');

var thisHub = undefined;

// TODO: query milight for number of devices ??
//const getDevices = () => [0, 1, 2, 3, 4];
const getDevices = () => [0]; //All

const updateUrl = undefined;

const execute = ({hub, deviceId, state, callback}) => {
  const ip = hub.url.split('//')[1].split(':')[0];
  const port = hub.url.split('//')[1].split(':')[1];
  const brightness = Number(state);
  const status = isNaN(brightness) ? state : 'on';
  const zone = deviceId;
  console.log('----\n', JSON.stringify({ip, port, status, brightness},null,'  '));


  if (!thisHub) thisHub = milight.create({ip, port});
  thisHub[status]({zone, brightness, callback});
};

//base is the hub base
//deviceId is got from getDevices
//state is sent by echo
const Milight = {
  name: "Milight",
  urlPattern: "{base}/milights/{deviceId}/{state}"
};

Milight.getDevices = getDevices;
Milight.updateUrl = updateUrl;
Milight.execute = execute;

module.exports = Milight;
