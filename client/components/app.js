import React from 'react';
import Menu from './menu';
import Body from './body';
import Duplicate from './duplicate';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hubs: ['Milight', 'Wink', 'Hue', 'Generic', 'All']
    };
    this.handleHubChange = this.handleHubChange.bind(this);
    this.handleAddHub = this.handleAddHub.bind(this);
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
      hubs: this.state.hubs,
      selected: {
        hub: this.state.selectedHub || 'All'
      },
      devices: [
        {name: '_den', hub: 'Milight'},
        {name: '_master_b_room', hub: 'Milight'},
        {name: 'WifiPlugOne', hub: 'Generic'}
      ],
      newHub: this.state.newHub,
      handleAddHub: this.handleAddHub,
      handleHubChange: this.handleHubChange
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
