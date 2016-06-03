var fs = require("fs");
const Guid = require('node-uuid');
const sqlite3 = require("sqlite3").verbose();

var db;
var dbClosed = false;

var deviceModel = [
  "deviceId INTEGER PRIMARY KEY",
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

var deviceFields = [
  "deviceId",
  "uuid",
  "name",
  "level",
  "deviceType",
  "offUrl",
  "onUrl",
  "httpVerb",
  "contentType",
  "contentBody"
];

function exitHandler(quiet) {
  if (dbClosed){ return; }
  if (!quiet) console.log('Closing database...')
  db.close();
  dbClosed = true;
}

function createDevice(device, callback) {
  //TODO: validate device before creating
  device = device || {};
  device.uuid = Guid.v1();
  var values = [
    device.deviceId || null,
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
  const deviceIdValid = !!deviceId && !isNaN(deviceId);
  statement += deviceIdValid
    ? ' WHERE deviceId = (?)'
    : '';
  const args = deviceIdValid
    ? [deviceId]
    : [];
  db.all(statement, args, callback);
}

function updateDevice(deviceId, fieldName, fieldValue, callback) {
  var statement = 'UPDATE devices SET '+fieldName+' = "'+fieldValue+'" WHERE deviceId = ' + deviceId;
  db.all(statement, [], callback);
}

function deleteDevice(deviceId, callback) {
  var statement = 'DELETE FROM devices WHERE deviceId = ' + deviceId;
  db.all(statement, [], callback);
}

function initDatabase(config, callback) {
  config = config || {};
  var file = config.fileName || require('path').join(__dirname, "database.db");
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

  if(!exists) {
    var statement = "CREATE TABLE devices (" + deviceModel.join(', ') + ")";
    db.run(statement, [], function(err){
      if (err){ console.log(err); }
      if (callback) {
        callback();
      }
    });
  } else {
    if (callback) {
      setTimeout(function(){
        callback();
      }, 1);
    }
  }

  return {
    exit: exitHandler,
    instance: db,
    createDevice,
    readDevice,
    updateDevice,
    deleteDevice
  };
}

module.exports = initDatabase;
