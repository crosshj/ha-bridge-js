'use strict';
const getGlobalState = require('../lib/getGlobalState.js');
const listDevices = require('../lib/listDevices.js');
const updateDevice = require('../lib/updateDevice.js');

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
  this.body = getGlobalState();
};

module.exports.list = function* list(userId, lightId) {
  this.body = listDevices(lightId);
};

module.exports.update = function* update(userId, lightId) {
  this.body = updateDevice(lightId);
};
