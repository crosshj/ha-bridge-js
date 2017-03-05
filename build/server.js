/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 67);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var path = __webpack_require__(3);

module.exports.uuid = '88f6698f-2c83-4393-bd03-cd54a9f8595';
module.exports.ssdpPort = '1900'; //default
module.exports.serverPort = '82';
module.exports.serverExternalPort = '82';
module.exports.serverRootDir = '';
module.exports.databaseFileName = "database.db";

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// see http://blog.stevensanderson.com/2013/12/21/experiments-with-koa-and-javascript-generators/

var db = function db() {
  console.log('database not initialized'); //eslint-disable-line no-console
};

module.exports.attachDatabase = function (database) {
  db = database;
  return module.exports;
};

function createThunk(device) {
  return function (callback) {
    db.createDevice(device, callback);
  };
}

function findThunk(deviceId) {
  return function (callback) {
    db.readDevice(deviceId, callback);
  };
}

function updateThunk(deviceId, fieldName, fieldValue) {
  return function (callback) {
    db.updateDevice(deviceId, fieldName, fieldValue, callback);
  };
}

function removeThunk(deviceId) {
  return function (callback) {
    db.deleteDevice(deviceId, callback);
  };
}

module.exports.createThunk = createThunk;
module.exports.findThunk = findThunk;
module.exports.updateThunk = updateThunk;
module.exports.removeThunk = removeThunk;

module.exports.create = regeneratorRuntime.mark(function create() {
  var device;
  return regeneratorRuntime.wrap(function create$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          device = this.request.body;
          _context.prev = 1;
          _context.next = 4;
          return createThunk(device);

        case 4:
          this.body = "device created";
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context['catch'](1);

          this.status = 400; //Bad request
          this.body = "error creating device:\n" + JSON.stringify(_context.t0, null, '\t');

        case 11:
        case 'end':
          return _context.stop();
      }
    }
  }, create, this, [[1, 7]]);
});

module.exports.find = regeneratorRuntime.mark(function find(lightId) {
  var findResult;
  return regeneratorRuntime.wrap(function find$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return findThunk(lightId);

        case 3:
          findResult = _context2.sent;

          this.body = findResult;
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2['catch'](0);

          this.status = 400; //Bad request
          this.body = "error finding device:\n" + JSON.stringify(_context2.t0, null, '\t');

        case 11:
        case 'end':
          return _context2.stop();
      }
    }
  }, find, this, [[0, 7]]);
});

module.exports.update = regeneratorRuntime.mark(function update(lightId) {
  var currentDevice, updateDevice, toUpdate;
  return regeneratorRuntime.wrap(function update$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return findThunk(lightId);

        case 3:
          currentDevice = _context3.sent;

          if (!(!currentDevice.length > 0)) {
            _context3.next = 8;
            break;
          }

          throw "could not find device";

        case 8:
          currentDevice = currentDevice[0];

        case 9:
          updateDevice = this.request.body;

          // make array of different fields

          toUpdate = Object.keys(updateDevice).reduce(function (all, key) {
            if (updateDevice[key] !== currentDevice[key]) {
              all.push({
                name: key,
                value: updateDevice[key]
              });
            }
            return all;
          }, []);

          if (!(toUpdate.length <= 0)) {
            _context3.next = 13;
            break;
          }

          throw "no fields to update";

        case 13:
          _context3.next = 15;
          return toUpdate.map(function (field) {
            return updateThunk(lightId, field.name, field.value);
          });

        case 15:

          this.body = "device updated successfully";
          _context3.next = 22;
          break;

        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3['catch'](0);

          this.status = 400; //Bad request
          this.body = "error updating device:\n" + JSON.stringify(_context3.t0, null, '\t');

        case 22:
        case 'end':
          return _context3.stop();
      }
    }
  }, update, this, [[0, 18]]);
});

module.exports.remove = regeneratorRuntime.mark(function remove(lightId) {
  return regeneratorRuntime.wrap(function remove$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;

          if (lightId) {
            _context4.next = 3;
            break;
          }

          throw "no deviceId specified in URL";

        case 3:
          _context4.next = 5;
          return removeThunk(lightId);

        case 5:
          this.body = "device deleted successfully";
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4['catch'](0);

          this.status = 400; //Bad request
          this.body = "error deleting device:\n" + JSON.stringify(_context4.t0, null, '\t');

        case 12:
        case 'end':
          return _context4.stop();
      }
    }
  }, remove, this, [[0, 8]]);
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("ip");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
// see http://blog.stevensanderson.com/2013/12/21/experiments-with-koa-and-javascript-generators/

var devicesCreateThunk = __webpack_require__(1).createThunk;
var devicesUpdateThunk = __webpack_require__(1).updateThunk;
var devicesFindThunk = __webpack_require__(1).findThunk;
var request = __webpack_require__(13);

var db = function db() {
  console.log('database not initialized'); //eslint-disable-line no-console
};

module.exports.attachDatabase = function (database) {
  db = database;
  return module.exports;
};

function createThunk(hub) {
  return function (callback) {
    db.createHub(hub, callback);
  };
}

function findThunk(hubId) {
  return function (callback) {
    db.readHub(hubId, callback);
  };
}

function updateThunk(hubId, fieldName, fieldValue) {
  return function (callback) {
    db.updateHub(hubId, fieldName, fieldValue, callback);
  };
}

function removeThunk(hubId) {
  return function (callback) {
    db.deleteHub(hubId, callback);
  };
}

function getTemplatesThunk() {
  return function (callback) {
    var normalizedPath = __webpack_require__(3).join(__dirname, "../hubs");
    var templates = [];
    __webpack_require__(11).readdirSync(normalizedPath).forEach(function (file) {
      templates.push(__webpack_require__(18)("./" + file));
    });
    callback(null, templates);
  };
}

module.exports.createThunk = createThunk;
module.exports.findThunk = findThunk;
module.exports.updateThunk = updateThunk;
module.exports.removeThunk = removeThunk;
module.exports.getTemplatesThunk = getTemplatesThunk;

module.exports.create = regeneratorRuntime.mark(function create() {
  var hub, templates, hubTemplate, hubDevices, deviceId, device;
  return regeneratorRuntime.wrap(function create$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          hub = this.request.body;
          _context.prev = 1;
          _context.next = 4;
          return createThunk(hub);

        case 4:
          _context.next = 6;
          return getTemplatesThunk();

        case 6:
          templates = _context.sent;
          hubTemplate = templates.find(function (x) {
            return x.name === hub.type;
          });
          hubDevices = hubTemplate.getDevices && hubTemplate.getDevices();
          _context.t0 = regeneratorRuntime.keys(hubDevices);

        case 10:
          if ((_context.t1 = _context.t0()).done) {
            _context.next = 17;
            break;
          }

          deviceId = _context.t1.value;
          device = {
            name: hub.name + ':' + deviceId,
            onUrl: 'local-api/hubs/' + hub.name + '/' + deviceId + "/on", //TODO: should come from template more...
            offUrl: 'local-api/hubs/' + hub.name + '/' + deviceId + "/off"
          };
          _context.next = 15;
          return devicesCreateThunk(device);

        case 15:
          _context.next = 10;
          break;

        case 17:
          this.body = "hub created";
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t2 = _context['catch'](1);

          this.status = 400; //Bad request
          this.body = "error creating hub:\n" + JSON.stringify(_context.t2, null, '\t');

        case 24:
        case 'end':
          return _context.stop();
      }
    }
  }, create, this, [[1, 20]]);
});

module.exports.actions = regeneratorRuntime.mark(function actions(hubName, deviceId, state) {
  var allHubs, deviceName, allDevices, device, hub, templates, hubTemplate, url, options, response;
  return regeneratorRuntime.wrap(function actions$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return findThunk();

        case 2:
          allHubs = _context2.sent;
          deviceName = hubName + ':' + deviceId;
          _context2.next = 6;
          return devicesFindThunk();

        case 6:
          allDevices = _context2.sent;
          device = allDevices.find(function (x) {
            return x.name === deviceName;
          });
          hub = allHubs.find(function (x) {
            return x.name === hubName;
          });
          _context2.next = 11;
          return getTemplatesThunk();

        case 11:
          templates = _context2.sent;
          hubTemplate = templates.find(function (x) {
            return x.name === hub.type;
          });
          url = hubTemplate.urlPattern.replace('{base}', hub.url).replace('{deviceId}', deviceId).replace('{state}', state);
          options = { url: url };
          _context2.next = 17;
          return request(options);

        case 17:
          response = _context2.sent;
          _context2.next = 20;
          return devicesUpdateThunk(device.uuid, 'status', state);

        case 20:
          //lightId, field.name, field.value
          //console.log(JSON.stringify({url, response}, null, '  ')); //{url, hub, hubTemplate, deviceId, state}, null, ' '));
          this.body = response;

        case 21:
        case 'end':
          return _context2.stop();
      }
    }
  }, actions, this);
});

