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
  //tempHub = newHub || tempHub;

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

  const currentDevices = selected.hub.name === 'All'
    ? devices
    : devices.filter(x => (x.hub && x.hub.uuid === selected.hub.uuid) || (selected.hub.name === 'Generic' && !x.hub));

  var addUpdateButtonRef = undefined;
  var exampleUrlRef = undefined;

  const getExampleUrl = (type, types, url) => {
    type = type || types[0].name;

    return types.find(x => x.name === type)
      .urlPattern
      .replace('{base}', url)
      .replace('{deviceId}', '0')
      .replace('{state}', 'on');
  };

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
                      { hubs && hubs.map((hub, key) => {
                        return (
                          <label className="radio" key={key}>
                              <input value={hub.name} type="radio" name="radio"
                                checked={hub.name===selected.hub.name}
                                onChange={hubChange}
                              />{hub.name}
                          </label>
                        );
                      })}
                    </div>
                    <div className="cols-xs-12 text-center">
                        { selected.hub.name !== "Generic" && selected.hub.name !== "All" &&
                          <button className="btn" onClick={(event) => handleAddHubClick(event, 'edit')}>Edit</button>
                        }
                        { selected.hub.name !== "Generic" && selected.hub.name !== "All" &&
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
                <h2 className="panel-title">{newHub.uuid ? 'Edit' : 'New'} Hub</h2>
              </div>
              <div className="panel-body">
                <form>
                    <div className="form-group">
                      <label htmlFor="hub-name">Name</label>
                      <input type="text" className="form-control" id="hub-name"
                        autoComplete="off"
                        defaultValue={newHub && newHub.name}
                        onChange={event => {
                          if (newHub && newHub.name && newHub.name !== event.target.value){
                            tempHub.name=event.target.value;
                            addUpdateButtonRef.style.display='';
                          }
                          if (!newHub || !newHub.name){
                            tempHub.name=event.target.value;
                            addUpdateButtonRef.style.display='';
                          }
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="hub-pattern">URL Pattern</label>
                      <input type="text" className="form-control" id="hub-pattern"
                        autoComplete="off"
                        defaultValue={newHub && newHub.url}
                        onChange={event => {
                          if (newHub && newHub.url && newHub.url !== event.target.value){
                            tempHub.url=event.target.value;
                            addUpdateButtonRef.style.display='';
                          }
                          if (!newHub || !newHub.url){
                            tempHub.url=event.target.value;
                            addUpdateButtonRef.style.display='';
                          }
                          exampleUrlRef.innerHTML = 'eg. ' + getExampleUrl(newHub.type, newHub.types, event.target.value);
                        }}
                      />
                    </div>
                    <div className="panel-body text-muted" style={{paddingTop: 0, paddingLeft: 0}}>
                      <span className="col-xs-12"
                        ref={ref => exampleUrlRef=ref }
                      >{ newHub.url &&  ('eg. ' + getExampleUrl(newHub.type, newHub.types, newHub.url)) }</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="typeSelect">Type</label>
                      <select className="form-control" id="typeSelect"
                        defaultValue={newHub && newHub.type}
                        onChange={event => {
                          if (newHub && newHub.type && newHub.type !== event.target.value){
                            tempHub.type=event.target.value;
                            addUpdateButtonRef.style.display='';
                          }
                          if (!newHub || !newHub.type){
                            tempHub.type=event.target.value;
                            addUpdateButtonRef.style.display='';
                          }
                          exampleUrlRef.innerHTML = 'eg. ' + getExampleUrl(event.target.value, newHub.types, tempHub.url || newHub.url);
                        }}
                      >
                        { newHub.types && newHub.types.map((type, key) =>
                          <option key={key} value={type.name}>{type.name}</option>
                        )}
                      </select>
                    </div>
                </form>
                <div className="cols-xs-12 text-center">
                  <button className="btn btn-danger cancel-hub" onClick={handleAddHubClick}>Cancel</button>
                  <button className={"btn btn-info " +  (newHub.uuid ? 'update-hub' : 'submit-hub')}
                    onClick={handleAddHubClick}
                    style={{display: 'none'}}
                    ref={ref => addUpdateButtonRef = ref}
                  >{newHub.uuid ? 'Update' : 'Add'} Hub
                  </button>
                </div>
              </div>
          </div>
        }{/* new hub */}

          { currentDevices.length > 0 && !newHub &&
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
          }{/* currentDevices list */}

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
