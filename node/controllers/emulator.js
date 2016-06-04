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
  const updatePayload = this.request.body;
  const updateResult = yield updateDevice(lightId, updatePayload);
  console.log("update result: ", updateResult)
  this.body = updateResult;
};
