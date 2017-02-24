import React from 'react';

function ModifyHub({
  tempHub, newHub,
  handleAddHubClick = () => {},
  visibility = {}
}){

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

  const hubNameChange = event => {
    if (newHub && newHub.name && newHub.name !== event.target.value){
      tempHub.name=event.target.value;
      addUpdateButtonRef.style.display='';
    }
    if (!newHub || !newHub.name){
      tempHub.name=event.target.value;
      addUpdateButtonRef.style.display='';
    }
  };

  const hubUrlChange = event => {
    if (newHub && newHub.url && newHub.url !== event.target.value){
      tempHub.url=event.target.value;
      addUpdateButtonRef.style.display='';
    }
    if (!newHub || !newHub.url){
      tempHub.url=event.target.value;
      addUpdateButtonRef.style.display='';
    }
    exampleUrlRef.innerHTML = 'eg. ' + getExampleUrl(tempHub.type || newHub.type, newHub.types, event.target.value);
  };

  const hubTypeChange = event => {
    if (newHub && newHub.type && newHub.type !== event.target.value){
      tempHub.type=event.target.value;
      addUpdateButtonRef.style.display='';
    }
    if (!newHub || !newHub.type){
      tempHub.type=event.target.value;
      addUpdateButtonRef.style.display='';
    }
    exampleUrlRef.innerHTML = 'eg. ' + getExampleUrl(event.target.value, newHub.types, tempHub.url || newHub.url);
  };

  const component = (
  <div>
  { newHub && visibility.hubs &&
    <div className="panel panel-default panel-success">
        <div className="panel-heading">
          <h2 className="panel-title">{newHub.uuid ? 'Edit' : 'New'} Hub</h2>
        </div>

        <div className="panel-body">
          <form>
              <div className="form-group">
                <label htmlFor="hub-name">Name</label>
                <input type="text" className="form-control" id="hub-name"
                  autoComplete="off" defaultValue={newHub && newHub.name}
                  onChange={hubNameChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="hub-pattern">URL Pattern</label>
                <input type="text" className="form-control" id="hub-pattern"
                  autoComplete="off" defaultValue={newHub && newHub.url}
                  onChange={hubUrlChange}
                />
              </div>

              <div className="panel-body text-muted" style={{paddingTop: 0, paddingLeft: 0}}>
                <span className="col-xs-12"
                  ref={ref => exampleUrlRef=ref }
                >{ newHub.url &&  ('eg. ' + getExampleUrl(newHub.type, newHub.types, tempHub.url || newHub.url)) }</span>
              </div>

              <div className="form-group">
                <label htmlFor="typeSelect">Type</label>
                <select className="form-control" id="typeSelect"
                  defaultValue={newHub && newHub.type} onChange={hubTypeChange}
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
              onClick={handleAddHubClick} style={{display: 'none'}}
              ref={ref => addUpdateButtonRef = ref}
            >{newHub.uuid ? 'Update' : 'Add'} Hub
            </button>
          </div>

        </div>
    </div>
    }{/* new hub */}
  </div>
  );

  return component;
}

ModifyHub.propTypes = {
  selected: React.PropTypes.object,
  hubs: React.PropTypes.array,
  hubchange: React.PropTypes.func,
  handleAddHubClick: React.PropTypes.func
};

export default ModifyHub;
