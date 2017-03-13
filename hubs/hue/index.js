//https://www.developers.meethue.com/documentation/core-concepts
const hue = require('node-hue-api');
const HueApi = hue.HueApi;

let thisHub = {};

// for the UI, what fields are required
// const getFields = () => [];

// const findHubsThunk = callback => {
//   return () => callback();
// };

const execute = ({hub, deviceId, state, callback}) => {
  if (!thisHub[hub.hubId]) {
    const hostname = hub.url.split('//')[1].split(':')[0].split('/')[0];
    const username = "YGg7xeGD6w7Rbw7sLa8Y2qxv3rITaSM02Fym5NHk";
    const api = new HueApi(hostname, username);
    thisHub[hub.uuid] = api;
  }

  const id = Number(deviceId) + 1;
  const brightness = Number(state);
  const status = isNaN(brightness) ? state : 'on';
  const _state = {
    on: status === 'on',
    bri: brightness
  };

  thisHub[hub.uuid].setLightState(id, _state, function(err) {
      if (err) callback('setLightState:ERR - ' + err);
      callback(null, 'ok');
  });
};

const getDevicesThunk = hub => {
  return callback => {
    if (!thisHub[hub.hubId]) {
      const hostname = hub.url.split('//')[1].split(':')[0].split('/')[0];
      const username = "YGg7xeGD6w7Rbw7sLa8Y2qxv3rITaSM02Fym5NHk";
      const api = new HueApi(hostname, username);
      thisHub[hub.uuid] = api;
    }

    thisHub[hub.uuid].lights(function(err, lights) {
        if (err) callback('lights:ERR - ' + err);
        const devices = lights.lights.map(x => x.name + '_' + x.id);
        callback(null, devices);
    });
  };
};


const Hue = {
  name: "Hue",
  urlPattern: "{base}/hue/{deviceId}/{state}"
};

Hue.getDevicesThunk = getDevicesThunk;
Hue.updateUrl = undefined;
Hue.execute = execute;
//Hue.findHubsThunk = findHubsThunk;
//Hue.getFields = getFields;

module.exports = Hue;
