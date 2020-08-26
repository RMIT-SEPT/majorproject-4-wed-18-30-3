import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import BookingScreen from './components/BookingScreen/BookingScreen';
import LoginScreen from './components/LoginScreen/LoginScreen';
import RegisterScreen from './components/RegisterScreen/RegisterScreen';

import {BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Header/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/booking" component={BookingScreen}/>
      <Route path="/login" component={LoginScreen}/>
      <Route path="/register" component={RegisterScreen}/>
      <Footer/>
    </div>
    </Router>
  );
}

export default App;
