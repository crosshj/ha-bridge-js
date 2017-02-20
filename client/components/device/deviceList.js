import React from 'react';



function DeviceList({
  selected={}, devices=[], newHub,
  handleDeviceChange = () => {}
}){

  const currentDevices = selected.hub.name === 'All'
    ? devices
    : devices.filter(x => (x.hub && x.hub.name === selected.hub.name) || (selected.hub.name === 'Generic' && !x.hub));

  const component = (
  <div>{ currentDevices.length > 0 && !newHub &&
    <div className="panel panel-default panel-success">
        <div className="panel-heading">
          <h2 className="panel-title">{selected.hub.name} devices</h2>
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
              .map(x => x.name)
              .map((name, key) => {
                return (
                  <tr key={key}>
                      <td>{name}</td>
                      <td className="text-center">
                          <button className="btn btn-info" onClick={() => handleDeviceChange('on', name)}>ON</button>
                          <button className="btn btn-info" onClick={() => handleDeviceChange('off', name)}>OFF</button>
                          { selected.hub.name !== 'All' &&
                          <button className="btn btn-danger" onClick={() => handleDeviceChange('edit', name)}>Edit</button>
                          }
                          { selected.hub.name !== 'All' &&
                          <button className="btn btn-danger" onClick={() => handleDeviceChange('delete', name)}>Delete</button>
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
