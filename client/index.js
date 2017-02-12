import React from 'react';
import {render} from 'react-dom';
import App from './components/app.js';

const apiUrl = location.origin + location.pathname + "local-api/";

function reload(){
  fetch(apiUrl + "devices")
    .then(r => r.json())
    .then(data => render(<App devices={data}/>, document.getElementById('app')))
    .catch(e => console.log("Error:\n", e)); //eslint-disable-line no-console

  fetch(apiUrl + "hubs")
    .then(r => r.json())
    .then(data => render(<App hubs={data}/>, document.getElementById('app')))
    .catch(e => console.log("Error:\n", e)); //eslint-disable-line no-console
}

render(<App url={apiUrl} handleReload={reload}/>, document.getElementById('app'));
reload();
