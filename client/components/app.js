import React from 'react';
// import Menu from './menu';
// import Body from './body';
import Duplicate from './duplicate';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hubs: ['Milight', 'Wink', 'Hue', 'Generic', 'All'],
      url: props.url
    };
    this.handleReload = props.handleReload || (() => {});
    this.handleHubChange = this.handleHubChange.bind(this);
    this.handleAddHub = this.handleAddHub.bind(this);
    this.handleDeviceChange = this.handleDeviceChange.bind(this);
  }

  componentWillReceiveProps({devices, hubs}){
    devices && this.setState({devices});
    hubs && this.setState({hubs});
  }

  handleHubChange(selectedHub){
    this.setState({selectedHub});
  }

  handleDeviceChange(change, name){
    var device = this.state.devices.find(x => x.name === name);
    device && console.log(device); //eslint-disable-line no-console

    if (change === 'on' || change === 'off'){
      const changeUrl = device[change+"Url"];
      fetch(changeUrl, {mode: 'no-cors'})
        .then(r => r.status)
        .then(status => console.log(`Response from ${changeUrl} : ${status}`)) //eslint-disable-line no-console
        .catch(e => console.log('Error:\n', e)); //eslint-disable-line no-console
    }
    /* eslint-disable no-console*/
    console.log('TODO: change device status to pending, on repsonse change device status properly');

    console.log(change + " device: " + name);
    /* eslint-enable no-console*/
  }

  handleAddHub(newHub){
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
      selected: {
        hub: this.state.selectedHub || 'All'
      },
      devices: this.state.devices,
      newHub: this.state.newHub,
      handleAddHub: this.handleAddHub,
      handleDeviceChange: this.handleDeviceChange,
      handleHubChange: this.handleHubChange,
      handleReload: this.handleReload
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