module.exports.find = regeneratorRuntime.mark(function find(hubId) {
  var findResult, templates;
  return regeneratorRuntime.wrap(function find$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return findThunk(hubId);

        case 3:
          findResult = _context3.sent;
          _context3.next = 6;
          return getTemplatesThunk();

        case 6:
          templates = _context3.sent;

          this.body = {
            instances: findResult,
            templates: templates
          };
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3['catch'](0);

          this.status = 400; //Bad request
          this.body = "error finding hub:\n" + JSON.stringify(_context3.t0, null, '\t');

        case 14:
        case 'end':
          return _context3.stop();
      }
    }
  }, find, this, [[0, 10]]);
});

module.exports.update = regeneratorRuntime.mark(function update(hubId) {
  var currentHub, updateHub, toUpdate;
  return regeneratorRuntime.wrap(function update$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return findThunk(hubId);

        case 3:
          currentHub = _context4.sent;

          if (!(!currentHub.length > 0)) {
            _context4.next = 8;
            break;
          }

          throw "could not find hub";

        case 8:
          currentHub = currentHub[0];

        case 9:
          updateHub = this.request.body;

          // make array of different fields

          toUpdate = Object.keys(updateHub).reduce(function (all, key) {
            if (updateHub[key] !== currentHub[key]) {
              all.push({
                name: key,
                value: updateHub[key]
              });
            }
            return all;
          }, []);

          if (!(toUpdate.length <= 0)) {
            _context4.next = 13;
            break;
          }

          throw "no fields to update";

        case 13:
          _context4.next = 15;
          return toUpdate.map(function (field) {
            return updateThunk(hubId, field.name, field.value);
          });

        case 15:

          this.body = "hub updated successfully";
          _context4.next = 22;
          break;

        case 18:
          _context4.prev = 18;
          _context4.t0 = _context4['catch'](0);

          this.status = 400; //Bad request
          this.body = "error updating hub:\n" + JSON.stringify(_context4.t0, null, '\t');

        case 22:
        case 'end':
          return _context4.stop();
      }
    }
  }, update, this, [[0, 18]]);
});

module.exports.remove = regeneratorRuntime.mark(function remove(hubId) {
  return regeneratorRuntime.wrap(function remove$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;

          if (hubId) {
            _context5.next = 3;
            break;
          }

          throw "no hubId specified in URL";

        case 3:
          _context5.next = 5;
          return removeThunk(hubId);

        case 5:
          this.body = "hub deleted successfully";
          _context5.next = 12;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5['catch'](0);

          this.status = 400; //Bad request
          this.body = "error deleting hub:\n" + JSON.stringify(_context5.t0, null, '\t');

        case 12:
        case 'end':
          return _context5.stop();
      }
    }
  }, remove, this, [[0, 8]]);
});
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("statuses");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Hue = {
  name: "Hue",
  urlPattern: "{base}/hue-DUMMY/{deviceId}/{state}"
};

module.exports = Hue;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// TODO: query milight for number of devices ??
//const getDevices = () => [0, 1, 2, 3, 4];
var getDevices = function getDevices() {
  return [0];
}; //All

var updateUrl = function updateUrl(url) {
  //NOTE: this really does nothing, but it's a good example
  var brightness = url.match(/([^\/]*)$/g)[0];
  var newBrightness = brightness; //NOTE: change to some different value
  var newUrl = url.replace(new RegExp(brightness + '$'), newBrightness);
  return newUrl;
};

//base is the hub base
//deviceId is got from getDevices
//state is sent by echo
var Milight = {
  name: "Milight",
  urlPattern: "{base}/milights/{deviceId}/{state}"
};

Milight.getDevices = getDevices;
Milight.updateUrl = updateUrl;

module.exports = Milight;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var devices = [{ url: '192.168.1.213' }];
var getDevices = function getDevices() {
  return devices.map(function (device, index) {
    return index;
  });
};

var updateUrl = function updateUrl(url) {
  var deviceId = url.split('wifiplug/')[1].split('/')[0];
  var state = url.split('wifiplug/')[1].split('/')[1];
  var newUrl = "http://" + devices[deviceId].url + '/' + state;
  return newUrl;
};

var WifiPlug = {
  name: "WifiPlug",
  urlPattern: "{base}/wifiplug/{deviceId}/{state}"
};

WifiPlug.getDevices = getDevices;
WifiPlug.updateUrl = updateUrl;

module.exports = WifiPlug;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Wink = {
  name: "Wink",
  urlPattern: "{base}/wink-DUMMY/{deviceId}/{state}"
};

module.exports = Wink;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("koa-is-json");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("koa-request");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("on-finished");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("type-is");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname, module) {

var serverPort = __webpack_require__(0).serverPort;
var route = __webpack_require__(53);
var koa = __webpack_require__(28);
var koaBodyParser = __webpack_require__(51);
var koaStatic = __webpack_require__(54);
var addTrailingSlashes = __webpack_require__(50);

var app = module.exports = koa();

var config = __webpack_require__(0);
var database = __webpack_require__(21)(config, function () {} //empty callback swallows errors
);

//controllers
var devices = __webpack_require__(1).attachDatabase(database);
var hubs = __webpack_require__(4).attachDatabase(database);
var emulator = __webpack_require__(19);
var upnp = __webpack_require__(20);

app.use(addTrailingSlashes());
app.use(koaBodyParser());

// serve files in public folder (css, js etc)
app.use(koaStatic(__dirname + '/build/client'));

// user interface to modify devices stored internally
app.use(route.post('/local-api/devices', devices.create));
app.use(route.get('/local-api/devices', devices.find));
app.use(route.put('/local-api/devices/:lightId', devices.update));
app.use(route.del('/local-api/devices/:lightId', devices.remove));
app.use(route.get('/local-api/devices/:lightId', devices.find));

app.use(route.post('/local-api/hubs', hubs.create));
app.use(route.get('/local-api/hubs', hubs.find));
app.use(route.get('/local-api/hubs/:hubName/:deviceId/:state', hubs.actions));
app.use(route.put('/local-api/hubs/:hubId', hubs.update));
app.use(route.del('/local-api/hubs/:hubId', hubs.remove));
app.use(route.get('/local-api/hubs/:hubId', hubs.find));

// emulate the Hue Hub
app.use(route.post('/(.*)', emulator.postwildcard));
app.use(route.put('/(.*)', emulator.wildcard));
app.use(route.get('/api/:userId', emulator.root));
app.use(route.get('/api/:userId/lights', emulator.list));
app.use(route.get('/api/:userId/lights/:lightId', emulator.list));
app.use(route.put('/api/:userId/lights/:lightId/state', emulator.update));
__webpack_require__(26);
app.use(route.get('/upnp/:deviceId/setup.xml', upnp.setup));

if (!module.parent) {
	var server = app.listen(serverPort);
	__webpack_require__(27)(server); //lame, lame, lame
	console.log('listening on port ' + serverPort); //eslint-disable-line no-console
}
/* WEBPACK VAR INJECTION */}.call(exports, "/", __webpack_require__(32)(module)))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./hue": 6,
	"./hue.js": 6,
	"./milight": 7,
	"./milight.js": 7,
	"./wifiplug": 8,
	"./wifiplug.js": 8,
	"./wink": 9,
	"./wink.js": 9
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 18;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var updateDevice = __webpack_require__(24);
var findThunk = __webpack_require__(1).findThunk;
var getEmulatedDevice = __webpack_require__(22);

var ip = __webpack_require__(2);
var baseUrl = 'http://' + ip.address();

module.exports.wildcard = regeneratorRuntime.mark(function wildcard(path, next) {
  return regeneratorRuntime.wrap(function wildcard$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('WILDCARD: ', this.request.url);
          console.log('WILDCARD BODY: ', this.request.body);
          console.log('WILDCARD BODY: ', this.request.method);
          _context.next = 5;
          return next;

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, wildcard, this);
});

module.exports.postwildcard = regeneratorRuntime.mark(function postwildcard(path, next) {
  return regeneratorRuntime.wrap(function postwildcard$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('WILDCARD: ', this.request.body);
          // NOTE: this is probably not necessary
          this.body = {
            'success': {
              "username": "lights"
            }
          };

        case 2:
        case 'end':
          return _context2.stop();
      }
    }
  }, postwildcard, this);
});

