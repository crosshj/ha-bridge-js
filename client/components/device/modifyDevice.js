import React from 'react';

function ModifyDevice({
  tempDevice = {},
  newHub,
  selected = {},
  visibility = {},
  handleTempDeviceChange = () => {}
}){
  const selectedHub = visibility.devices === 'All'
  ? { name: 'All' }
  : selected.hub;

  const component = (
  <div>{ (selectedHub.name === 'Generic' && !newHub && visibility.devices) || (visibility.devices && visibility.devices !== 'All' && !!selected.device) &&
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
  }</div>
  );

  return component;
}

ModifyDevice.propTypes = {
  tempDevice: React.PropTypes.object,
  newHub: React.PropTypes.object,
  selected: React.PropTypes.object,
  handleTempDeviceChange: React.PropTypes.func
};

export default ModifyDevice;
