import React from 'react';
// import Menu from './menu';
// import Body from './body';
import Duplicate from './duplicate';

function testUrl(url){
  fetch(url, {mode: 'no-cors'})
    .then(r => r.status)
    .then(status => console.log(`Response from ${url} : ${status}`)) //eslint-disable-line no-console
    .catch(e => console.log('Error:\n', e)); //eslint-disable-line no-console
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hubs: ['Generic', 'All'],
      hubTypes: [],
      url: props.url + "devices",
      tempDevice: {}
    };
    this.handleReload = props.handleReload || (() => {});
    this.handleHubChange = this.handleHubChange.bind(this);
    this.handleAddHub = this.handleAddHub.bind(this);
    this.handleDeviceChange = this.handleDeviceChange.bind(this);
    this.handleTempDeviceChange = this.handleTempDeviceChange.bind(this);
    this.testUrl = testUrl.bind(this);
  }

  componentWillReceiveProps({devices, hubs}){
    devices && this.setState({devices});
    if (hubs && hubs.instances){
      const instances = ['Generic', 'All'].concat(hubs.instances);
      const hubTypes = hubs.templates;
      this.setState({hubs: instances, hubTypes});
    }
  }

  handleHubChange(selectedHub){
    this.setState({tempDevice: {}, selectedDevice: undefined});
    this.setState({selectedHub});
  }

  handleDeviceChange(change, name){
    var device = this.state.devices.find(x => x.name === name);
    device && console.log(device); //eslint-disable-line no-console

    if (change === 'on' || change === 'off'){
      const url = device[change+"Url"];
      this.testUrl(url);
      /* eslint-disable no-console*/
      console.log('TODO: change device status to pending, on repsonse change device status properly');

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

  handleAddHub(newHub){
    this.setState({tempDevice: {}, selectedDevice: undefined});
    if(!newHub){
      this.setState({newHub: {
        name: '',
        url: '',
        types: ['foo', 'bar', 'baz']
      }});
    } else {
      this.setState({
        newHub: undefined,
        hubs: (newHub === 'cancel')
          ? this.state.hubs
          : [newHub.name].concat(this.state.hubs)
      });
    }
  }

  render () {
    const props = {
      url: this.state.url,
      hubs: this.state.hubs,
      hubTypes: this.state.hubTypes,
      selected: {
        hub: this.state.selectedHub || 'All',
        device: this.state.selectedDevice
      },
      tempDevice: this.state.tempDevice,
      devices: this.state.devices,
      newHub: this.state.newHub,
      handleAddHub: this.handleAddHub,
      handleDeviceChange: this.handleDeviceChange,
      handleHubChange: this.handleHubChange,
      handleReload: this.handleReload,
      handleTempDeviceChange: this.handleTempDeviceChange
    };
    return (
      <div>
        {
        // <Menu />
        // <Body />
        }
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