module.exports.root = regeneratorRuntime.mark(function root(userId) {
  var findResult, hueDevices;
  return regeneratorRuntime.wrap(function root$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;

          console.log('ROOT REQUEST: ', this.request.body);
          _context3.next = 4;
          return findThunk();

        case 4:
          findResult = _context3.sent;

          findResult.forEach(function (x) {
            if (x.onUrl[0] === '/') {
              x.onUrl = baseUrl + x.onUrl;
            }
            if (x.offUrl[0] === '/') {
              x.offUrl = baseUrl + x.offUrl;
            }
          });
          hueDevices = findResult.reduce(function (prev, next) {
            prev[next.uuid] = getEmulatedDevice(next);
            return prev;
          }, {});

          console.log("emulator.root: ", hueDevices);
          this.body = { lights: hueDevices };
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3['catch'](0);

          console.log(_context3.t0);
          this.body = "error finding hue devices:\n" + JSON.stringify(_context3.t0, null, '\t');

        case 15:
        case 'end':
          return _context3.stop();
      }
    }
  }, root, this, [[0, 11]]);
});

module.exports.list = regeneratorRuntime.mark(function list(userId, lightId) {
  var findResult, hueDevices;
  return regeneratorRuntime.wrap(function list$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;

          console.log('LIST REQUEST: ', this.request.url);
          _context4.next = 4;
          return findThunk(lightId);

        case 4:
          findResult = _context4.sent;

          findResult.forEach(function (x) {
            if (x.onUrl[0] === '/') {
              x.onUrl = baseUrl + x.onUrl;
            }
            if (x.offUrl[0] === '/') {
              x.offUrl = baseUrl + x.offUrl;
            }
          });
          hueDevices = findResult.reduce(function (prev, next) {
            prev[next.uuid] = lightId ? getEmulatedDevice(next) : next.name;
            return prev;
          }, {});

          this.body = lightId ? hueDevices[lightId] : hueDevices;
          //this.body.state.on=true;
          console.log("emulator.list: ", this.body);
          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4['catch'](0);

          console.log(_context4.t0);
          this.body = "error finding hue devices:\n" + JSON.stringify(_context4.t0, null, '\t');

        case 15:
        case 'end':
          return _context4.stop();
      }
    }
  }, list, this, [[0, 11]]);
});

module.exports.update = regeneratorRuntime.mark(function update(userId, lightId) {
  var updatePayload, updateResult;
  return regeneratorRuntime.wrap(function update$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          console.log('UPDATE REQUEST: ', this.request.body);
          updatePayload = this.request.body;
          _context5.next = 4;
          return updateDevice(lightId, updatePayload);

        case 4:
          updateResult = _context5.sent;

          console.log(updateResult);
          this.body = updateResult;

        case 7:
        case 'end':
          return _context5.stop();
      }
    }
  }, update, this);
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hueUpnpTemplate = __webpack_require__(23);
var uuid = __webpack_require__(0).uuid;
var serverExternalPort = __webpack_require__(0).serverExternalPort;
var serverRootDir = __webpack_require__(0).serverRootDir;

serverRootDir = serverRootDir ? serverRootDir + '/' : '';

var urlBase = 'http://' + __webpack_require__(2).address() + ':' + serverExternalPort + '/' + serverRootDir;
var friendlyName = '(' + __webpack_require__(2).address() + ')';
var filledTemplate = hueUpnpTemplate(urlBase, friendlyName, uuid);

module.exports.setup = regeneratorRuntime.mark(function setup(deviceId) {
  return regeneratorRuntime.wrap(function setup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          this.type = "application/xml";
          //this.set('Server','Apache-Coyote/1.1'); //TODO: remove?
          this.set('Access-Control-Allow-Origin', '*');
          this.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
          this.set('Access-Control-Max-Age', 3600);
          this.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
          //this.set('X-Application-Context', 'application:80');
          this.remove('Connection');
          this.body = filledTemplate;

        case 7:
        case 'end':
          return _context.stop();
      }
    }
  }, setup, this);
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

/* eslint-disable no-console */

var fs = __webpack_require__(11);
var async = __webpack_require__(34);
var Guid = __webpack_require__(58);
var sqlite3 = __webpack_require__(63).verbose();

var db;
var dbClosed = false;

var deviceModel = ["deviceId INTEGER PRIMARY KEY", "status TEXT", "uuid TEXT", "name TEXT", "level TEXT", "deviceType TEXT", "offUrl TEXT", "onUrl TEXT", "httpVerb TEXT", "contentType TEXT", "contentBody TEXT"];
//var deviceFields = deviceModel.map(x => x.split(' ')[0]);

var hubModel = ["hubId INTEGER PRIMARY KEY", "uuid TEXT", "name TEXT", "url TEXT", "type TEXT"];
//var hubFields = hubModel.map(x => x.split(' ')[0]);

function validateUUID(str) {
  return (/[0-9a-f]{22}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(str)
  );
}

function exitHandler(quiet) {
  if (dbClosed) {
    return;
  }
  if (!quiet) console.log('\nClosing database...');
  db.close();
  dbClosed = true;
}

// --- DEVICES -----------------------------------------------------------------

function createDevice(device, callback) {
  //TODO: validate device before creating
  device = device || {};
  device.uuid = validateUUID(device.uuid) ? device.uuid : Guid.v1();
  var values = [device.deviceId || null, device.status || "off", device.uuid, device.name || '', device.level || 100, device.deviceType || '', device.offUrl || '', device.onUrl || '', device.httpVerb || 'GET', device.contentType || '', device.contentBody || ''];
  var template = values.map(function () {
    return '?';
  }).join(',');
  var statement = 'INSERT INTO devices ' + 'VALUES (' + template + ')';
  //TODO: would be nice to return id of just created device, as below
  //statement += "; SELECT last_insert_rowid() AS rowid FROM devices LIMIT 1";
  var stmt = db.prepare(statement);
  stmt.run(values, callback);
  stmt.finalize();
}

function readDevice(deviceId, callback) {
  var statement = 'SELECT * FROM devices';
  var deviceIdValid = !!deviceId && validateUUID(deviceId);
  statement += deviceIdValid ? ' WHERE uuid = "' + deviceId + '"' : '';
  var args = [];
  db.all(statement, args, callback);
}

function updateDevice(deviceId, fieldName, fieldValue, callback) {
  var statement = 'UPDATE devices SET "' + fieldName + '" = "' + fieldValue + '" WHERE uuid = "' + deviceId + '"';
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
  hub.uuid = validateUUID(hub.uuid) ? hub.uuid : Guid.v1();
  var values = [hub.hubId || null, hub.uuid, hub.name || '', hub.url || '', hub.type || ''];
  var template = values.map(function () {
    return '?';
  }).join(',');
  var statement = 'INSERT INTO hubs ' + 'VALUES (' + template + ')';
  //TODO: would be nice to return id of just created device, as below
  //statement += "; SELECT last_insert_rowid() AS rowid FROM devices LIMIT 1";
  var stmt = db.prepare(statement);
  stmt.run(values, callback);
  stmt.finalize();
}

function readHub(hubId, callback) {
  var statement = 'SELECT * FROM hubs';
  var hubIdValid = !!hubId && validateUUID(hubId);
  statement += hubIdValid ? ' WHERE uuid = "' + hubId + '"' : '';
  var args = [];
  db.all(statement, args, callback);
}

function updateHub(hubId, fieldName, fieldValue, callback) {
  var statement = 'UPDATE hubs SET "' + fieldName + '" = "' + fieldValue + '" WHERE uuid = "' + hubId + '"';
  db.all(statement, [], callback);
}

function deleteHub(hubId, callback) {
  var statement = 'DELETE FROM hubs WHERE uuid = "' + hubId + '"';
  db.all(statement, [], callback);
}

// --- database general --------------------------------------------------------

