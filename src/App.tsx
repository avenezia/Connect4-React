import * as React from 'react';
import './App.css';
import Game from './components/game';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Connect4 in React</h1>
        </header>
        <Game />
      </div>
    );
  }
}

export default App;
