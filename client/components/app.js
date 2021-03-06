import React from 'react';
// import Menu from './menu';
// import Body from './body';
import Duplicate from './duplicate';
import getVisible from './visibility';

function testUrl(url){
  fetch(url, {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    },
    mode: 'no-cors'
  })
    .then(r => r.status)
    .then(status => console.log(`Response from ${url} : ${status}`)) //eslint-disable-line no-console
    .catch(e => console.log('Error:\n', e)); //eslint-disable-line no-console
}

const menuItems = [
  {
    name: 'Devices',
    action: () => {
      location.hash = 'devices';
    }
  },
  {
    name: 'Hubs',
    action: () => {
      location.hash = 'hubs';
    }
  },
  {
    name: 'Bridge',
    action: () => {
      location.hash = 'bridge';
    }
  }
];

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hubs: [{name:'Generic'}, {name: 'All'}],
      hubTypes: [],
      url: props.url + "devices",
      hubUrl: props.url + "hubs",
      tempDevice: {},
      visibility: getVisible(location.hash),
      menuItems
    };
    this.handleReload = props.handleReload || (() => {});
    this.handleHubChange = this.handleHubChange.bind(this);
    this.handleAddHub = this.handleAddHub.bind(this);
    this.handleDeviceChange = this.handleDeviceChange.bind(this);
    this.handleTempDeviceChange = this.handleTempDeviceChange.bind(this);
    this.testUrl = testUrl.bind(this);
    menuItems.map(item => {
      item.action = item.action.bind(this);
      return item;
    });
    window.onhashchange = () => {
      var visibility = Object.assign({}, this.state.visibility, getVisible(location.hash));
      this.setState({visibility});
    };
  }

  componentWillReceiveProps({devices, hubs}){
    devices && this.setState({devices});
    if (hubs && hubs.instances){
      const instances = hubs.instances.concat([{name:'Generic'}, {name: 'All'}]);
      const hubTypes = hubs.templates;
      const selected = this.state.selectedHub
        ? hubs.instances.find(x => x.uuid === this.state.selectedHub.uuid)
        : this.state.selectedHub;
      this.setState({hubs: instances, hubTypes, selectedHub: selected});
    }
  }

  handleHubChange(selectedHub, event){
    if (event){
      selectedHub = this.state.hubs.find(x => x.name===event.target.value);
    }
    this.setState({tempDevice: {}, selectedDevice: undefined});
    this.setState({selectedHub});
  }

  handleDeviceChange(change, name){
    var device = this.state.devices.find(x => x.name === name);
    device && console.log(device); //eslint-disable-line no-console

    if (change === 'on' || change === 'off' || change === 'toggle'){
      const thisChange = change !== 'toggle'
        ? change
        : !device.status || device.status === 'off'
          ? 'on'
          : 'off';
      const url = device[thisChange+"Url"];
      this.testUrl(url);
      device.status = thisChange;
      /* eslint-disable no-console*/
      console.log('TODO: change device status to pending, on response change device status properly');

      console.log(change + " device: " + name);
      /* eslint-enable no-console*/
    }

    if (change === 'edit') {
      this.setState({
        selectedDevice: device,
        tempDevice: JSON.parse(JSON.stringify(device))
      });
    }

    if (change === 'delete') {
      //DELETE
      const url = this.state.url + '/' + device.uuid;
      const config = {
        method: 'DELETE'
      };
      fetch(url, config)
        .then(r => r.text())
        .then(body => {
          console.log(`Response from ${url} : ${body}`); //eslint-disable-line no-console
          this.setState({tempDevice: {}, selectedDevice: undefined});
          this.handleReload();
        })
        .catch(e => console.log('Error:\n', e)); //eslint-disable-line no-console

      /* eslint-disable no-console*/
      console.log('TODO: change device status to pending, on repsonse change device status properly');
      console.log(change + " device: " + device.name);
      /* eslint-enable no-console*/
      return;
    }

  }

  handleTempDeviceChange(prop, value){
    if (prop === 'add') {
      //POST
      const url = this.state.url;
      const config = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(value)
      };
      fetch(url, config)
        .then(r => r.text())
        .then(body => {
          console.log(`Response from ${url} : ${body}`); //eslint-disable-line no-console
          this.setState({tempDevice: {}, selectedDevice: undefined});
          this.handleReload();
        })
        .catch(e => console.log('Error:\n', e)); //eslint-disable-line no-console

      /* eslint-disable no-console*/
      console.log('TODO: change device status to pending, on repsonse change device status properly');

      console.log(prop + " device: " + value.name);
      /* eslint-enable no-console*/
      return;
    }

    if (prop === 'update') {
      //PUT
      const url = this.state.url + '/' + value.uuid;
      const config = {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          name: value.name,
          onUrl: value.onUrl,
          offUrl: value.offUrl
        })
      };
      fetch(url, config)
        .then(r => r.text())
        .then(body => {
          console.log(`Response from ${url} : ${body}`); //eslint-disable-line no-console
          this.setState({tempDevice: {}, selectedDevice: undefined});
          this.handleReload();
        })
        .catch(e => console.log('Error:\n', e)); //eslint-disable-line no-console

      /* eslint-disable no-console*/
      console.log('TODO: change device status to pending, on repsonse change device status properly');
      console.log(prop + " device: " + value.name);
      /* eslint-enable no-console*/
      return;
    }

    if(prop === 'test'){
      this.testUrl(value);
      /* eslint-disable no-console*/
      console.log('TODO: change device status to pending, on repsonse change device status properly');
      /* eslint-enable no-console*/
      return;
    }

    if (prop === 'cancel'){
      this.setState({tempDevice: {}, selectedDevice: undefined});
    } else {
      var tempDevice = this.state.tempDevice;
      tempDevice[prop] = value;
      this.setState({tempDevice});
    }
  }

  handleAddHub(newHub, change){
    this.setState({tempDevice: {}, selectedDevice: undefined});

    if(change === 'delete'){
      //PUT
      const url = this.state.hubUrl + "/" + this.state.selectedHub.uuid;
      const config = {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      };
      fetch(url, config)
        .then(r => r.text())
        .then(body => {
          console.log(`Response from ${url} : ${body}`); //eslint-disable-line no-console
          this.setState({newHub: undefined});
          this.handleReload();
        })
        .catch(e => console.log('Error:\n', e)); //eslint-disable-line no-console
      return;
    }

    if(change === 'cancel'){
      this.setState({newHub: undefined});
      return;
    }

    if(change === 'edit'){
      var editHub = JSON.parse(JSON.stringify(this.state.selectedHub));
      editHub.types = this.state.hubTypes;
      this.setState({newHub: editHub});
      return;
    }

    if(change === 'update'){
      //PUT
      newHub.type = newHub.type || this.state.hubTypes[0].name;
      const url = this.state.hubUrl + "/" + this.state.selectedHub.uuid;
      const config = {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(newHub)
      };
      fetch(url, config)
        .then(r => r.text())
        .then(body => {
          console.log(`Response from ${url} : ${body}`); //eslint-disable-line no-console
          this.setState({newHub: undefined});
          this.handleReload();
        })
        .catch(e => console.log('Error:\n', e)); //eslint-disable-line no-console
      return;
    }

    if(!newHub){
      // set hub for hub editor
      this.setState({newHub: {
        name: '',
        url: '',
        types: this.state.hubTypes
      }});
    } else {
      //POST
      newHub.type = newHub.type || this.state.hubTypes[0].name;
      const url = this.state.hubUrl;
      const config = {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(newHub)
      };
      fetch(url, config)
        .then(r => r.text())
        .then(body => {
          console.log(`Response from ${url} : ${body}`); //eslint-disable-line no-console
          this.setState({newHub: undefined});
          this.handleReload();
        })
        .catch(e => console.log('Error:\n', e)); //eslint-disable-line no-console
    }
  }

  render () {
    const props = {
      url: this.state.url,
      hubs: this.state.hubs,
      selected: {
        hub: this.state.selectedHub || {name:'All'},
        device: this.state.selectedDevice
      },
      tempDevice: this.state.tempDevice,
      devices: this.state.devices,
      newHub: this.state.newHub,
      handleAddHub: this.handleAddHub,
      handleDeviceChange: this.handleDeviceChange,
      handleHubChange: this.handleHubChange,
      handleReload: this.handleReload,
      handleTempDeviceChange: this.handleTempDeviceChange,
      visibility: this.state.visibility,
      menuItems: this.state.menuItems
    };
    return (
      <div>
        <Duplicate {...props}/>
      </div>
    );

  }
}

App.propTypes = {
  url: React.PropTypes.string,
  handleReload: React.PropTypes.func
};

export default App;