function initDatabase(config, callback) {
  if (!callback) {
    callback = function callback(err, result) {
      if (err) {
        return console.log('initDatabase error:\n', err);
      }
      console.log('initDatabase result:\n', result);
    };
  }
  config = config || {};
  var file = '';
  var exists = false;
  if (config.databaseFileName !== ':memory:') {
    file = __webpack_require__(3).join(__dirname, config.databaseFileName);
    exists = fs.existsSync(file);
  } else {
    file = ':memory:';
  }

  //do something when app is closing
  process.on('exit', exitHandler.bind(null));

  //catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null));

  if (!exists && file !== ':memory:') {
    console.log("Creating DB file.");
    fs.openSync(file, "w");
  }

  db = new sqlite3.Database(file);

  db.serialize(function () {
    db.all("select name from sqlite_master where type='table'", function (err, tables) {
      if (err) {
        callback(err);
      }
      var tableCreators = [];

      // add devices table if not present
      if (!tables.find(function (x) {
        return x.name === 'devices';
      })) {
        tableCreators.push(function (devicesTableCreateCallback) {
          var statement = "CREATE TABLE devices (" + deviceModel.join(', ') + ")";
          db.run(statement, [], devicesTableCreateCallback);
        });
      }
      if (!tables.find(function (x) {
        return x.name === 'hubs';
      })) {
        tableCreators.push(function (hubTableCreateCallback) {
          var statement = "CREATE TABLE hubs (" + hubModel.join(', ') + ")";
          db.run(statement, [], hubTableCreateCallback);
        });
      }
      async.series(tableCreators, callback);
    });
  });

  return {
    exit: exitHandler,
    instance: db,
    createDevice: createDevice,
    readDevice: readDevice,
    updateDevice: updateDevice,
    deleteDevice: deleteDevice,
    createHub: createHub,
    readHub: readHub,
    updateHub: updateHub,
    deleteHub: deleteHub
  };
}

