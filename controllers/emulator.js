'use strict';
const updateDevice = require('../lib/updateDevice.js');
const findThunk = require('./devices').findThunk;
const getEmulatedDevice = require('../lib/getEmulatedDevice');

module.exports.wildcard = function* wildcard(path, next) {
  console.log('WILDCARD: ', this.request.url);
  console.log('WILDCARD BODY: ', this.request.body);
  console.log('WILDCARD BODY: ', this.request.method);
  yield next;
};

module.exports.postwildcard = function* postwildcard(path, next) {
  console.log('WILDCARD: ', this.request.body);
  // NOTE: this is probably not necessary
  this.body = {
    'success': {
      "username": "lights"
    }
  }
};

module.exports.root = function* root(userId) {
  try {
    console.log('ROOT REQUEST: ', this.request.body);
    var findResult = yield findThunk();
    var hueDevices = findResult.reduce(function(prev, next){
      prev[next.uuid] = getEmulatedDevice(next);
      return prev;
    }, {});
    console.log("emulator.root: ", hueDevices)
    this.body = {lights: hueDevices};
  } catch (error) {
    console.log(error)
    this.body = "error finding hue devices:\n" + JSON.stringify(error, null, '\t');
  }
};

module.exports.list = function* list(userId, lightId) {
  try {
    console.log('LIST REQUEST: ', this.request.url);
    var findResult = yield findThunk(lightId);
    var hueDevices = findResult.reduce(function(prev, next){
      prev[next.uuid] = lightId ? getEmulatedDevice(next) : next.name;
      return prev;
    }, {});
    this.body = lightId ? hueDevices[lightId] : hueDevices;
    //this.body.state.on=true;
    console.log("emulator.list: ", this.body)
  } catch (error) {
    console.log(error)
    this.body = "error finding hue devices:\n" + JSON.stringify(error, null, '\t');
  }
};

module.exports.update = function* update(userId, lightId) {
  console.log('UPDATE REQUEST: ', this.request.body);
  const updatePayload = this.request.body;
  const updateResult = yield updateDevice(lightId, updatePayload);
  console.log(updateResult);
  this.body = updateResult;
};
