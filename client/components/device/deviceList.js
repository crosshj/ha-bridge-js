import React from 'react';



function DeviceList({
  selected={}, devices=[], newHub,
  visibility = {},
  handleDeviceChange = () => {}
}){
  const selectedHub = visibility.devices === 'All'
  ? { name: 'All' }
  : selected.hub;

  const currentDevices = selectedHub.name === 'All'
    ? devices
    : devices.filter(x => (x.hub && x.hub.name === selectedHub.name) || (selectedHub.name === 'Generic' && !x.hub));

  const component = (
  <div>{ currentDevices.length > 0 && !newHub && visibility.devices &&
    <div className="panel panel-default panel-success">
        <div className="panel-heading">
          <h2 className="panel-title">{selectedHub.name} devices</h2>
        </div>
        <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                  <th>Name</th>
                  <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            { currentDevices && currentDevices
              .map((device, key) => {
                return (
                  <tr key={key}>
                      <td>{device.name}</td>
                      <td className="text-center">
                          <button className="btn btn-info" onClick={() => handleDeviceChange('on', device.name)}>ON</button>
                          <button className="btn btn-info" onClick={() => handleDeviceChange('off', device.name)}>OFF</button>
                          { selectedHub.name !== 'All' && (!device.hub || device.hub.name === 'Generic') &&
                          <button className="btn btn-danger" onClick={() => handleDeviceChange('edit', device.name)}>Edit</button>
                          }
                          { selectedHub.name !== 'All' && (!device.hub || device.hub.name === 'Generic') &&
                          <button className="btn btn-danger" onClick={() => handleDeviceChange('delete', device.name)}>Delete</button>
                          }
                      </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
    </div>
  }</div>
  );

  return component;
}

DeviceList.propTypes = {
  selected: React.PropTypes.object,
  hubs: React.PropTypes.array,
  hubchange: React.PropTypes.func,
  handleAddHubClick: React.PropTypes.func
};

export default DeviceList;
