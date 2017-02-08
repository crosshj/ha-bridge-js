import React from 'react';

function duplicate(props){
	const duplicate = (
		<div>
			<nav className="navbar navbar-inverse navbar-fixed-top">
			    <div className="container">
			        <div className="navbar-header">
			            <a className="navbar-brand" href="#">HA Bridge Configuration</a>
			        </div>
			    </div>
			</nav>
			<div className="container">
				<div>
			        <div className="panel panel-default bridgeServer">
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

              <div>
                  <div className="panel panel-default">
                      <div className="panel-heading">
                        <h2 className="panel-title">Hubs</h2>
                      </div>
                      <div className="panel-body">
                        <div className="form-group">
                            <div className="col-xs-1"></div>
                            <div className="col-xs-11">
                              { ['Milight', 'Wink', 'Hue', 'Default'].map((name, key) => {
                                return (
                                  <label className="radio" key={key}>
                                      <input value={key} type="radio" name="radio" defaultChecked={name==='Default'}/>{name}
                                  </label>
                                );
                              })}
                            </div>
                        </div>
                      </div>
                  </div>
              </div>

			        <div className="panel panel-default">
			            <div className="panel-heading">
			            	<h2 className="panel-title">Current devices</h2>
		            	</div>
		            	<table className="table table-bordered table-striped table-hover">
			                <thead>
				                <tr>
				                    <th>Name</th>
				                    <th>Actions</th>
				                </tr>
			                </thead>
			                <tbody>
					            { ['_den', '_master_b_room', 'WifiPlugOne'].map((name, key) => {
						            return (
							                <tr key={key}>
							                    <td>{name}</td>
							                    <td>
							                        <button className="btn btn-info" type="submit">ON</button>
							                        <button className="btn btn-info" type="submit">OFF</button>
							                        <button className="btn btn-danger" type="submit">Edit</button>
							                        <button className="btn btn-danger" type="submit">Delete</button>
							                    </td>
							                </tr>
						            	);
						        	})
					        	}
				            </tbody>
			            </table>

			        </div>
			    </div>

			    <div>
			        <div className="panel panel-default bridgeServer">
			            <div className="panel-heading">
			            	<h2 className="panel-title">New device</h2>
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
			    </div>
			</div>
		</div>
	);

	return duplicate;
}

export default duplicate;
