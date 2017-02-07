var fs = require("fs");
var async = require('async');
const Guid = require('node-uuid');
const sqlite3 = require("sqlite3").verbose();

var db;
var dbClosed = false;

var deviceModel = [
  "deviceId INTEGER PRIMARY KEY",
  "status TEXT",
  "uuid TEXT",
  "name TEXT",
  "level TEXT",
  "deviceType TEXT",
  "offUrl TEXT",
  "onUrl TEXT",
  "httpVerb TEXT",
  "contentType TEXT",
  "contentBody TEXT"
];
var deviceFields = deviceModel.map(x => x.split(' ')[0]);

var hubModel = [
  "hubId INTEGER PRIMARY KEY",
  "uuid TEXT",
  "name TEXT",
  "url TEXT",
  "type TEXT"
];
var hubFields = hubModel.map(x => x.split(' ')[0]);

function validateUUID(str) {
  return /[0-9a-f]{22}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(str);
}

function exitHandler(quiet) {
  if (dbClosed){ return; }
  if (!quiet) console.log('Closing database...')
  db.close();
  dbClosed = true;
}

// --- DEVICES -----------------------------------------------------------------

function createDevice(device, callback) {
  //TODO: validate device before creating
  device = device || {};
  device.uuid = validateUUID(device.uuid)
    ? device.uuid
    : Guid.v1();
  var values = [
    device.deviceId || null,
    device.status || "off",
    device.uuid,
    device.name || '',
    device.level || 100,
    device.deviceType || '',
    device.offUrl || '',
    device.onUrl || '',
    device.httpVerb || 'GET',
    device.contentType || '',
    device.contentBody || ''
  ];
  var template = values.map(function(){return '?'}).join(',');
  var statement = 'INSERT INTO devices ' + 'VALUES (' + template + ')';
  //TODO: would be nice to return id of just created device, as below
  //statement += "; SELECT last_insert_rowid() AS rowid FROM devices LIMIT 1";
  var stmt = db.prepare(statement);
  stmt.run(values, callback);
  stmt.finalize();
}

function readDevice(deviceId, callback) {
  var statement = 'SELECT * FROM devices'
  const deviceIdValid = !!deviceId && validateUUID(deviceId);
  statement += deviceIdValid
    ? ' WHERE uuid = "' + deviceId + '"'
    : '';
  const args = [];
  db.all(statement, args, callback);
}

function updateDevice(deviceId, fieldName, fieldValue, callback) {
  var statement = 'UPDATE devices SET "'+fieldName+'" = "'+fieldValue+'" WHERE uuid = "' + deviceId + '"';
  db.all(statement, [], callback);
}

function deleteDevice(deviceId, callback) {
  var statement = 'DELETE FROM devices WHERE uuid = "' + deviceId + '"';
  db.all(statement, [], callback);
}

// --- HUBS --------------------------------------------------------------------

function createHub(hub, callback) {
  //TODO: validate device before creating
  hub = hub || {};
  hub.uuid = validateUUID(hub.uuid)
    ? hub.uuid
    : Guid.v1();
  var values = [
    hub.hubId || null,
    hub.uuid,
    hub.name || '',
    hub.url || '',
    hub.type || ''
  ];
  var template = values.map(function(){return '?'}).join(',');
  var statement = 'INSERT INTO hubs ' + 'VALUES (' + template + ')';
  //TODO: would be nice to return id of just created device, as below
  //statement += "; SELECT last_insert_rowid() AS rowid FROM devices LIMIT 1";
  var stmt = db.prepare(statement);
  stmt.run(values, callback);
  stmt.finalize();
}

function readHub(hubId, callback) {
  var statement = 'SELECT * FROM hubs'
  const hubIdValid = !!hubId && validateUUID(hubId);
  statement += hubIdValid
    ? ' WHERE hubId = "' + hubId + '"'
    : '';
  const args = [];
  db.all(statement, args, callback);
}

function updateHub(hubId, fieldName, fieldValue, callback) {
  var statement = 'UPDATE devices SET "'+fieldName+'" = "'+fieldValue+'" WHERE hubId = "' + hubId + '"';
  db.all(statement, [], callback);
}

function deleteHub(hubId, callback) {
  var statement = 'DELETE FROM hubs WHERE hubId = "' + hubId + '"';
  db.all(statement, [], callback);
}

function initDatabase(config, callback) {
  if (!callback){
    callback = (err, result) => {
      if(err){ return console.log('initDatabase error:\n', err); }
      console.log('initDatabase result:\n', result);
    };
  }
  config = config || {};
  var file = require('path').join(__dirname, config.databaseFileName);
  var exists = false;
  if (file !== ':memory:') {
    exists = fs.existsSync(file);
  }

  //do something when app is closing
  process.on('exit', exitHandler.bind(null));

  //catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null));

  if(!exists && file !== ':memory:') {
    console.log("Creating DB file.");
    fs.openSync(file, "w");
  }

  db = new sqlite3.Database(file);

  db.serialize(() => {
    db.all("select name from sqlite_master where type='table'", function (err, tables) {
        if (err) { callback(err); }
        var tableCreators = []

        // add devices table if not present
        if(!tables.find(x => x.name === 'devices')){
          tableCreators.push(devicesTableCreateCallback => {
            var statement = "CREATE TABLE devices (" + deviceModel.join(', ') + ")";
            db.run(statement, [], devicesTableCreateCallback);
          })
        }
        if(!tables.find(x => x.name === 'hubs')){
          tableCreators.push(hubTableCreateCallback => {
            var statement = "CREATE TABLE hubs (" + hubModel.join(', ') + ")";
            db.run(statement, [], hubTableCreateCallback);
          })
        }
        async.series(tableCreators, callback);
    });
  });

  return {
    exit: exitHandler,
    instance: db,
    createDevice,
    readDevice,
    updateDevice,
    deleteDevice,
    createHub,
    readHub,
    updateHub,
    deleteHub
  };
}

module.exports = initDatabase;
