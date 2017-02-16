import React from 'react';
import BridgeSettings from './bridge/bridgeSettings.js';
import Hubs from './hub/hubs';
import ModifyHub from './hub/modifyHub';
import DeviceList from './device/deviceList';

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
  const hubChange = (event) => {
    const hub = hubs.find(x => x.name===event.target.value);
    handleHubChange(hub);
  };

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

  const bridgeSettingsProps = { url, handleReload };
  const hubsProps = { newHub, hubs, selected, hubChange, handleAddHubClick };
  const modifyHubProps = { newHub, tempHub, handleAddHubClick };
  const deviceListProps = { newHub, selected, devices, handleDeviceChange };

  const duplicate = (
    <div>
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
          <Hubs {...hubsProps} />
          <ModifyHub {...modifyHubProps} />
          <DeviceList {...deviceListProps} />

          { selected.hub.name !== 'All' && !newHub &&
          <div className="panel panel-default panel-success">
              <div className="panel-heading">
                <h2 className="panel-title">{(selected.device ? "Edit " : "Add ") + selected.hub.name} device</h2>
              </div>
              <ul className="list-group">
                  <li className="list-group-item">
                      <form className="form-horizontal">
                          <div className="form-group">
                              <div className="col-xs-8 col-sm-7">
                                  <input type="text" className="form-control"
                                    id="device-name" placeholder="Device Name"
                                    value={
                                      (tempDevice && tempDevice.name)
                                      || (selected.device && selected.device.name)
                                      || ''
                                    }
                                    onChange={event => handleTempDeviceChange('name', event.target.value)}
                                  />
                              </div>
                              <button className="col-xs-3 col-sm-2 btn btn-primary" type="button"
                                onClick={() => handleTempDeviceChange((selected.device ? "update" : "add"), tempDevice)}
                              >
                                  {(selected.device ? "Update" : "Add")} Device
                              </button>
                          </div>
                          <div className="form-group">
                              <div className="col-xs-8 col-sm-7">
                                  <input type="text" className="form-control"
                                    id="device-on-url" placeholder="URL to turn device on"
                                    value={
                                      (tempDevice && tempDevice.onUrl)
                                      || (selected.device && selected.device.onUrl)
                                      || ''
                                    }
                                    onChange={event => handleTempDeviceChange('onUrl', event.target.value)}
                                  />
                              </div>
                              <button className="col-xs-3 col-sm-2 btn btn-success" type="button"
                                onClick={() => handleTempDeviceChange(
                                  'test',
                                  (tempDevice && tempDevice.onUrl) || (selected.device && selected.device.onUrl)
                                )}
                              >
                                On Test
                              </button>
                          </div>
                          <div className="form-group">
                              <div className="col-xs-8 col-sm-7">
                                  <input type="text" className="form-control"
                                    id="device-off-url" placeholder="URL to turn device off"
                                    value={
                                      (tempDevice && tempDevice.offUrl)
                                      || (selected.device && selected.device.offUrl)
                                      || ''
                                    }
                                    onChange={event => handleTempDeviceChange('offUrl', event.target.value)}
                                  />
                              </div>
                              <button className="col-xs-3 col-sm-2 btn btn-success" type="button"
                                onClick={() => handleTempDeviceChange(
                                  'test',
                                  (tempDevice && tempDevice.offUrl) || (selected.device && selected.device.offUrl)
                                )}
                              >
                                Off Test
                              </button>
                          </div>
                      </form>
                      <div className="cols-xs-12 text-center">
                          <button className="btn"
                            onClick={() => handleTempDeviceChange('cancel')}
                          >Cancel</button>
                      </div>
                  </li>
              </ul>
          </div>
          }{/* new device */}
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
