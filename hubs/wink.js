
const getDevices = () => [5];
const updateUrl = url => url;

var Wink = {
  name: "Wink",
  urlPattern: "{base}/change/{deviceId}/1/{state}"
};

Wink.getDevices = getDevices;
Wink.updateUrl = url => url;

module.exports = Wink;


/*
let thisWink = {};

// for the UI, what fields are required
const getFields = () => [];

const findHubsThunk = callback => {
  //TODO: how to find Wink hubs?
  return () => callback();
};

const WinkAPI = function(hostname, username) {
  return {
    setLightState: function(id, state, callback){
    },
    lights: function(callback){
    }
  };
}

const execute = ({hub, deviceId, state, callback}) => {
  if (!thisWink[hub.hubId]) {
    const hostname = hub.url.split('//')[1].split(':')[0].split('/')[0];
    const username = "YGg7xeGD6w7Rbw7sLa8Y2qxv3rITaSM02Fym5NHk";
    const api = new WinkApi(hostname, username);
    thisWink[hub.uuid] = api;
  }

  const id = Number(deviceId) + 1;
  const brightness = Number(state);
  const status = isNaN(brightness) ? state : 'on';
  let _state = {
    on: status === 'on'
  };
  if (status === 'on' && brightness){
    _state.bri = brightness;
  }

  thisWink[hub.uuid].setLightState(id, _state, function(err) {
      if (err) callback('setLightState:ERR - ' + err);
      callback(null, 'ok');
  });
};

const getDevicesThunk = hub => {
  return callback => {
    if (!thisWink[hub.hubId]) {
      const hostname = hub.url.split('//')[1].split(':')[0].split('/')[0];
      const username = "YGg7xeGD6w7Rbw7sLa8Y2qxv3rITaSM02Fym5NHk";
      const api = new WinkApi(hostname, username);
      thisWink[hub.uuid] = api;
    }

    thisWink[hub.uuid].lights(function(err, lights) {
        if (err) callback('lights:ERR - ' + err);
        const devices = lights.lights.map(x => x.name + '_' + x.id);
        callback(null, devices);
    });
  };
};


Wink.getDevicesThunk = getDevicesThunk;
Wink.updateUrl = undefined;
Wink.execute = execute;
Wink.findHubsThunk = findHubsThunk;
Wink.getFields = getFields;

var Wink = {
  name: "Wink",
  urlPattern: "{base}/change/{deviceId}/{state}"
};


module.exports = Wink;
*/
