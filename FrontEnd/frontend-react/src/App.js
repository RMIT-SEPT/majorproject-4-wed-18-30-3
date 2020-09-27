import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import Dashboard from './components/Dashboard/Dashboard';
import BookingScreen from './components/BookingScreen/BookingScreen';
import LoginScreen from './components/LoginScreen/LoginScreen';
import RegisterScreen from './components/RegisterScreen/RegisterScreen';
import CalendarViewScreen from './components/CalendarViewScreen/CalendarViewScreen';
import WeeklyViewScreen from './components/WeeklyViewScreen/WeeklyViewScreen';
import ProfileScreen from './components/ProfileScreen/ProfileScreen';
import AvailabilitiesScreen from './components/AvailabilitiesScreen/AvailabilitiesScreen';
import AdminScreen from './components/AdminScreen/AdminScreen';
import AboutScreen from './components/AboutScreen/AboutScreen';
import HistoryScreen from './components/HistoryScreen/HistoryScreen';
import MyBookingsScreen from './components/MyBookingsScreen/MyBookingsScreen';


// need to add a redirect from the landing page to dashboard

function App() {
  return (
    <Router>
    <div className="App">
            
      <Route exact path="/"><Redirect to="/login"/></Route>
      <Route path="/index" component={LoginScreen}/>
      <Route path="/main" component={LoginScreen}/>
      <Route path="/home" component={LoginScreen}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="/bookings" component={BookingScreen}/>
      <Route path="/my_bookings" component={MyBookingsScreen}/>
      <Route path="/login" component={LoginScreen}/>
      <Route path="/register" component={RegisterScreen}/>
      <Route path="/calendar_view" component={CalendarViewScreen}/>
      <Route path="/weekly_view" component={WeeklyViewScreen}/>
      <Route path="/profile" component={ProfileScreen}/>
      <Route path="/availabilites" component={AvailabilitiesScreen}/>
      <Route path="/admin_portal" component={AdminScreen}/>
      <Route path="/about" component={AboutScreen}/>
      <Route path="/history" component={HistoryScreen}/>

    </div>
    </Router>
  );
}

export default App;
