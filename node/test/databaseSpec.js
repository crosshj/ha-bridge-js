/*
this is more an integration test for this app and SQLLite DB
*/

var chai = require('chai');
var expect = chai.expect;

describe('SQLLite Database', function () {
  var db;
  var dbFileName;

  before(function(done) {
    db = require('../database')({ fileName: ':memory:'}, done);
  });

  after(function() {
      db.exit(quiet=true);
  });

  it('creates a device', function (done) {
    //arrange
    var device = {
      deviceId: '234',
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
        expect(lastItem).to.deep.equal(device);
        done();
      })
    }
  });

  it('reads device(s) by id', function (done) {
    //arrange
    var device = {
      deviceId: '234',
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
    db.readDevice(device.deviceId, callback);

    //assert
    function callback(err, rows) {
      var lastItem = rows[rows.length-1];
      expect(lastItem).to.deep.equal(device);
      done();
    }
  });

  it('updates device(s) by id', function (done) {
    //arrange
    // use inserted item from previous step
    var fieldName = 'name';
    var fieldValue = 'newfoo';
    var deviceId = '234';

    //act
    db.updateDevice(deviceId, fieldName, fieldValue, callback);

    //assert
    function callback(err, result) {
      db.instance.all("select * from devices", function(err, rows){
        rows = rows.filter(function(item){ return item.deviceId === deviceId; });
        var lastItem = rows[rows.length-1];
        expect(lastItem.name).to.equal(fieldValue);
        done();
      })
    }
  });

  it('delete device(s) by id', function (done) {
    //arrange
    // use inserted item from previous step
    var deviceId = '234';

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