module.exports = initDatabase;
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function getEmulatedDevice(device) {
  var emulated = {
    "state": {
      "on": device.status === "on",
      "bri": 254,
      "hue": 15823,
      "sat": 88,
      "effect": "none",
      "ct": 313,
      "alert": "none",
      "colormode": "ct",
      "reachable": true,
      "xy": [0.4255, 0.3998]
    },
    "type": "Dimmable light",
    "name": device.name,
    "modelid": "HAB001",
    "manufacturername": "Philips",
    "uniqueid": device.uuid,
    "swversion": "65003148"
  };
  return emulated;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var template = "<?xml version=\"1.0\"?>\n" + "<root xmlns=\"urn:schemas-upnp-org:device-1-0\">\n" + "<specVersion>\n" + "<major>1</major>\n" + "<minor>0</minor>\n" + "</specVersion>\n" + "<URLBase>{{URL_BASE}}</URLBase>\n" + //hostname string
"<device>\n" + "<deviceType>urn:schemas-upnp-org:device:Basic:1</deviceType>\n" + "<friendlyName>Amazon-Echo-HA-Bridge {{FRIENDLY_NAME}}</friendlyName>\n" + "<manufacturer>Royal Philips Electronics</manufacturer>\n" + "<manufacturerURL>http://www.armzilla..com</manufacturerURL>\n" + "<modelDescription>Hue Emulator for Amazon Echo bridge</modelDescription>\n" + "<modelName>Philips hue bridge 2012</modelName>\n" + "<modelNumber>929000226503</modelNumber>\n" + "<modelURL>http://www.armzilla.com/amazon-echo-ha-bridge</modelURL>\n" + "<serialNumber>01189998819991197253</serialNumber>\n" + "<UDN>uuid:{{UUID}}</UDN>\n" + "<serviceList>\n" + "<service>\n" + "<serviceType>(null)</serviceType>\n" + "<serviceId>(null)</serviceId>\n" + "<controlURL>(null)</controlURL>\n" + "<eventSubURL>(null)</eventSubURL>\n" + "<SCPDURL>(null)</SCPDURL>\n" + "</service>\n" + "</serviceList>\n" + "<presentationURL>index.html</presentationURL>\n" + "<iconList>\n" + "<icon>\n" + "<mimetype>image/png</mimetype>\n" + "<height>48</height>\n" + "<width>48</width>\n" + "<depth>24</depth>\n" + "<url>hue_logo_0.png</url>\n" + "</icon>\n" + "<icon>\n" + "<mimetype>image/png</mimetype>\n" + "<height>120</height>\n" + "<width>120</width>\n" + "<depth>24</depth>\n" + "<url>hue_logo_3.png</url>\n" + "</icon>\n" + "</iconList>\n" + "</device>\n" + "</root>\n";

module.exports = function (urlBase, friendlyName, uuid) {
  var filledTemplate = template.replace("{{URL_BASE}}", urlBase).replace('{{UUID}}', uuid).replace("{{FRIENDLY_NAME}}", friendlyName);
  return filledTemplate;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable no-console*/
var request = __webpack_require__(13);
var updateThunk = __webpack_require__(1).updateThunk;
var findThunk = __webpack_require__(1).findThunk;
var hubsFindThunk = __webpack_require__(4).findThunk;
var getTemplatesThunk = __webpack_require__(4).getTemplatesThunk;
var ip = __webpack_require__(2);
var baseUrl = 'http://' + ip.address();
var serverPort = __webpack_require__(0).serverPort;

module.exports = regeneratorRuntime.mark(function _callee(deviceId, payload) {
  var status, fieldName, fieldValue, deviceState, deviceMatch, updateUrl, hubName, hubs, hub, templates, template, options, response;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('updateDevice payload:\n', payload);
          status = JSON.parse(Object.keys(payload)[0]);
          fieldName = Object.keys(status)[0] === "on" ? "status" : undefined;

          if ((status.bri || status.bri === 0) && !fieldName) {
            fieldName = 'status';
            status.on = true;
          }
          fieldValue = status["on"] ? "on" : "off";
          deviceState = [{
            'success': {}
          }];
          _context.prev = 6;

          if (fieldName) {
            _context.next = 9;
            break;
          }

          throw "could not find fieldName";

        case 9:
          _context.next = 11;
          return findThunk(deviceId);

        case 11:
          deviceMatch = _context.sent;
          updateUrl = deviceMatch[0][fieldValue + "Url"];


          if (status.bri) {
            updateUrl = updateUrl.replace(/on$/g, status.bri);
          }

          console.log('updateUrl', updateUrl);
          //TODO: this probably doesn't ever get called, see controllers/hubs

          if (!(updateUrl.indexOf('local-api') === 0)) {
            _context.next = 28;
            break;
          }

          hubName = updateUrl.split('/hubs/')[1].split('/')[0];
          _context.next = 19;
          return hubsFindThunk();

        case 19:
          hubs = _context.sent;
          hub = hubs.find(function (x) {
            return x.name === hubName;
          });
          _context.next = 23;
          return getTemplatesThunk();

        case 23:
          templates = _context.sent;
          template = templates.find(function (x) {
            return x.name === hub.type;
          });

          console.log('template', JSON.stringify(template));

          updateUrl = baseUrl + ':' + serverPort + '/' + updateUrl;
          template.updateUrl && (updateUrl = template.updateUrl(updateUrl));

        case 28:
          console.log('updateUrl', updateUrl);

          options = {
            url: updateUrl,
            headers: {}
          };
          _context.next = 32;
          return request(options);

        case 32:
          response = _context.sent;

          if (!(response.body !== 'ok')) {
            _context.next = 36;
            break;
          }

          console.log('response body of koa request to milight: ', response.body);
          throw 'milights did not return an "okay" response';

        case 36:
          _context.next = 38;
          return updateThunk(deviceId, fieldName, fieldValue);

        case 38:
          deviceState[0].success["/lights/" + deviceId + "/state/on"] = fieldValue;
          _context.next = 44;
          break;

        case 41:
          _context.prev = 41;
          _context.t0 = _context['catch'](6);

          deviceState = { error: _context.t0 };

        case 44:
          return _context.abrupt('return', deviceState);

        case 45:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this, [[6, 41]]);
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
main thing that changes here versus the node-ssdp version
is the SSDP header
*/

module.exports = function (serviceType, rinfo) {
  var self = this,
      peer = rinfo.address,
      port = rinfo.port,
      stRegex,
      acceptor;

  // unwrap quoted string
  if (serviceType[0] == '"' && serviceType[serviceType.length - 1] == '"') {
    serviceType = serviceType.slice(1, -1);
  }

  if (self._allowWildcards) {
    stRegex = new RegExp(serviceType.replace(/\*/g, '.*') + '$');
    acceptor = function acceptor(usn, serviceType) {
      return serviceType === 'ssdp:all' || stRegex.test(usn);
    };
  } else {
    acceptor = function acceptor(usn, serviceType) {
      return serviceType === 'ssdp:all' || usn === serviceType;
    };
  }

  Object.keys(self._usns).forEach(function (usn) {
    var udn = self._usns[usn];

    if (self._allowWildcards) {
      udn = udn.replace(stRegex, serviceType);
    }

    if (acceptor(usn, serviceType)) {
      var pkt = self._getSSDPHeader('200 OK', {
        'CACHE-CONTROL': 'max-age=' + self._ttl,
        'EXT': '',
        'LOCATION': self._location,
        'OPT': '"http://schemas.upnp.org/upnp/1/0/"; ns=01',
        '01-NLS': self._nls,
        'ST': serviceType === 'ssdp:all' ? usn : serviceType,
        'USN': udn
      }, true);

      self._logger('Sending a 200 OK for an M-SEARCH: %o', { 'peer': peer, 'port': port });

      var message = new Buffer(pkt);

      self._send(message, peer, port, function (err, bytes) {
        self._logger('Sent M-SEARCH response: %o', { 'message': pkt });
      });
    }
  });
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uuid = __webpack_require__(0).uuid;
var ssdpPort = __webpack_require__(0).ssdpPort;
var serverPort = __webpack_require__(0).serverPort;
var Server = __webpack_require__(57).Server;

serverPort = serverPort ? ':' + serverPort : '';

var location = 'http://' + __webpack_require__(2).address() + serverPort + '/upnp/amazon-ha-bridge/setup.xml';

var options = {
  location: location,
  ssdpPort: ssdpPort,
  ttl: 86400
};

var server = new Server(options);

// the following is an overrride because node-ssdp is a little too rigid here
server._respondToSearch = __webpack_require__(25);
server._nls = uuid;
server.addUSN('urn:schemas-upnp-org:device:basic:1');
server.addUSN('uuid:Socket-1_0-221438K0100073::urn:Belkin:device:**\r\n\r\n');

server.start();

process.on('exit', function () {
  server.stop();
});

module.exports = server;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (server) {
  // SUCKS, this is put here so control-C works in git-bash shell
  // see https://www.bountysource.com/issues/23308082-continuous-ctrl-c-freezes-bash-started-via-git-cmd
  // see http://stackoverflow.com/questions/10021373/what-is-the-windows-equivalent-of-process-onsigint-in-node-js
  if (process.platform === "win32") {
    global.lameStupid = __webpack_require__(62).createInterface({
      input: process.stdin
    });
    global.lameStupid.on("SIGINT", function () {
      process.emit("SIGINT");
    });
  }
  process.on("SIGINT", function () {
    //graceful shutdown
    process.exit();
    if (server) {
      server.close();
    }
  });
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/**
 * Module dependencies.
 */

var debug = __webpack_require__(40)('koa:application');
var Emitter = __webpack_require__(45).EventEmitter;
var compose_es7 = __webpack_require__(36);
var onFinished = __webpack_require__(14);
var response = __webpack_require__(31);
var compose = __webpack_require__(52);
var isJSON = __webpack_require__(12);
var context = __webpack_require__(29);
var request = __webpack_require__(30);
var statuses = __webpack_require__(5);
var Cookies = __webpack_require__(39);
var accepts = __webpack_require__(33);
var assert = __webpack_require__(10);
var Stream = __webpack_require__(64);
var http = __webpack_require__(47);
var only = __webpack_require__(59);
var co = __webpack_require__(35);

/**
 * Application prototype.
 */

var app = Application.prototype;

/**
 * Expose `Application`.
 */

module.exports = Application;

/**
 * Initialize a new `Application`.
 *
 * @api public
 */

function Application() {
  if (!(this instanceof Application)) return new Application();
  this.env = process.env.NODE_ENV || 'development';
  this.subdomainOffset = 2;
  this.middleware = [];
  this.proxy = false;
  this.context = Object.create(context);
  this.request = Object.create(request);
  this.response = Object.create(response);
}

/**
 * Inherit from `Emitter.prototype`.
 */

Object.setPrototypeOf(Application.prototype, Emitter.prototype);

/**
 * Shorthand for:
 *
 *    http.createServer(app.callback()).listen(...)
 *
 * @param {Mixed} ...
 * @return {Server}
 * @api public
 */

app.listen = function () {
  debug('listen');
  var server = http.createServer(this.callback());
  return server.listen.apply(server, arguments);
};

/**
 * Return JSON representation.
 * We only bother showing settings.
 *
 * @return {Object}
 * @api public
 */

app.inspect = app.toJSON = function () {
  return only(this, ['subdomainOffset', 'proxy', 'env']);
};

/**
 * Use the given middleware `fn`.
 *
 * @param {GeneratorFunction} fn
 * @return {Application} self
 * @api public
 */

app.use = function (fn) {
  if (!this.experimental) {
    // es7 async functions are not allowed,
    // so we have to make sure that `fn` is a generator function
    assert(fn && 'GeneratorFunction' == fn.constructor.name, 'app.use() requires a generator function');
  }
  debug('use %s', fn._name || fn.name || '-');
  this.middleware.push(fn);
  return this;
};

/**
 * Return a request handler callback
 * for node's native http server.
 *
 * @return {Function}
 * @api public
 */

app.callback = function () {
  if (this.experimental) {
    console.error('Experimental ES7 Async Function support is deprecated. Please look into Koa v2 as the middleware signature has changed.');
  }
  var fn = this.experimental ? compose_es7(this.middleware) : co.wrap(compose(this.middleware));
  var self = this;

  if (!this.listeners('error').length) this.on('error', this.onerror);

  return function handleRequest(req, res) {
    res.statusCode = 404;
    var ctx = self.createContext(req, res);
    onFinished(res, ctx.onerror);
    fn.call(ctx).then(function handleResponse() {
      respond.call(ctx);
    }).catch(ctx.onerror);
  };
};

/**
 * Initialize a new context.
 *
 * @api private
 */

app.createContext = function (req, res) {
  var context = Object.create(this.context);
  var request = context.request = Object.create(this.request);
  var response = context.response = Object.create(this.response);
  context.app = request.app = response.app = this;
  context.req = request.req = response.req = req;
  context.res = request.res = response.res = res;
  request.ctx = response.ctx = context;
  request.response = response;
  response.request = request;
  context.onerror = context.onerror.bind(context);
  context.originalUrl = request.originalUrl = req.url;
  context.cookies = new Cookies(req, res, {
    keys: this.keys,
    secure: request.secure
  });
  context.accept = request.accept = accepts(req);
  context.state = {};
  return context;
};

/**
 * Default error handler.
 *
 * @param {Error} err
 * @api private
 */

app.onerror = function (err) {
  assert(err instanceof Error, 'non-error thrown: ' + err);

  if (404 == err.status || err.expose) return;
  if (this.silent) return;
  // DEPRECATE env-specific logging in v2
  if ('test' == this.env) return;

  var msg = err.stack || err.toString();
  console.error();
  console.error(msg.replace(/^/gm, '  '));
  console.error();
};

/**
 * Response helper.
 */

function respond() {
  // allow bypassing koa
  if (false === this.respond) return;

  var res = this.res;
  if (res.headersSent || !this.writable) return;

  var body = this.body;
  var code = this.status;

  // ignore body
  if (statuses.empty[code]) {
    // strip headers
    this.body = null;
    return res.end();
  }

  if ('HEAD' == this.method) {
    if (isJSON(body)) this.length = Buffer.byteLength(JSON.stringify(body));
    return res.end();
  }

  // status body
  if (null == body) {
    this.type = 'text';
    body = this.message || String(code);
    this.length = Buffer.byteLength(body);
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' == typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  this.length = Buffer.byteLength(body);
  res.end(body);
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/**
 * Module dependencies.
 */

var createError = __webpack_require__(49);
var httpAssert = __webpack_require__(48);
var delegate = __webpack_require__(41);
var statuses = __webpack_require__(5);

/**
 * Context prototype.
 */

var proto = module.exports = {

  /**
   * util.inspect() implementation, which
   * just returns the JSON output.
   *
   * @return {Object}
   * @api public
   */

  inspect: function inspect() {
    return this.toJSON();
  },

  /**
   * Return JSON representation.
   *
   * Here we explicitly invoke .toJSON() on each
   * object, as iteration will otherwise fail due
   * to the getters and cause utilities such as
   * clone() to fail.
   *
   * @return {Object}
   * @api public
   */

  toJSON: function toJSON() {
    return {
      request: this.request.toJSON(),
      response: this.response.toJSON(),
      app: this.app.toJSON(),
      originalUrl: this.originalUrl,
      req: '<original node req>',
      res: '<original node res>',
      socket: '<original node socket>'
    };
  },

  /**
   * Similar to .throw(), adds assertion.
   *
   *    this.assert(this.user, 401, 'Please login!');
   *
   * See: https://github.com/jshttp/http-assert
   *
   * @param {Mixed} test
   * @param {Number} status
   * @param {String} message
   * @api public
   */

  assert: httpAssert,

  /**
   * Throw an error with `msg` and optional `status`
   * defaulting to 500. Note that these are user-level
   * errors, and the message may be exposed to the client.
   *
   *    this.throw(403)
   *    this.throw('name required', 400)
   *    this.throw(400, 'name required')
   *    this.throw('something exploded')
   *    this.throw(new Error('invalid'), 400);
   *    this.throw(400, new Error('invalid'));
   *
   * See: https://github.com/jshttp/http-errors
   *
   * @param {String|Number|Error} err, msg or status
   * @param {String|Number|Error} [err, msg or status]
   * @param {Object} [props]
   * @api public
   */

  throw: function _throw() {
    throw createError.apply(null, arguments);
  },

  /**
   * Default error handling.
   *
   * @param {Error} err
   * @api private
   */

  onerror: function onerror(err) {
    // don't do anything if there is no error.
    // this allows you to pass `this.onerror`
    // to node-style callbacks.
    if (null == err) return;

    if (!(err instanceof Error)) err = new Error('non-error thrown: ' + err);

    // delegate
    this.app.emit('error', err, this);

    // nothing we can do here other
    // than delegate to the app-level
    // handler and log.
    if (this.headerSent || !this.writable) {
      err.headerSent = true;
      return;
    }

    // unset all headers, and set those specified
    this.res._headers = {};
    this.set(err.headers);

    // force text/plain
    this.type = 'text';

    // ENOENT support
    if ('ENOENT' == err.code) err.status = 404;

    // default to 500
    if ('number' != typeof err.status || !statuses[err.status]) err.status = 500;

    // respond
    var code = statuses[err.status];
    var msg = err.expose ? err.message : code;
    this.status = err.status;
    this.length = Buffer.byteLength(msg);
    this.res.end(msg);
  }
};

/**
 * Response delegation.
 */

delegate(proto, 'response').method('attachment').method('redirect').method('remove').method('vary').method('set').method('append').access('status').access('message').access('body').access('length').access('type').access('lastModified').access('etag').getter('headerSent').getter('writable');

/**
 * Request delegation.
 */

delegate(proto, 'request').method('acceptsLanguages').method('acceptsEncodings').method('acceptsCharsets').method('accepts').method('get').method('is').access('querystring').access('idempotent').access('socket').access('search').access('method').access('query').access('path').access('url').getter('origin').getter('href').getter('subdomains').getter('protocol').getter('host').getter('hostname').getter('header').getter('headers').getter('secure').getter('stale').getter('fresh').getter('ips').getter('ip');

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/**
 * Module dependencies.
 */

var net = __webpack_require__(56);
var contentType = __webpack_require__(38);
var stringify = __webpack_require__(65).format;
var parse = __webpack_require__(60);
var qs = __webpack_require__(61);
var typeis = __webpack_require__(15);
var fresh = __webpack_require__(46);

/**
 * Prototype.
 */

module.exports = {

  /**
   * Return request header.
   *
   * @return {Object}
   * @api public
   */

  get header() {
    return this.req.headers;
  },

  /**
   * Return request header, alias as request.header
   *
   * @return {Object}
   * @api public
   */

  get headers() {
    return this.req.headers;
  },

  /**
   * Get request URL.
   *
   * @return {String}
   * @api public
   */

  get url() {
    return this.req.url;
  },

  /**
   * Set request URL.
   *
   * @api public
   */

  set url(val) {
    this.req.url = val;
  },

  /**
   * Get origin of URL.
   *
   * @return {String}
   * @api public
   */

  get origin() {
    return this.protocol + '://' + this.host;
  },

  /**
   * Get full request URL.
   *
   * @return {String}
   * @api public
   */

  get href() {
    // support: `GET http://example.com/foo`
    if (/^https?:\/\//i.test(this.originalUrl)) {
      return this.originalUrl;
    }
    return this.origin + this.originalUrl;
  },

  /**
   * Get request method.
   *
   * @return {String}
   * @api public
   */

  get method() {
    return this.req.method;
  },

  /**
   * Set request method.
   *
   * @param {String} val
   * @api public
   */

  set method(val) {
    this.req.method = val;
  },

  /**
   * Get request pathname.
   *
   * @return {String}
   * @api public
   */

  get path() {
    return parse(this.req).pathname;
  },

  /**
   * Set pathname, retaining the query-string when present.
   *
   * @param {String} path
   * @api public
   */

  set path(path) {
    var url = parse(this.req);
    if (url.pathname === path) return;

    url.pathname = path;
    url.path = null;

    this.url = stringify(url);
  },

  /**
   * Get parsed query-string.
   *
   * @return {Object}
   * @api public
   */

  get query() {
    var str = this.querystring;
    var c = this._querycache = this._querycache || {};
    return c[str] || (c[str] = qs.parse(str));
  },

  /**
   * Set query-string as an object.
   *
   * @param {Object} obj
   * @api public
   */

  set query(obj) {
    this.querystring = qs.stringify(obj);
  },

  /**
   * Get query string.
   *
   * @return {String}
   * @api public
   */

  get querystring() {
    if (!this.req) return '';
    return parse(this.req).query || '';
  },

  /**
   * Set querystring.
   *
   * @param {String} str
   * @api public
   */

  set querystring(str) {
    var url = parse(this.req);
    if (url.search === '?' + str) return;

    url.search = str;
    url.path = null;

    this.url = stringify(url);
  },

  /**
   * Get the search string. Same as the querystring
   * except it includes the leading ?.
   *
   * @return {String}
   * @api public
   */

  get search() {
    if (!this.querystring) return '';
    return '?' + this.querystring;
  },

  /**
   * Set the search string. Same as
   * response.querystring= but included for ubiquity.
   *
   * @param {String} str
   * @api public
   */

  set search(str) {
    this.querystring = str;
  },

  /**
   * Parse the "Host" header field host
   * and support X-Forwarded-Host when a
   * proxy is enabled.
   *
   * @return {String} hostname:port
   * @api public
   */

  get host() {
    var proxy = this.app.proxy;
    var host = proxy && this.get('X-Forwarded-Host');
    host = host || this.get('Host');
    if (!host) return '';
    return host.split(/\s*,\s*/)[0];
  },

  /**
   * Parse the "Host" header field hostname
   * and support X-Forwarded-Host when a
   * proxy is enabled.
   *
   * @return {String} hostname
   * @api public
   */

  get hostname() {
    var host = this.host;
    if (!host) return '';
    return host.split(':')[0];
  },

  /**
   * Check if the request is fresh, aka
   * Last-Modified and/or the ETag
   * still match.
   *
   * @return {Boolean}
   * @api public
   */

  get fresh() {
    var method = this.method;
    var s = this.ctx.status;

    // GET or HEAD for weak freshness validation only
    if ('GET' != method && 'HEAD' != method) return false;

    // 2xx or 304 as per rfc2616 14.26
    if (s >= 200 && s < 300 || 304 == s) {
      return fresh(this.header, this.ctx.response.header);
    }

    return false;
  },

  /**
   * Check if the request is stale, aka
   * "Last-Modified" and / or the "ETag" for the
   * resource has changed.
   *
   * @return {Boolean}
   * @api public
   */

  get stale() {
    return !this.fresh;
  },

  /**
   * Check if the request is idempotent.
   *
   * @return {Boolean}
   * @api public
   */

  get idempotent() {
    var methods = ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS', 'TRACE'];
    return !!~methods.indexOf(this.method);
  },

  /**
   * Return the request socket.
   *
   * @return {Connection}
   * @api public
   */

  get socket() {
    return this.req.socket;
  },

  /**
   * Get the charset when present or undefined.
   *
   * @return {String}
   * @api public
   */

  get charset() {
    var type = this.get('Content-Type');
    if (!type) return '';

    return contentType.parse(type).parameters.charset || '';
  },

  /**
   * Return parsed Content-Length when present.
   *
   * @return {Number}
   * @api public
   */

  get length() {
    var len = this.get('Content-Length');
    if (len == '') return;
    return ~~len;
  },

  /**
   * Return the protocol string "http" or "https"
   * when requested with TLS. When the proxy setting
   * is enabled the "X-Forwarded-Proto" header
   * field will be trusted. If you're running behind
   * a reverse proxy that supplies https for you this
   * may be enabled.
   *
   * @return {String}
   * @api public
   */

  get protocol() {
    var proxy = this.app.proxy;
    if (this.socket.encrypted) return 'https';
    if (!proxy) return 'http';
    var proto = this.get('X-Forwarded-Proto') || 'http';
    return proto.split(/\s*,\s*/)[0];
  },

  /**
   * Short-hand for:
   *
   *    this.protocol == 'https'
   *
   * @return {Boolean}
   * @api public
   */

  get secure() {
    return 'https' == this.protocol;
  },

  /**
   * Return the remote address, or when
   * `app.proxy` is `true` return
   * the upstream addr.
   *
   * @return {String}
   * @api public
   */

  get ip() {
    return this.ips[0] || this.socket.remoteAddress || '';
  },

  /**
   * When `app.proxy` is `true`, parse
   * the "X-Forwarded-For" ip address list.
   *
   * For example if the value were "client, proxy1, proxy2"
   * you would receive the array `["client", "proxy1", "proxy2"]`
   * where "proxy2" is the furthest down-stream.
   *
   * @return {Array}
   * @api public
   */

  get ips() {
    var proxy = this.app.proxy;
    var val = this.get('X-Forwarded-For');
    return proxy && val ? val.split(/\s*,\s*/) : [];
  },

  /**
   * Return subdomains as an array.
   *
   * Subdomains are the dot-separated parts of the host before the main domain of
   * the app. By default, the domain of the app is assumed to be the last two
   * parts of the host. This can be changed by setting `app.subdomainOffset`.
   *
   * For example, if the domain is "tobi.ferrets.example.com":
   * If `app.subdomainOffset` is not set, this.subdomains is `["ferrets", "tobi"]`.
   * If `app.subdomainOffset` is 3, this.subdomains is `["tobi"]`.
   *
   * @return {Array}
   * @api public
   */

  get subdomains() {
    var offset = this.app.subdomainOffset;
    var hostname = this.hostname;
    if (net.isIP(hostname)) return [];
    return hostname.split('.').reverse().slice(offset);
  },

  /**
   * Check if the given `type(s)` is acceptable, returning
   * the best match when true, otherwise `undefined`, in which
   * case you should respond with 406 "Not Acceptable".
   *
   * The `type` value may be a single mime type string
   * such as "application/json", the extension name
   * such as "json" or an array `["json", "html", "text/plain"]`. When a list
   * or array is given the _best_ match, if any is returned.
   *
   * Examples:
   *
   *     // Accept: text/html
   *     this.accepts('html');
   *     // => "html"
   *
   *     // Accept: text/*, application/json
   *     this.accepts('html');
   *     // => "html"
   *     this.accepts('text/html');
   *     // => "text/html"
   *     this.accepts('json', 'text');
   *     // => "json"
   *     this.accepts('application/json');
   *     // => "application/json"
   *
   *     // Accept: text/*, application/json
   *     this.accepts('image/png');
   *     this.accepts('png');
   *     // => undefined
   *
   *     // Accept: text/*;q=.5, application/json
   *     this.accepts(['html', 'json']);
   *     this.accepts('html', 'json');
   *     // => "json"
   *
   * @param {String|Array} type(s)...
   * @return {String|Array|Boolean}
   * @api public
   */

  accepts: function accepts() {
    return this.accept.types.apply(this.accept, arguments);
  },

  /**
   * Return accepted encodings or best fit based on `encodings`.
   *
   * Given `Accept-Encoding: gzip, deflate`
   * an array sorted by quality is returned:
   *
   *     ['gzip', 'deflate']
   *
   * @param {String|Array} encoding(s)...
   * @return {String|Array}
   * @api public
   */

  acceptsEncodings: function acceptsEncodings() {
    return this.accept.encodings.apply(this.accept, arguments);
  },

  /**
   * Return accepted charsets or best fit based on `charsets`.
   *
   * Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5`
   * an array sorted by quality is returned:
   *
   *     ['utf-8', 'utf-7', 'iso-8859-1']
   *
   * @param {String|Array} charset(s)...
   * @return {String|Array}
   * @api public
   */

  acceptsCharsets: function acceptsCharsets() {
    return this.accept.charsets.apply(this.accept, arguments);
  },

  /**
   * Return accepted languages or best fit based on `langs`.
   *
   * Given `Accept-Language: en;q=0.8, es, pt`
   * an array sorted by quality is returned:
   *
   *     ['es', 'pt', 'en']
   *
   * @param {String|Array} lang(s)...
   * @return {Array|String}
   * @api public
   */

  acceptsLanguages: function acceptsLanguages() {
    return this.accept.languages.apply(this.accept, arguments);
  },

  /**
   * Check if the incoming request contains the "Content-Type"
   * header field, and it contains any of the give mime `type`s.
   * If there is no request body, `null` is returned.
   * If there is no content type, `false` is returned.
   * Otherwise, it returns the first `type` that matches.
   *
   * Examples:
   *
   *     // With Content-Type: text/html; charset=utf-8
   *     this.is('html'); // => 'html'
   *     this.is('text/html'); // => 'text/html'
   *     this.is('text/*', 'application/json'); // => 'text/html'
   *
   *     // When Content-Type is application/json
   *     this.is('json', 'urlencoded'); // => 'json'
   *     this.is('application/json'); // => 'application/json'
   *     this.is('html', 'application/*'); // => 'application/json'
   *
   *     this.is('html'); // => false
   *
   * @param {String|Array} types...
   * @return {String|false|null}
   * @api public
   */

  is: function is(types) {
    if (!types) return typeis(this.req);
    if (!Array.isArray(types)) types = [].slice.call(arguments);
    return typeis(this.req, types);
  },

  /**
   * Return the request mime type void of
   * parameters such as "charset".
   *
   * @return {String}
   * @api public
   */

  get type() {
    var type = this.get('Content-Type');
    if (!type) return '';
    return type.split(';')[0];
  },

  /**
   * Return request header.
   *
   * The `Referrer` header field is special-cased,
   * both `Referrer` and `Referer` are interchangeable.
   *
   * Examples:
   *
   *     this.get('Content-Type');
   *     // => "text/plain"
   *
   *     this.get('content-type');
   *     // => "text/plain"
   *
   *     this.get('Something');
   *     // => undefined
   *
   * @param {String} field
   * @return {String}
   * @api public
   */

  get: function get(field) {
    var req = this.req;
    switch (field = field.toLowerCase()) {
      case 'referer':
      case 'referrer':
        return req.headers.referrer || req.headers.referer || '';
      default:
        return req.headers[field] || '';
    }
  },

  /**
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */

  inspect: function inspect() {
    if (!this.req) return;
    return this.toJSON();
  },

  /**
   * Return JSON representation.
   *
   * @return {Object}
   * @api public
   */

  toJSON: function toJSON() {
    return {
      method: this.method,
      url: this.url,
      header: this.header
    };
  }
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



/**
 * Module dependencies.
 */

var contentDisposition = __webpack_require__(37);
var ensureErrorHandler = __webpack_require__(43);
var getType = __webpack_require__(55).contentType;
var onFinish = __webpack_require__(14);
var isJSON = __webpack_require__(12);
var escape = __webpack_require__(44);
var typeis = __webpack_require__(15).is;
var statuses = __webpack_require__(5);
var destroy = __webpack_require__(42);
var assert = __webpack_require__(10);
var path = __webpack_require__(3);
var _vary = __webpack_require__(66);
var extname = path.extname;

/**
 * Prototype.
 */

module.exports = {

  /**
   * Return the request socket.
   *
   * @return {Connection}
   * @api public
   */

  get socket() {
    return this.ctx.req.socket;
  },

  /**
   * Return response header.
   *
   * @return {Object}
   * @api public
   */

  get header() {
    return this.res._headers || {};
  },

  /**
   * Return response header, alias as response.header
   *
   * @return {Object}
   * @api public
   */

  get headers() {
    return this.header;
  },

  /**
   * Get response status code.
   *
   * @return {Number}
   * @api public
   */

  get status() {
    return this.res.statusCode;
  },

  /**
   * Set response status code.
   *
   * @param {Number} code
   * @api public
   */

  set status(code) {
    assert('number' == typeof code, 'status code must be a number');
    assert(statuses[code], 'invalid status code: ' + code);
    this._explicitStatus = true;
    this.res.statusCode = code;
    this.res.statusMessage = statuses[code];
    if (this.body && statuses.empty[code]) this.body = null;
  },

  /**
   * Get response status message
   *
   * @return {String}
   * @api public
   */

  get message() {
    return this.res.statusMessage || statuses[this.status];
  },

  /**
   * Set response status message
   *
   * @param {String} msg
   * @api public
   */

  set message(msg) {
    this.res.statusMessage = msg;
  },

  /**
   * Get response body.
   *
   * @return {Mixed}
   * @api public
   */

  get body() {
    return this._body;
  },

  /**
   * Set response body.
   *
   * @param {String|Buffer|Object|Stream} val
   * @api public
   */

  set body(val) {
    var original = this._body;
    this._body = val;

    // no content
    if (null == val) {
      if (!statuses.empty[this.status]) this.status = 204;
      this.remove('Content-Type');
      this.remove('Content-Length');
      this.remove('Transfer-Encoding');
      return;
    }

    // set the status
    if (!this._explicitStatus) this.status = 200;

    // set the content-type only if not yet set
    var setType = !this.header['content-type'];

    // string
    if ('string' == typeof val) {
      if (setType) this.type = /^\s*</.test(val) ? 'html' : 'text';
      this.length = Buffer.byteLength(val);
      return;
    }

    // buffer
    if (Buffer.isBuffer(val)) {
      if (setType) this.type = 'bin';
      this.length = val.length;
      return;
    }

    // stream
    if ('function' == typeof val.pipe) {
      onFinish(this.res, destroy.bind(null, val));
      ensureErrorHandler(val, this.ctx.onerror);

      // overwriting
      if (null != original && original != val) this.remove('Content-Length');

      if (setType) this.type = 'bin';
      return;
    }

    // json
    this.remove('Content-Length');
    this.type = 'json';
  },

  /**
   * Set Content-Length field to `n`.
   *
   * @param {Number} n
   * @api public
   */

  set length(n) {
    this.set('Content-Length', n);
  },

  /**
   * Return parsed response Content-Length when present.
   *
   * @return {Number}
   * @api public
   */

  get length() {
    var len = this.header['content-length'];
    var body = this.body;

    if (null == len) {
      if (!body) return;
      if ('string' == typeof body) return Buffer.byteLength(body);
      if (Buffer.isBuffer(body)) return body.length;
      if (isJSON(body)) return Buffer.byteLength(JSON.stringify(body));
      return;
    }

    return ~~len;
  },

  /**
   * Check if a header has been written to the socket.
   *
   * @return {Boolean}
   * @api public
   */

  get headerSent() {
    return this.res.headersSent;
  },

  /**
   * Vary on `field`.
   *
   * @param {String} field
   * @api public
   */

  vary: function vary(field) {
    _vary(this.res, field);
  },

  /**
   * Perform a 302 redirect to `url`.
   *
   * The string "back" is special-cased
   * to provide Referrer support, when Referrer
   * is not present `alt` or "/" is used.
   *
   * Examples:
   *
   *    this.redirect('back');
   *    this.redirect('back', '/index.html');
   *    this.redirect('/login');
   *    this.redirect('http://google.com');
   *
   * @param {String} url
   * @param {String} [alt]
   * @api public
   */

  redirect: function redirect(url, alt) {
    // location
    if ('back' == url) url = this.ctx.get('Referrer') || alt || '/';
    this.set('Location', url);

    // status
    if (!statuses.redirect[this.status]) this.status = 302;

    // html
    if (this.ctx.accepts('html')) {
      url = escape(url);
      this.type = 'text/html; charset=utf-8';
      this.body = 'Redirecting to <a href="' + url + '">' + url + '</a>.';
      return;
    }

    // text
    this.type = 'text/plain; charset=utf-8';
    this.body = 'Redirecting to ' + url + '.';
  },

  /**
   * Set Content-Disposition header to "attachment" with optional `filename`.
   *
   * @param {String} filename
   * @api public
   */

  attachment: function attachment(filename) {
    if (filename) this.type = extname(filename);
    this.set('Content-Disposition', contentDisposition(filename));
  },

  /**
   * Set Content-Type response header with `type` through `mime.lookup()`
   * when it does not contain a charset.
   *
   * Examples:
   *
   *     this.type = '.html';
   *     this.type = 'html';
   *     this.type = 'json';
   *     this.type = 'application/json';
   *     this.type = 'png';
   *
   * @param {String} type
   * @api public
   */

  set type(type) {
    type = getType(type) || false;
    if (type) {
      this.set('Content-Type', type);
    } else {
      this.remove('Content-Type');
    }
  },

  /**
   * Set the Last-Modified date using a string or a Date.
   *
   *     this.response.lastModified = new Date();
   *     this.response.lastModified = '2013-09-13';
   *
   * @param {String|Date} type
   * @api public
   */

  set lastModified(val) {
    if ('string' == typeof val) val = new Date(val);
    this.set('Last-Modified', val.toUTCString());
  },

  /**
   * Get the Last-Modified date in Date form, if it exists.
   *
   * @return {Date}
   * @api public
   */

  get lastModified() {
    var date = this.get('last-modified');
    if (date) return new Date(date);
  },

  /**
   * Set the ETag of a response.
   * This will normalize the quotes if necessary.
   *
   *     this.response.etag = 'md5hashsum';
   *     this.response.etag = '"md5hashsum"';
   *     this.response.etag = 'W/"123456789"';
   *
   * @param {String} etag
   * @api public
   */

  set etag(val) {
    if (!/^(W\/)?"/.test(val)) val = '"' + val + '"';
    this.set('ETag', val);
  },

  /**
   * Get the ETag of a response.
   *
   * @return {String}
   * @api public
   */

  get etag() {
    return this.get('ETag');
  },

  /**
   * Return the response mime type void of
   * parameters such as "charset".
   *
   * @return {String}
   * @api public
   */

  get type() {
    var type = this.get('Content-Type');
    if (!type) return '';
    return type.split(';')[0];
  },

  /**
   * Check whether the response is one of the listed types.
   * Pretty much the same as `this.request.is()`.
   *
   * @param {String|Array} types...
   * @return {String|false}
   * @api public
   */

  is: function is(types) {
    var type = this.type;
    if (!types) return type || false;
    if (!Array.isArray(types)) types = [].slice.call(arguments);
    return typeis(type, types);
  },

  /**
   * Return response header.
   *
   * Examples:
   *
   *     this.get('Content-Type');
   *     // => "text/plain"
   *
   *     this.get('content-type');
   *     // => "text/plain"
   *
   * @param {String} field
   * @return {String}
   * @api public
   */

  get: function get(field) {
    return this.header[field.toLowerCase()] || '';
  },

  /**
   * Set header `field` to `val`, or pass
   * an object of header fields.
   *
   * Examples:
   *
   *    this.set('Foo', ['bar', 'baz']);
   *    this.set('Accept', 'application/json');
   *    this.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' });
   *
   * @param {String|Object|Array} field
   * @param {String} val
   * @api public
   */

  set: function set(field, val) {
    if (2 == arguments.length) {
      if (Array.isArray(val)) val = val.map(String);else val = String(val);
      this.res.setHeader(field, val);
    } else {
      for (var key in field) {
        this.set(key, field[key]);
      }
    }
  },

  /**
   * Append additional header `field` with value `val`.
   *
   * Examples:
   *
   *    this.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
   *    this.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
   *    this.append('Warning', '199 Miscellaneous warning');
   *
   * @param {String} field
   * @param {String|Array} val
   * @api public
   */

  append: function append(field, val) {
    var prev = this.get(field);

    if (prev) {
      val = Array.isArray(prev) ? prev.concat(val) : [prev].concat(val);
    }

    return this.set(field, val);
  },

  /**
   * Remove header `field`.
   *
   * @param {String} name
   * @api public
   */

  remove: function remove(field) {
    this.res.removeHeader(field);
  },

  /**
   * Checks if the request is writable.
   *
   * @return {Boolean}
   * @api private
   */

  get writable() {
    // can't write any more after response finished
    if (this.res.finished) return false;

    var socket = this.res.socket;
    // There are already pending outgoing res, but still writable
    // https://github.com/nodejs/node/blob/v4.4.7/lib/_http_server.js#L486
    if (!socket) return true;
    return socket.writable;
  },

  /**
   * Inspect implementation.
   *
   * @return {Object}
   * @api public
   */

  inspect: function inspect() {
    if (!this.res) return;
    var o = this.toJSON();
    o.body = this.body;
    return o;
  },

  /**
   * Return JSON representation.
   *
   * @return {Object}
   * @api public
   */

  toJSON: function toJSON() {
    return {
      status: this.status,
      message: this.message,
      header: this.header
    };
  }
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("accepts");

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("async");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("co");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("composition");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("content-disposition");

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("content-type");

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("cookies");

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = require("debug");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

module.exports = require("delegates");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("destroy");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("error-inject");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("escape-html");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("fresh");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("http-assert");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("http-errors");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("koa-add-trailing-slashes");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("koa-compose");

/***/ }),
/* 53 */
/***/ (function(module, exports) {

module.exports = require("koa-route");

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("mime-types");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("node-ssdp");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("node-uuid");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("only");

/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = require("parseurl");

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("querystring");

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("sqlite3");

/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 65 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("vary");

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(17);
module.exports = __webpack_require__(16);


/***/ })
/******/ ]);