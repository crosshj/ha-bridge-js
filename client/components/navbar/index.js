import React from 'react';
import HomeIcon from './homeIcon';
var menuRef;

const hamburgerClick = (menuRef) => {
  if (~menuRef.className.indexOf('in')) {
    menuRef.className = menuRef.className.replace(' in', '');
    menuRef.style.height = '1px';
  }else{
    menuRef.className += ' in';
    menuRef.style.height = '';
  }
};

const makeMenu = (items, menuRef) => items.map((item, key) =>
  <li key={key}>
    <a onClick={event => {
      menuRef.className = menuRef.className.replace(' in', '');
      menuRef.style.height = '1px';
      return item.action(event);
    }}
    >{item.name}</a>
  </li>
);

const Navbar = ({menuItems=[]}) => {
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


/*
<nav class="navbar navbar-inverse navbar-static-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="navbar-collapse collapse" id="bs-example-navbar-collapse-1" aria-expanded="false" style="height: 1px;">
        <ul class="nav navbar-nav">
          <li><a href="index.php">Home</a></li>
          <li><a href="about.php">About</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="contact.php">Contact</a></li>
        </ul>
      </div>
    </div>
</nav>
*/
