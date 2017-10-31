import React from 'react';
import {render} from 'react-dom';
import App from './components/app.js';

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', function() {
//     navigator.serviceWorker.register('sw.js', {scope: './'}).then(function(registration) {
//       // Registration was successful
//       console.log('ServiceWorker registration successful with scope: ', registration.scope); //eslint-disable-line no-console
//     }).catch(function(err) {
//       // registration failed :(
//       console.log('ServiceWorker registration failed: ', err); //eslint-disable-line no-console
//     });
//   });
// }

const apiUrl = location.origin + location.pathname + "local-api/";

const addHubToDevices = devices => devices.map(device => {
  var alteredDevice = device;
  if (~device.offUrl.indexOf('local-api/hubs/')) {
    alteredDevice.hub = {
      name: device.offUrl.split('local-api/hubs/')[1].split('/')[0]
    };
  }
  return alteredDevice;
});

function reload(){
  fetch(apiUrl + "devices", {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    },
    mode: 'no-cors'
  })
    .then(r => r.json())
    .then(data => render(<App devices={addHubToDevices(data)}/>, document.getElementById('app')))
    .catch(e => console.log("Error:\n", e)); //eslint-disable-line no-console

  fetch(apiUrl + "hubs", {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    },
    mode: 'no-cors'
  })
    .then(r => r.json())
    .then(data => render(<App hubs={data}/>, document.getElementById('app')))
    .catch(e => console.log("Error:\n", e)); //eslint-disable-line no-console
}

render(<App url={apiUrl} handleReload={reload}/>, document.getElementById('app'));
reload();
