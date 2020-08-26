import React from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import Header from './components/Layout/Header';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
