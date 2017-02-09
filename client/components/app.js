import React from 'react';
import Menu from './menu';
import Body from './body';
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
  }

  componentWillReceiveProps({devices, hubs}){
    devices && this.setState({devices});
    hubs && this.setState({hubs});
  }

  handleHubChange(selectedHub){
    this.setState({selectedHub});
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
      handleHubChange: this.handleHubChange,
      handleReload: this.handleReload
    };
    return <div>
        {
        // <Menu />
        // <Body />
      }
        <Duplicate {...props}/>
    </div>

  }
}

export default App;
