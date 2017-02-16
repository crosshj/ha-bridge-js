import React from 'react';

function BridgeSettings({
  url = '',
  bridgeVisible = true,
  handleReload = () => {}
}){

  const component = (
  <div>{ bridgeVisible &&
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
  }</div>
  );

  return component;
}

BridgeSettings.propTypes = {
  url: React.PropTypes.string,
  bridgeVisible: React.PropTypes.bool,
  handleReload: React.PropTypes.func
};

export default BridgeSettings;
