import React from 'react';

var tempHub = {
  name: 'TODO: change tempHub!'
};

function duplicate({
  selected={}, hubs=[], devices=[], newHub,
  handleHubChange = () => {},
  handleAddHub = () => {}
}){
  const hubChange = (event) => {
    const hub = event.target.value;
    handleHubChange(hub);
  };

  const handleAddHubClick = (event) => {
    var newHub = undefined;
    if(!!~event.target.className.indexOf('submit-hub')){
      newHub = JSON.parse(JSON.stringify(tempHub));
    }
    if(!!~event.target.className.indexOf('cancel-hub')){
      newHub = 'cancel';
    }
    handleAddHub(newHub);
  };

  //TODO: change tempHub when newHub dialog changes

  const currentDevices = selected.hub === 'All'
    ? devices
    : devices.filter(x => x.hub === selected.hub);

  const duplicate = (
    <div>
      <nav className="navbar navbar-custom navbar-fixed-top">
          <div className="container">
              <div className="navbar-header">
                  <a className="navbar-brand" href="#">HA Bridge Configuration</a>
              </div>
          </div>
      </nav>
      <div className="container">
          <div className="panel panel-default panel-success bridgeServer">
              <div className="panel-heading">
                <h1 className="panel-title">Bridge settings</h1>
              </div>
              <div className="panel-body">
                  <form className="form">
                      <div className="col-xs-7 col-sm-7">
                          <input id="bridge-base" className="form-control" type="text" placeholder="URL to bridge" />
                      </div>
                      <div className="btn-toolbar">
                          <button type="submit" className="col-xs-2 col-sm-1 btn btn-primary btn">
                            Load
                          </button>
                          <button type="submit" className="col-xs-2 col-sm-1 btn btn-primary">
                            Go
                          </button>
                      </div>
                  </form>
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
                      { !newHub &&
                        <button className="btn" type="submit" onClick={handleAddHubClick}>Add A New Hub</button>
                      }
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
                      <input type="text" className="form-control" id="hub-name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="hub-pattern">URL Pattern</label>
                      <input type="text" className="form-control" id="hub-pattern" />
                    </div>
                    <span className="col-xs-12">TODO: put preview here</span>
                    <div className="form-group">
                      <label htmlFor="exampleSelect1">Example select</label>
                      <select className="form-control" id="exampleSelect1">
                        <option>todo plugin type</option>
                        <option>todo plugin type</option>
                        <option>todo plugin type</option>
                      </select>
                    </div>
                </form>
                <div className="cols-xs-12 text-center">
                  <button className="btn btn-danger cancel-hub" onClick={handleAddHubClick}>Cancel</button>
                  <button className="btn btn-info submit-hub" type="submit" onClick={handleAddHubClick}>Add Hub</button>
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
                                <button className="btn btn-info" type="submit">ON</button>
                                <button className="btn btn-info" type="submit">OFF</button>
                                { selected.hub !== 'All' &&
                                <button className="btn btn-danger" type="submit">Edit</button>
                                }
                                { selected.hub !== 'All' &&
                                <button className="btn btn-danger" type="submit">Delete</button>
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
                <h2 className="panel-title">New {selected.hub} device</h2>
              </div>
              <ul className="list-group">
                  <li className="list-group-item">
                      <form className="form-horizontal">
                          <div className="form-group">
                              <div className="col-xs-8 col-sm-7">
                                  <input type="text" className="form-control" id="device-name"placeholder="Device Name" />
                              </div>
                              <button type="submit" className="col-xs-3 col-sm-2 btn btn-primary">
                                  Add Device
                              </button>
                          </div>
                          <div className="form-group">
                              <div className="col-xs-8 col-sm-7">
                                  <input type="text" className="form-control" id="device-on-url" placeholder="URL to turn device on" />
                              </div>
                              <button className="col-xs-3 col-sm-2 btn btn-success" type="button">
                                On Test
                              </button>
                          </div>
                          <div className="form-group">
                              <div className="col-xs-8 col-sm-7">
                                  <input type="text" className="form-control" id="device-off-url" placeholder="URL to turn device off" />
                              </div>
                              <button className="col-xs-3 col-sm-2 btn btn-success" type="button">
                                Off Test
                              </button>
                          </div>
                      </form>
                  </li>
              </ul>
          </div>
          }{/* new device */}
      </div>
    </div>
  );

  return duplicate;
}

export default duplicate;
