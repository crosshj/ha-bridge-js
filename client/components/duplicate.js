import React from 'react';

var tempHub = {};

function duplicate({
  selected={}, hubs=[], devices=[],
  newHub, tempDevice,
  handleHubChange = () => {},
  handleAddHub = () => {},
  handleReload = () => {},
  handleDeviceChange = () => {},
  handleTempDeviceChange = () => {},
  url
}){
  const hubChange = (event) => {
    const hub = event.target.value;
    handleHubChange(hub);
  };

  const handleAddHubClick = (event, change) => {
    var newHub = undefined;
    if(~event.target.className.indexOf('submit-hub')){
      newHub = JSON.parse(JSON.stringify(tempHub));
    }
    if(~event.target.className.indexOf('cancel-hub')){
      newHub = 'cancel';
    }
    handleAddHub(newHub, change);
  };


  const currentDevices = selected.hub === 'All'
    ? devices
    : devices.filter(x => x.hub === selected.hub || (selected.hub === 'Generic' && !x.hub));

  const duplicate = (
    <div>
      <nav className="navbar navbar-custom navbar-fixed-top">
          <div className="container">
              <div className="navbar-header">
                  <a className="navbar-brand" href="#">HA Bridge Configuration</a>
              </div>
          </div>
      </nav>
      <div className="container col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
          <div className="panel panel-default panel-success bridgeServer">
              <div className="panel-heading">
                <h1 className="panel-title">Bridge settings</h1>
              </div>
              <div className="panel-body">
                <div className="col-xs-7 col-sm-7">
                    <input id="bridge-base" className="form-control"
                      defaultValue = {url} type="text" placeholder="URL to bridge" />
                </div>
                <div className="btn-toolbar">
                    <button className="col-xs-2 btn btn-primary btn"
                      onClick={handleReload}
                    >
                      Load
                    </button>
                    <button className="col-xs-2 btn btn-primary"
                      onClick={() => window.open(url)}
                    >
                      Go
                    </button>
                </div>
              </div>
          </div>


          { !newHub &&
          <div className="panel panel-default panel-success">
              <div className="panel-heading">
                <h2 className="panel-title">Hubs</h2>
              </div>
              <div className="panel-body">
                <div className="form-group">
                    <div className="col-xs-1"></div>
                    <div className="col-xs-11">
                      { hubs.map((name, key) => {
                        return (
                          <label className="radio" key={key}>
                              <input value={name} type="radio" name="radio"
                                checked={name===selected.hub}
                                onChange={hubChange}
                              />{name}
                          </label>
                        );
                      })}
                    </div>
                    <div className="cols-xs-12 text-center">
                        { selected.hub !== "Generic" && selected.hub !== "All" &&
                          <button className="btn" onClick={(event) => handleAddHubClick(event, 'edit')}>Edit</button>
                        }
                        { selected.hub !== "Generic" && selected.hub !== "All" &&
                          <button className="btn" onClick={(event) => handleAddHubClick(event, 'delete')}>Delete</button>
                        }
                        <button className="btn" onClick={handleAddHubClick}>Add</button>
                    </div>
                </div>
              </div>
          </div>
        }{/* Hubs List */}

          { newHub &&
          <div className="panel panel-default panel-success">
              <div className="panel-heading">
                <h2 className="panel-title">New Hub</h2>
              </div>
              <div className="panel-body">
                <form>
                    <div className="form-group">
                      <label htmlFor="hub-name">Name</label>
                      <input type="text" className="form-control" id="hub-name"
                        onChange={event => tempHub.name=event.target.value}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="hub-pattern">URL Pattern</label>
                      <input type="text" className="form-control" id="hub-pattern"
                        onChange={event => tempHub.url=event.target.value}
                      />
                    </div>
                    <span className="col-xs-12">TODO: put preview here</span>
                    <div className="form-group">
                      <label htmlFor="exampleSelect1">Example select</label>
                      <select className="form-control" id="exampleSelect1"
                        onChange={event => tempHub.type=event.target.value}
                      >
                        { newHub.types && newHub.types.map((type, key) =>
                          <option key={key} value={type}>{type}</option>
                        )}
                      </select>
                    </div>
                </form>
                <div className="cols-xs-12 text-center">
                  <button className="btn btn-danger cancel-hub" onClick={handleAddHubClick}>Cancel</button>
                  <button className="btn btn-info submit-hub" onClick={handleAddHubClick}>Add Hub</button>
                </div>
              </div>
          </div>
        }{/* new hub */}

          { currentDevices.length > 0 && !newHub &&
          <div className="panel panel-default panel-success">
              <div className="panel-heading">
                <h2 className="panel-title">{selected.hub} devices</h2>
              </div>
              <table className="table table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                  { currentDevices
                    .map(x => x.name)
                    .map((name, key) => {
                      return (
                        <tr key={key}>
                            <td>{name}</td>
                            <td className="text-center">
                                <button className="btn btn-info" onClick={() => handleDeviceChange('on', name)}>ON</button>
                                <button className="btn btn-info" onClick={() => handleDeviceChange('off', name)}>OFF</button>
                                { selected.hub !== 'All' &&
                                <button className="btn btn-danger" onClick={() => handleDeviceChange('edit', name)}>Edit</button>
                                }
                                { selected.hub !== 'All' &&
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
          }{/* currentDevices list */}

          { selected.hub !== 'All' && !newHub &&
          <div className="panel panel-default panel-success">
              <div className="panel-heading">
                <h2 className="panel-title">{(selected.device ? "Edit " : "Add ") + selected.hub} device</h2>
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

// selected={}, hubs=[], devices=[], newHub,
// handleHubChange = () => {},
// handleAddHub = () => {},
// handleReload = () => {},
// handleDeviceChange = () => {},
// url

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
