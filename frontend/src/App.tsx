import React from 'react';
import './App.css';
import Report from "./components/Report";
import Stock from "./components/Stock";

function App() {
  return (
    <div className="App">
      <header className="App-header">
            <Report></Report>
          <Stock></Stock>
      </header>
    </div>
  );
}

export default App;
