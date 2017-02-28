import React from 'react';

const ToggleButton = ({state = 'off', clickHandler = ()=> {}}) => {
return (
  <label className="switch">
    <input type="checkbox" defaultChecked={state==='on'}  onClick={clickHandler}/>
    <div className="slider round"></div>
  </label>
);
};

ToggleButton.propTypes = {
  state: React.PropTypes.string,
  clickHandler: React.PropTypes.func
};

export default ToggleButton;
