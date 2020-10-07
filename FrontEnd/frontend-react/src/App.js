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
import AboutScreen from './components/AboutScreen/AboutScreen';
import HistoryScreen from './components/HistoryScreen/HistoryScreen';
import MyBookingsScreen from './components/MyBookingsScreen/MyBookingsScreen';
import SetAvailabilitiesScreen from './components/SetAvailabilitesScreen/SetAvailabilitiesScreen';
import AdminBookingSummary from './components/AdminScreen/AdminBookingSummary';
import AdminAddWorker from './components/AdminScreen/AdminAddWorker';
import AdminSetAvailabilities from './components/AdminScreen/AdminSetAvailabilities';
import AdminEditUser from './components/AdminScreen/AdminEditUser';


// need to add a redirect from the landing page to dashboard

function App() {
  return (
    <Router>
    <div className="App">
            
      <Route exact path="/"><Redirect to="/login"/></Route>
      <Route exact path="/bookings_reset"><Redirect to="/bookings"/></Route>
      <Route exact path="/logout"><Redirect to="/login"/></Route>
      <Route exact path="/index" component={LoginScreen}/>
      <Route exact path="/main" component={LoginScreen}/>
      <Route exact path="/home" component={LoginScreen}/>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/bookings" component={BookingScreen}/>
      <Route exact path="/bookings_reset" component={BookingScreen}/>
      <Route exact path="/cancel" component={BookingScreen}/>
      <Route exact path="/my_bookings" component={MyBookingsScreen}/>
      <Route exact path="/login" component={LoginScreen}/>
      <Route exact path="/register" component={RegisterScreen}/>
      <Route exact path="/calendar_view" component={CalendarViewScreen}/>
      <Route exact path="/weekly_view" component={WeeklyViewScreen}/>
      <Route exact path="/profile" component={ProfileScreen}/>
      <Route exact path="/availabilites" component={AvailabilitiesScreen}/>
      <Route exact path="/set_availabilites" component={SetAvailabilitiesScreen}/>
      <Route exact path="/set_availabilites_reset" component={SetAvailabilitiesScreen}/>
      <Route exact path="/admin_booking_summary" component={AdminBookingSummary}/>
      <Route exact path="/admin_add_worker" component={AdminAddWorker}/>
      <Route exact path="/admin_set_availabilites" component={AdminSetAvailabilities}/>
      <Route exact path="/admin_set_availabilites_reset" component={AdminSetAvailabilities}/>
      <Route exact path="/admin_edit_user" component={AdminEditUser}/>
      <Route exact path="/about" component={AboutScreen}/>
      <Route exact path="/history" component={HistoryScreen}/>

    </div>
    </Router>
  );
}

export default App;
