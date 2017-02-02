import React from 'react';
import Menu from './menu';
import Body from './body';

class App extends React.Component {
  render () {
    return <div>
        <Menu />
        <Body />
    </div>

  }
}

export default App;