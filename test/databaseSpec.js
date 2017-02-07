/*
this is more an integration test for this app and SQLLite DB
*/

var chai = require('chai');
var expect = chai.expect;

describe('SQLite Database - Devices', function () {
  var db;
  var dbFileName;
  var deviceUUID = '3dcc9eb0-2a71-11e6-a3a3-73120746dc1b';

  before(function(done) {
    var config = { databaseFileName: ':memory:'};
    db = require('../database')(config, done);
  });

  after(function() {
      db.exit(quiet=true);
  });

  it('creates a device', function (done) {
    //arrange
    var device = {
      deviceId: 234,
      status: 'off',
      uuid: deviceUUID,
      name: 'foo',
      level: '100',
      deviceType: 'light',
      offUrl: 'http://www.foo.com/off',
      onUrl: 'http://www.foo.com/on',
      httpVerb: 'GET',
      contentType: 'foo',
      contentBody: 'foo'
    };

    //act
    db.createDevice(device, callback);

    //assert
    function callback(err) {
      db.instance.all("select * from devices", function(err, rows){
        var lastItem = rows[rows.length-1];
        ///lastItem.deviceId = lastItem.deviceId.toString();
        expect(lastItem).to.deep.equal(device);
        done();
      })
    }
  });

  it('creates a device with automatic Id', function (done) {
    //arrange
    var device = {
      name: 'fooAuto',
      status: 'off',
      level: '100',
      deviceType: 'light',
      offUrl: 'http://www.foo.com/off',
      onUrl: 'http://www.foo.com/on',
      httpVerb: 'GET',
      contentType: 'foo',
      contentBody: 'foo'
    };

    //act
    db.createDevice(device, callback);

    //assert
    function callback(err) {
      db.instance.all("select * from devices where name = 'fooAuto'", function(err, rows){
        var lastItem = rows[rows.length-1];
        expect(rows.length).to.equal(1);
        done();
      })
    }
  });

  it('reads device(s) by id', function (done) {
    //arrange
    var device = {
      deviceId: 234,
      status: 'off',
      uuid: deviceUUID,
      name: 'foo',
      level: '100',
      deviceType: 'light',
      offUrl: 'http://www.foo.com/off',
      onUrl: 'http://www.foo.com/on',
      httpVerb: 'GET',
      contentType: 'foo',
      contentBody: 'foo'
    }; // use inserted item from previous step

    //act
    db.readDevice(device.uuid, callback);

    //assert
    function callback(err, rows) {
      var lastItem = rows[rows.length-1];
      expect(lastItem).to.deep.equal(device);
      done();
    }
  });

  it('reads all devices when id not specified', function (done) {
    //arrange

    //act
    db.readDevice(null, callback);

    //assert
    function callback(err, rows) {
      expect(rows.length).to.equal(2);
      done();
    }
  });

  it('updates device(s) by id', function (done) {
    //arrange
    // use inserted item from previous step
    var fieldName = 'name';
    var fieldValue = 'newfoo';
    var deviceId = deviceUUID;

    //act
    db.updateDevice(deviceId, fieldName, fieldValue, callback);

    //assert
    function callback(err, result) {
      db.instance.all("select * from devices", function(err, rows){
        rows = rows.filter(function(item){ return item.uuid === deviceId; });
        var lastItem = rows[rows.length-1];
        expect(lastItem.name).to.equal(fieldValue);
        done();
      })
    }
  });

  it('delete device(s) by id', function (done) {
    //arrange
    // use inserted item from previous step
    var deviceId = deviceUUID;

    //act
    db.deleteDevice(deviceId, callback);

    //assert
    function callback(err, result) {
      db.instance.all("select * from devices", function(err, rows){
        rows = rows.filter(function(item){ return item.deviceId === deviceId; });
        expect(rows.length).to.equal(0);
        done();
      })
    }
  });

});
