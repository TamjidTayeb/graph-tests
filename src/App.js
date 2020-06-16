import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactGraph from './ReactGraph';
import VisGraph from './VisGraph';


class App extends Component { 
  render() {
    
    return (
      <div className="App">
        <ReactGraph/>
        {/* <VisGraph/> */}
      </div>
    );
  }
}

export default App;
