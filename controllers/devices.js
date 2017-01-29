'use strict';
// see http://blog.stevensanderson.com/2013/12/21/experiments-with-koa-and-javascript-generators/

var db = function(){
  console.log('database not initialized');
};

module.exports.attachDatabase = function(database){
  db = database;
  return module.exports;
}

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

module.exports.createThunk = createThunk;
module.exports.findThunk = findThunk;
module.exports.updateThunk = updateThunk;
module.exports.removeThunk = removeThunk;

module.exports.create = function *create() {
  var device = this.request.body;
  try {
    yield createThunk(device);
    this.body = "device created";
  } catch (error) {
    this.status = 400; //Bad request
    this.body = "error creating device:\n" + JSON.stringify(error, null, '\t');
  }
};

module.exports.find = function *find(lightId) {
  try {
    var findResult = yield findThunk(lightId);
    this.body = findResult;
  } catch (error) {
    this.status = 400; //Bad request
    this.body = "error finding device:\n" + JSON.stringify(error, null, '\t');
  }
};

module.exports.update = function *update(lightId) {
  try {
    var currentDevice = yield findThunk(lightId);
    if (!currentDevice.length > 0) {
      throw "could not find device";
    } else {
      currentDevice = currentDevice[0];
    }
    var updateDevice = this.request.body;

    // make array of different fields
    var toUpdate = Object.keys(updateDevice).reduce((all, key)=>{
      if (updateDevice[key] !== currentDevice[key]){
        all.push({
          name: key,
          value: updateDevice[key]
        });
      }
      return all;
    }, []);

    if (toUpdate.length <= 0) {
      throw "no fields to update";
    }

    // update fields in database
    yield toUpdate.map(field => {
      return updateThunk(lightId, field.name, field.value);
    });

    this.body = "device updated successfully";
  } catch (error) {
    this.status = 400; //Bad request
    this.body = "error updating device:\n" + JSON.stringify(error, null, '\t');
  }
};

module.exports.remove = function *remove(lightId) {
  try {
    if (!lightId) {
      throw "no deviceId specified in URL"
    }
    yield removeThunk(lightId);
    this.body = "device deleted successfully";
  } catch(error) {
    this.status = 400; //Bad request
    this.body = "error deleting device:\n" + JSON.stringify(error, null, '\t');
  }
};
