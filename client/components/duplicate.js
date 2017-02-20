import React from 'react';
import BridgeSettings from './bridge/bridgeSettings.js';
import HubsList from './hub/hubsList';
import ModifyHub from './hub/modifyHub';
import DeviceList from './device/deviceList';
import ModifyDevice from './device/modifyDevice.js';

var tempHub = {};

function duplicate({
  selected={}, hubs=[], devices=[],
  newHub, tempDevice, url,
  handleHubChange = () => {},
  handleAddHub = () => {},
  handleReload = () => {},
  handleDeviceChange = () => {},
  handleTempDeviceChange = () => {}
}){
  {/* TODO: pull to top level  */}
  const handleAddHubClick = (event, change) => {
    var newHub = undefined;
    if(~event.target.className.indexOf('submit-hub')){
      newHub = JSON.parse(JSON.stringify(tempHub));
    }
    if(~event.target.className.indexOf('update-hub')){
      newHub = JSON.parse(JSON.stringify(tempHub));
      change = 'update';
    }
    if(~event.target.className.indexOf('cancel-hub')){
      tempHub = {};
      change = 'cancel';
    }
    handleAddHub(newHub, change);
  };

  {/* TODO: pull visibility to top level  */}
  const bridgeSettingsProps = { url, handleReload };
  const hubsListProps = { newHub, hubs, selected, handleHubChange, handleAddHubClick };
  const modifyHubProps = { newHub, tempHub, handleAddHubClick };
  const deviceListProps = { newHub, selected, devices, handleDeviceChange };
  const modifyDeviceProps = { tempDevice, newHub, selected, handleTempDeviceChange };

  const duplicate = (
    <div>
      {/* TODO: create component, add hamburger menu -
        http://stackoverflow.com/questions/26317679/how-to-add-hamburger-menu-in-bootstrap
      */}
      <nav className="navbar navbar-custom navbar-fixed-top">
          <div className="container">
              <div className="navbar-header">
                  <a className="navbar-brand" href="#">HA Bridge Configuration</a>
              </div>
          </div>
      </nav>
      <div className={`container col-sm-10 col-sm-offset-1
        col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3`}
      >
          <BridgeSettings {...bridgeSettingsProps} />
          <HubsList {...hubsListProps} />
          <ModifyHub {...modifyHubProps} />
          <DeviceList {...deviceListProps} />
          <ModifyDevice {...modifyDeviceProps} />
      </div>
    </div>
  );

  return duplicate;
}

duplicate.propTypes = {
  selected: React.PropTypes.object,
  hubs: React.PropTypes.array,
  devices: React.PropTypes.array,
  url: React.PropTypes.string,
  handleHubchange: React.PropTypes.func,
  handleAddHub: React.PropTypes.func,
  handleReload: React.PropTypes.func,
  handleDeviceChange: React.PropTypes.func
};

export default duplicate;
