var React     = require('react');
var TopMenu   = require('impromptu-react-animated-header').TopMenu;
var MenuItem  = require('impromptu-react-animated-header').MenuItem;
var MenuBrand = require('impromptu-react-animated-header').MenuBrand;

TopMenu.toggleExpanded = () => console.log('hello');

var MyMenu = React.createClass({
    render: function() {

        return (
            <TopMenu>
                <MenuBrand>
                    <a href="#home">HA Bridge Configuration</a>
                </MenuBrand>
                <MenuItem>
                    <a href="#home">Bridge</a>
                </MenuItem>
                <MenuItem>
                    <a href="#about">Devices</a>
                </MenuItem>
                <MenuItem>
                    <a href="#configuration">New Device</a>
                </MenuItem>
             </TopMenu>
        );
    }
});

module.exports = MyMenu;
