import React from 'react';
import HomeIcon from './homeIcon';
var menuRef;

const hideMenu = (menuRef, event) => {
  if(event && (~(event.target.className||'').indexOf('navbar-toggle') || ~(event.target.className||'').indexOf('icon-bar'))){
    return;
  }
  if (!menuRef) return;
  menuRef.className = menuRef.className.replace(' in', '');
  menuRef.style.height = '1px';
};

const hamburgerClick = (menuRef) => {
  if (~menuRef.className.indexOf('in')) {
    hideMenu(menuRef);
  }else{
    menuRef.className += ' in';
    menuRef.style.height = '';
  }
};

const makeMenu = (items) => items.map((item, key) =>
  <li key={key}>
    <a onClick={event => {
      return item.action(event);
    }}
    >{item.name}</a>
  </li>
);

const Navbar = ({menuItems=[]}) => {
  document.addEventListener('click', (event)=>hideMenu(menuRef, event));
  return (<div>
    <nav className="navbar navbar-custom navbar-fixed-top">
        <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed"
                aria-expanded="false"
                onClick={() => hamburgerClick(menuRef)}
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand"><HomeIcon />ha-bridge-js</a>
            </div>
            <div className="navbar-collapse collapse" id=""
              aria-expanded="false" style={{height: "1px"}}
              ref={ref => menuRef = ref}
            >
              <ul className="nav navbar-nav">
                {makeMenu(menuItems, menuRef)}
              </ul>
            </div>
        </div>
    </nav>
  </div>);
};

Navbar.propTypes = {
  menuItems: React.PropTypes.array
};

export default Navbar;
