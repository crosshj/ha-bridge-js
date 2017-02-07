/*
this is more an integration test for this app and SQLLite DB
*/

var chai = require('chai');
var expect = chai.expect;

describe('SQLite Database - Hubs', function () {
  var db;
  var dbFileName;
  var hubUUID = '3dcc9eb0-2a71-11e6-a3a3-73120746dc1b';

  before(function(done) {
    var config = { databaseFileName: ':memory:'};
    db = require('../database')(config, done);
  });

  after(function() {
      db.exit(quiet=true);
  });

  it('creates a hub', function (done) {
    //arrange
    var hub = {
      hubId: 234,
      uuid: hubUUID,
      name: 'foo',
      type: 'milight',
      url: 'http://www.foo.com/{deviceId}/{deviceState}'
    };

    //act
    db.createHub(hub, callback);

    //assert
    function callback(err) {
      db.instance.all("select * from hubs", function(err, rows){
        var lastItem = rows[rows.length-1];
        ///lastItem.deviceId = lastItem.deviceId.toString();
        expect(lastItem).to.deep.equal(hub);
        done();
      })
    }
  });

  it('creates a hub with automatic Id', function (done) {
    //arrange
    var hub = {
      name: 'fooAuto',
      type: 'milight',
      url: 'http://www.foo.com/{deviceId}/{deviceState}'
    };

    //act
    db.createHub(hub, callback);

    //assert
    function callback(err) {
      db.instance.all('select * from hubs where name = "fooAuto"', function(err, rows){
        var lastItem = rows[rows.length-1];
        expect(rows.length).to.equal(1);
        done();
      })
    }
  });

  it('reads hub(s) by id', function (done) {
    //arrange
    var hub = {
      hubId: 234,
      uuid: hubUUID,
      name: 'foo',
      type: 'milight',
      url: 'http://www.foo.com/{deviceId}/{deviceState}'
    }; // use inserted item from previous step

    //act
    db.readHub(hub.uuid, callback);

    //assert
    function callback(err, rows) {
      var lastItem = rows[rows.length-1];
      expect(lastItem).to.deep.equal(hub);
      done();
    }
  });

  it('reads all hubs when id not specified', function (done) {
    //arrange

    //act
    db.readHub(null, callback);

    //assert
    function callback(err, rows) {
      expect(rows.length).to.equal(2);
      done();
    }
  });

  it('updates hub(s) by id', function (done) {
    //arrange
    // use inserted item from previous step
    var fieldName = 'name';
    var fieldValue = 'newfoo';
    var hubId = hubUUID;

    //act
    db.updateHub(hubId, fieldName, fieldValue, callback);

    //assert
    function callback(err, result) {
      db.instance.all("select * from hubs", function(err, rows){
        rows = rows.filter(function(item){ return item.uuid === hubId; });
        var lastItem = rows[rows.length-1];
        expect(lastItem.name).to.equal(fieldValue);
        done();
      })
    }
  });

  it('delete hub(s) by id', function (done) {
    //arrange
    // use inserted item from previous step
    var hubId = hubUUID;

    //act
    db.deleteHub(hubId, callback);

    //assert
    function callback(err, result) {
      db.instance.all("select * from hubs", function(err, rows){
        rows = rows.filter(function(item){ return item.uuid === hubId; });
        expect(rows.length).to.equal(0);
        done();
      })
    }
  });

});
