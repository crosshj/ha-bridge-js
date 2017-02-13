var request = require('koa-request');
const updateThunk = require('../controllers/devices').updateThunk;
const findThunk = require('../controllers/devices').findThunk;
var ip = require('ip');
const baseUrl = 'http://' + ip.address();
const serverPort = require('../config').serverPort;

const deviceState = {};

module.exports = function* (deviceId, payload){
console.log('updateDevice payload:\n', payload);
  const status = JSON.parse(Object.keys(payload)[0]);
  var fieldName = Object.keys(status)[0] === "on"
    ? "status"
    : undefined;
  if ((status.bri || status.bri === 0) && !fieldName){
    fieldName = 'status';
    status.on = true;
  }
  const fieldValue = status["on"] ? "on" : "off" ;
  var deviceState = [{
    'success': {}
  }];

  try {
    if (!fieldName){
      throw "could not find fieldName";
    }

    var deviceMatch = yield findThunk(deviceId);
    var updateUrl = deviceMatch[0][fieldValue+"Url"];

    if (status.bri){
      updateUrl = updateUrl.replace(/on$/g, status.bri)
    }

    if (updateUrl.indexOf('local-api') === 0){
      updateUrl = baseUrl + ':' + serverPort + '/' + updateUrl;
    }
    console.log('updateUrl', updateUrl);

    var options = {
        url: updateUrl,
        headers: {}
    };
    var response = yield request(options);
    if (response.body !== 'ok') {
      console.log('response body of koa request to milight: ', response.body);
      throw 'milights did not return an "okay" response';
    }

    // TODO: need a queue for SQLITE DB here ???
    yield updateThunk(deviceId, fieldName, fieldValue);
    deviceState[0].success["/lights/" + deviceId + "/state/on"] = fieldValue;
  } catch (error) {
    deviceState = { error };
  }
  return deviceState;
}
