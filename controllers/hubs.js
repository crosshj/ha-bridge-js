'use strict';
// see http://blog.stevensanderson.com/2013/12/21/experiments-with-koa-and-javascript-generators/

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
    require("fs").readdirSync(normalizedPath).forEach(function(file) {
      templates.push(require("../hubs/" + file));
    });
    callback(null, templates);
  };
}

module.exports.createThunk = createThunk;
module.exports.findThunk = findThunk;
module.exports.updateThunk = updateThunk;
module.exports.removeThunk = removeThunk;

module.exports.create = function *create() {
  var hub = this.request.body;
  try {
    yield createThunk(hub);
    this.body = "hub created";
  } catch (error) {
    this.status = 400; //Bad request
    this.body = "error creating hub:\n" + JSON.stringify(error, null, '\t');
  }
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
