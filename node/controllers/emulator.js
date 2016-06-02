'use strict';
const getGlobalState = require('../lib/getGlobalState.js');
const listDevices = require('../lib/listDevices.js');
const updateDevice = require('../lib/updateDevice.js');
const findThunk = require('./devices').findThunk;

function getEmulatedDevice(device) {
  var emulated = {
    "state": {
      "on": false,
      "bri": 254,
      "hue": 15823,
      "sat": 88,
      "effect": "none",
      "ct": 313,
      "alert": "none",
      "colormode": "ct",
      "reachable": true,
      "xy": [0.4255, 0.3998]
    },
    "type": "Extended color light",
    "name": device.name,
    "modelid": "LCT001",
    "manufacturername": "Philips",
    "uniqueid": device.uuid,
    "swversion": "65003148",
    "pointsymbol": {
      "1": "none",
      "2": "none",
      "3": "none",
      "4": "none",
      "5": "none",
      "6": "none",
      "7": "none",
      "8": "none"
    }
  };
  return emulated;
}

module.exports.wildcard = function* wildcard(path, next) {
  yield next;
};

module.exports.postwildcard = function* postwildcard(path, next) {
  // NOTE: this is probably not necessary
  this.body = {
    'success': {
      "username": "lights"
    }
  }
};

module.exports.root = function* root(userId) {
  console.log('---root happened')
  try {
    var findResult = yield findThunk();
    var hueDevices = findResult.reduce(function(prev, next){
      prev[next.uuid] = getEmulatedDevice(next);
      return prev;
    }, {});
    this.body = {lights: hueDevices};
    console.log(JSON.stringify(hueDevices,null,'\t'))
  } catch (error) {
    this.body = "error finding hue devices:\n" + JSON.stringify(error, null, '\t');
  }
};

module.exports.list = function* list(userId, lightId) {
  console.log('---list happened')
  try {
    var findResult = yield findThunk(lightId);
    var hueDevices = findResult.reduce(function(prev, next){
      prev[next.uuid] = next.name;
      return prev;
    }, {});
    this.body = hueDevices;
    console.log(JSON.stringify(hueDevices,null,'\t'))
  } catch (error) {
    this.body = "error finding hue devices:\n" + JSON.stringify(error, null, '\t');
  }
};

module.exports.update = function* update(userId, lightId) {
console.log('---update happened')
  console.log(this.request.body);
  this.body = updateDevice(lightId);
};
