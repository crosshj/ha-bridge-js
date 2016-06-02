var fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

var db;
var dbClosed = false;

var deviceModel = [
  "deviceId INTEGER PRIMARY KEY",
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
  var values = [
    device.deviceId || null,
    device.name || '',
    device.level || '',
    device.deviceType || '',
    device.offUrl || '',
    device.onUrl || '',
    device.httpVerb || 'GET',
    device.contentType || '',
    device.contentBody || ''
  ];
  var template = values.map(function(){return '?'}).join(',');
  var statement = 'INSERT INTO devices ' + 'VALUES (' + template + ')';
  var stmt = db.prepare(statement, callback);
  stmt.all(values);
  stmt.finalize();
}

function readDevice(deviceId, callback) {
  var statement = 'SELECT * FROM devices WHERE deviceId = (?)';
  db.all(statement, [deviceId], callback);
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
      callback();
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
