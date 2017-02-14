var request = require('koa-request');
const updateThunk = require('../controllers/devices').updateThunk;
const findThunk = require('../controllers/devices').findThunk;
const hubsFindThunk = require('../controllers/hubs').findThunk;
const getTemplatesThunk = require('../controllers/hubs').getTemplatesThunk;
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

    console.log('updateUrl', updateUrl);
    if (updateUrl.indexOf('local-api') === 0){
      var hubName = updateUrl.split('/hubs/')[1].split('/')[0];
      var hubs = yield hubsFindThunk();
      var hub = hubs.find(x => x.name === hubName);
      var templates = yield getTemplatesThunk();
      var template = templates.find(x => x.name === hub.type);
      console.log('template', JSON.stringify(template));

      updateUrl = baseUrl + ':' + serverPort + '/' + updateUrl;
      template.updateUrl && (updateUrl = template.updateUrl(updateUrl));
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
