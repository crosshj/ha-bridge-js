import React from 'react';

function BridgeSettings({
  url = '',
  visibility = {},
  handleReload = () => {}
}){

  const component = (
  <div>{ visibility.bridge &&
    <div className="panel panel-default panel-success bridgeServer">
        <div className="panel-heading">
          <h1 className="panel-title">Bridge</h1>
        </div>
        <div className="panel-body">
          <div className="col-m-12">
              <input id="bridge-base" className="form-control"
                defaultValue = {url} type="text" placeholder="URL to bridge" />
          </div>
          <div className="col-m-12 text-center">&nbsp;</div>
          <div className="col-m-12 text-center">
              <button className="btn btn-primary btn"
                onClick={handleReload}
              >
                Load
              </button>
              <button className="btn btn-primary"
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
