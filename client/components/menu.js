var React     = require('react');
var TopMenu   = require('impromptu-react-animated-header').TopMenu;
var MenuItem  = require('impromptu-react-animated-header').MenuItem;
var MenuBrand = require('impromptu-react-animated-header').MenuBrand;

var MyMenu = React.createClass({
    render: function() {

        return (
            <TopMenu cssTransitions align='right'>
                <MenuBrand>
                    <a href="#home">HA Bridge Configuration</a>
                </MenuBrand>
                <MenuItem>
                    <a href="#bridge-section">Bridge</a>
                </MenuItem>
                <MenuItem>
                    <a href="#devices-section">Devices</a>
                </MenuItem>
                <MenuItem>
                    <a href="#newDevice-section">New Device</a>
                </MenuItem>
             </TopMenu>
        );
    }
});

module.exports = MyMenu;
