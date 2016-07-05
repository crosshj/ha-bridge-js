'use strict';
const updateDevice = require('../lib/updateDevice.js');
const findThunk = require('./devices').findThunk;
const getEmulatedDevice = require('../lib/getEmulatedDevice');

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
  try {
    var findResult = yield findThunk();
    var hueDevices = findResult.reduce(function(prev, next){
      prev[next.uuid] = getEmulatedDevice(next);
      return prev;
    }, {});
    this.body = {lights: hueDevices};
  } catch (error) {
    this.body = "error finding hue devices:\n" + JSON.stringify(error, null, '\t');
  }
};

module.exports.list = function* list(userId, lightId) {
  try {
    var findResult = yield findThunk(lightId);
    var hueDevices = findResult.reduce(function(prev, next){
      prev[next.uuid] = next.name;
      return prev;
    }, {});
    this.body = hueDevices;
  } catch (error) {
    this.body = "error finding hue devices:\n" + JSON.stringify(error, null, '\t');
  }
};

module.exports.update = function* update(userId, lightId) {
  const updatePayload = this.request.body;
  const updateResult = yield updateDevice(lightId, updatePayload);
  console.log(updateResult);
  this.body = updateResult;
};
