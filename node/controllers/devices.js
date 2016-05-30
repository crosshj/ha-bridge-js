'use strict';
// see http://blog.stevensanderson.com/2013/12/21/experiments-with-koa-and-javascript-generators/

var db = require('../database')();

function createThunk(device) {
  return function(callback){
    db.createDevice(device, callback);
  };
}

function findThunk(deviceId) {
  return function(callback){
    db.readDevice(deviceId, callback);
  };
}

function updateThunk(deviceId, fieldName, fieldValue) {
  return function(callback){
    db.updateDevice(deviceId, fieldName, fieldValue, callback);
  };
}

function removeThunk(deviceId) {
  return function(callback){
    db.deleteDevice(deviceId, callback);
  };
}

module.exports.create = function *create() {
  var device = this.request.body;
  var createResult = yield createThunk(device);
  this.body = createResult;
};


module.exports.find= function *find(lightId) {
  var findResult = yield findThunk(lightId);
  this.body = findResult;
};

module.exports.update = function *update(lightId) {
  var fieldName = this.request.body.fieldName || '';
  var fieldValue = this.request.body.fieldValue || '';
  var updateResult = yield updateThunk(lightId, fieldName, fieldValue);
  this.body = updateResult;
};

module.exports.remove = function *remove(lightId) {
  var removeResult = yield removeThunk(lightId);
  this.body = removeResult;
};
