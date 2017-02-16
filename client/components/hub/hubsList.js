import React from 'react';

function HubsList({
  selected={}, hubs=[], newHub,
  hubChange = () => {},
  handleAddHubClick = () => {}
}){

  const component = (
  <div>{ !newHub &&
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
  }</div>
  );

  return component;
}

HubsList.propTypes = {
  selected: React.PropTypes.object,
  hubs: React.PropTypes.array,
  hubchange: React.PropTypes.func,
  handleAddHubClick: React.PropTypes.func
};

export default HubsList;
