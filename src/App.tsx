import React from 'react';
import 'bootstrap/scss/bootstrap.scss';
import './App.scss';
import CalcBody from './components/CalcBody';

function App() {
  return (
    <div className="container main_app">
      <CalcBody />
    </div>
  );
}

export default App;
