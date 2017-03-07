import {HueApi, lightState} from "node-hue-api";

//const findHubs = () => {};

const displayResult = result => {
    console.log(JSON.stringify(result, null, 2)); //eslint-disable-line no-console
};

const hostname = "192.168.2.129"; //TODO
const username = "08a902b95915cdd9b75547cb50892dc4"; //TODO

const api = new HueApi(hostname, username);

api.getConfig(function(err, config) {
    if (err) throw err;
    displayResult(config);
});

api.lights(function(err, lights) {
    if (err) throw err;
    displayResult(lights);
});

const state = lightState.create().on().white(500, 100);
const deviceId = 5;
api.setLightState(deviceId, state, function(err, lights) {
    if (err) throw err;
    displayResult(lights);
});

// ----------------------------------------------------------------------------
let thisHub = {};

const create = () => {};
const getDevices = () => {};

const execute = ({hub, deviceId, state, callback}) => {
  const ip = hub.url.split('//')[1].split(':')[0];
  const port = hub.url.split('//')[1].split(':')[1];
  const brightness = Number(state);
  const status = isNaN(brightness) ? state : 'on';
  const zone = deviceId;

  if (!thisHub[hub.hubId]) thisHub[hub.hubId] = create({ip, port});
  thisHub[hub.hubId][status]({zone, brightness, callback});
};

const Hue = {
  name: "Hue",
  urlPattern: "{base}/milights/{deviceId}/{state}"
};

Hue.getDevices = getDevices;
Hue.updateUrl = undefined;
Hue.execute = execute;

module.exports = Hue;
