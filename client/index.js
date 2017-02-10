import React from 'react';
import {render} from 'react-dom';
import App from './components/app.js';

const devicesUrl = location.origin + "/local-api/devices";


function reload(){
  fetch(devicesUrl)
    .then(r => r.json())
    .then(data => render(<App devices={data}/>, document.getElementById('app')))
    .catch(e => console.log("Error:\n", e)); //eslint-disable-line no-console

  // fetch("/local-api/hubs")
  //   .then(r => r.json())
  //   .then(data => render(<App hubs={data}/>, document.getElementById('app')))
  //   .catch(e => console.log("Error:\n", e));
}

render(<App url={devicesUrl} handleReload={reload}/>, document.getElementById('app'));
reload();
