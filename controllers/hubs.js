'use strict';
// see http://blog.stevensanderson.com/2013/12/21/experiments-with-koa-and-javascript-generators/
const devicesCreateThunk = require('./devices').createThunk;
const devicesUpdateThunk = require('./devices').updateThunk;
const devicesFindThunk = require('./devices').findThunk;
var request = require('koa-request');

var db = function(){
  console.log('database not initialized'); //eslint-disable-line no-console
};

module.exports.attachDatabase = function(database){
  db = database;
  return module.exports;
};

function createThunk(hub) {
  return function(callback){
    db.createHub(hub, callback);
  };
}

function findThunk(hubId) {
  return function(callback){
    db.readHub(hubId, callback);
  };
}

function updateThunk(hubId, fieldName, fieldValue) {
  return function(callback){
    db.updateHub(hubId, fieldName, fieldValue, callback);
  };
}

function removeThunk(hubId) {
  return function(callback){
    db.deleteHub(hubId, callback);
  };
}

function getTemplatesThunk() {
  return function(callback){
    var normalizedPath = require("path").join(__dirname, "../hubs");
    var templates = [];
    require("fs").readdirSync(normalizedPath)
      .filter(x=>!!~x.indexOf('.js'))
      .forEach(function(file) {
        templates.push(require("../hubs/" + file));
      }
    );
    callback(null, templates);
  };
}

module.exports.createThunk = createThunk;
module.exports.findThunk = findThunk;
module.exports.updateThunk = updateThunk;
module.exports.removeThunk = removeThunk;
module.exports.getTemplatesThunk = getTemplatesThunk;

module.exports.create = function *create() {
  var hub = this.request.body;
  try {
    // create hub in database
    yield createThunk(hub);
    
    // get template from file system
    var templates = yield getTemplatesThunk();
    var hubTemplate = templates.find(x => x.name === hub.type);
    
    // get devices from template, may need to make async call
    var hubDevices = hubTemplate.getDevices && hubTemplate.getDevices();
    if (hubTemplate.getDevicesThunk){
      hubDevices = yield hubTemplate.getDevicesThunk(hub);
    }

    // create devices in database
    for (var deviceId in hubDevices) {
      const device = {
        name: hub.name + ':' + deviceId,
        onUrl: 'local-api/hubs/' + hub.name + '/' + deviceId + "/on", //TODO: should come from template more...
        offUrl: 'local-api/hubs/' + hub.name + '/' + deviceId + "/off"
      };
      yield devicesCreateThunk(device);
    }
    // done
    this.body = "hub created";
  } catch (error) {
    this.status = 400; //Bad request
    this.body = "error creating hub:\n" + JSON.stringify(error, null, '\t');
  }
};

module.exports.actions = function *actions(hubName, deviceId, state) {
  var allHubs = yield findThunk();
  var deviceName = hubName + ':' + deviceId;
  var allDevices = yield devicesFindThunk();
  var device = allDevices.find(x => x.name === deviceName);
  var hub = allHubs.find(x => x.name === hubName);
  var templates = yield getTemplatesThunk();
  var hubTemplate = templates.find(x => x.name === hub.type);

  var response;
  if(hubTemplate.execute){
    const executeThunk = ({hub, device, state, deviceId}) => callback => hubTemplate.execute({hub, device, deviceId, state, callback});
    response = yield executeThunk({hub, device, state, deviceId});
  }else{
    var translatedDeviceId = hubTemplate.getDevices && hubTemplate.getDevices()[deviceId];
    var url = hubTemplate.urlPattern
      .replace('{base}', hub.url)
      .replace('{deviceId}', translatedDeviceId || deviceId)
      .replace('{state}', state);
    hubTemplate.updateUrl && (url = hubTemplate.updateUrl(url));

    var options = {url};
    response = yield request(options);
  }
  yield devicesUpdateThunk(device.uuid, 'status', state); //lightId, field.name, field.value
  //console.log(JSON.stringify({url, response}, null, '  ')); //{url, hub, hubTemplate, deviceId, state}, null, ' '));
  this.body = response;
};

module.exports.find = function *find(hubId) {
  try {
    var findResult = yield findThunk(hubId);
    var templates = yield getTemplatesThunk();
    this.body = {
      instances: findResult,
      templates: templates
    };
  } catch (error) {
    this.status = 400; //Bad request
    this.body = "error finding hub:\n" + JSON.stringify(error, null, '\t');
  }
};

module.exports.update = function *update(hubId) {
  try {
    var currentHub = yield findThunk(hubId);
    if (!currentHub.length > 0) {
      throw "could not find hub";
    } else {
      currentHub = currentHub[0];
    }
    var updateHub = this.request.body;

    // make array of different fields
    var toUpdate = Object.keys(updateHub).reduce((all, key)=>{
      if (updateHub[key] !== currentHub[key]){
        all.push({
          name: key,
          value: updateHub[key]
        });
      }
      return all;
    }, []);

    if (toUpdate.length <= 0) {
      throw "no fields to update";
    }

    // update fields in database
    yield toUpdate.map(field => {
      return updateThunk(hubId, field.name, field.value);
    });

    this.body = "hub updated successfully";
  } catch (error) {
    this.status = 400; //Bad request
    this.body = "error updating hub:\n" + JSON.stringify(error, null, '\t');
  }
};

module.exports.remove = function *remove(hubId) {
  try {
    if (!hubId) {
      throw "no hubId specified in URL";
    }
    yield removeThunk(hubId);
    this.body = "hub deleted successfully";
  } catch(error) {
    this.status = 400; //Bad request
    this.body = "error deleting hub:\n" + JSON.stringify(error, null, '\t');
  }
};
