import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Dashboard from '../Dashboard/Dashboard';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import axios from "axios";
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import BookingScreen from '../BookingScreen/BookingScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import AvailabilitiesScreen from '../AvailabilitiesScreen/AvailabilitiesScreen';
import RegisterScreen from '../RegisterScreen/RegisterScreen';
import WeeklyViewScreen from '../WeeklyViewScreen/WeeklyViewScreen';
import CalendarViewScreen from '../CalendarViewScreen/CalendarViewScreen';
import HistoryScreen from '../HistoryScreen/HistoryScreen';
import AboutScreen from '../AboutScreen/AboutScreen';
import MyBookingsScreen from '../MyBookingsScreen/MyBookingsScreen';
import CancelBookingScreen from '../CancelBookingScreen/CancelBookingScreen';
import SetAvailabilitiesScreen from '../SetAvailabilitesScreen/SetAvailabilitiesScreen';
import AdminBookingSummary from '../AdminScreen/AdminBookingSummary';
import AdminAddWorker from '../AdminScreen/AdminAddWorker';
import AdminViewUser from '../AdminScreen/AdminViewUser';
import AdminSetAvailabilities from '../AdminScreen/AdminSetAvailabilities';
import AdminEditUser from '../AdminScreen/AdminEditUser';
import logo from './agme.png'

const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"
const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
    }}

async function getUserConfirm(userName, password) {

    // console.log(JSON.stringify({
    //     "userName": userName,
    //     "password": password
    // }))

    return await axios.post(DNS_URI + '/api/user/login', {
        "userName": userName,
        "password": password
    }, axiosConfig)
        .then(res => {
            return [true, res]
        })
        .catch(error => {
            console.error(error)
            console.error(error.response.data)
            return [false, error]
        })
}

class LoginScreen extends Component {
  
    constructor() {
        super();
        this.state = {
            id: null,
            userName: "",
            password: "",
            address: null,
            phone: null,
            userType: null,
            token: null,
            hasSuccess: false,
            hasFail: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    async onSubmit(e) {
        e.preventDefault()
        
        if(document.getElementById("userName").value == null || document.getElementById("password").value == null){
            alert("Please enter a username and password.")
            return
        }
        
        // Set state accoring to the REST response
        const success = await getUserConfirm(this.state.userName, this.state.password).then()
        if (success[0]) {
            this.setState({userType: success[1].data["userType"]})
            this.setState({token: success[1].data["token"]})
            this.setState({hasFail: false})
            this.setState({hasSuccess: true})
        } else {
            this.setState({hasSuccess: false})
            this.setState({hasFail: true})
        }
    }

    render() {
    if (!this.state.hasSuccess && !this.state.hasFail) {
        return(
            <div className = "Login_Ui">
            <Header/>
                <br/><br/><br/><br/><br/>

                <div className="row">
                    <div className="col-sm"></div>  
                    <div className="col-sm">
                    <br/><br/>
            
                    <img src={logo} alt="AGME" id="login_image" className="border-right border-dark"/>
                    
                    </div>  
                    <div className="col-sm">
                        <br/><br/><br/>
            
                            <form onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-10">
                                    <div className = "form-group">
                                        
                                        <input type="text" className="form-control"
                                                placeholder="Username"
                                                id="userName" 
                                                name={"userName"} 
                                                value={this.state.value}
                                                onChange={this.onChange}>
                                        </input>

                                    </div>    
                                </div>
                                <div className="col-1"></div>
                                </div>

                                <div className="row">
                                    <div className="col-10">    
                                        <div className = "form-group">
                                            
                                            <input type="password" className="form-control"
                                                    placeholder="Password"
                                                    id="password"
                                                    name={"password"}
                                                    value={this.state.value}
                                                    onChange={this.onChange}>
                                            </input>
                                            
                                            </div>    
                                        </div>
                                    <div className="col-1"></div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-10">
                                        <input type="submit" value="Sign in" className="btn btn-outline-dark" id="navButton"/>
                                    </div>
                                    <div className="col-1"></div>    
                                </div>

                                <div className="row form-group">
                                    <div className="col-10">
                                        <a href="/register" className="btn btn-outline-dark" id="navButton">Register</a>
                                    </div>
                                    <div className="col-1"></div>    
                                </div>

                            </form>
                            <br/><br/><br/>
                        </div>
                    <div className="col-sm"></div>  
                </div>
            <Footer/>
            </div>
            )
        }
    if(this.state.hasSuccess) {
        return(
        <Router>
            <div className = "Login_Ui">
                <Route exact path="/dashboard" render={(props) => (
                    <Dashboard {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
                <Route exact path="/logout" render={(props) => (
                    <LoginScreen {...props}/>
                        
                )}/>
                <Route exact path="/login" render={(props) => (
                    <LoginScreen {...props}/>
                        
                )}/>
                
                <Route exact path="/bookings" render={(props) => (
                    <BookingScreen {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>

                <Route exact path="/bookings_reset" render={(props) => (
                    <BookingScreen {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>

                <Route exact path="/my_bookings" render={(props) => (
                    <MyBookingsScreen {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
                <Route exact path="/cancel" render={(props) => (
                    <CancelBookingScreen {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
                <Route exact path="/profile" render={(props) => (
                    <ProfileScreen {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
                <Route exact path="/availabilites" render={(props) => (
                    <AvailabilitiesScreen {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
                <Route exact path="/set_availabilites" render={(props) => (
                    <SetAvailabilitiesScreen {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
                <Route exact path="/set_availabilites_reset" render={(props) => (
                    <SetAvailabilitiesScreen {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
                <Route exact path="/register" render={(props) => (
                    <RegisterScreen {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
                <Route exact path="/weekly_view" render={(props) => (
                    <WeeklyViewScreen {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
                <Route exact path="/calendar_view" render={(props) => (
                    <CalendarViewScreen {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>

                <Route exact path="/history" render={(props) => (
                    <HistoryScreen {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
                <Route exact path="/about" render={(props) => (
                    <AboutScreen {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
    
                <Route exact path="/admin_view_user" render={(props) => (
                    <AdminViewUser {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>

                <Route exact path="/admin_set_availabilities" render={(props) => (
                    <AdminSetAvailabilities {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>

                <Route exact path="/admin_set_availabilities_reset" render={(props) => (
                    <AdminSetAvailabilities {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>

                <Route exact path="/admin_booking_summary" render={(props) => (
                    <AdminBookingSummary {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>

                <Route exact path="/admin_add_worker" render={(props) => (
                    <AdminAddWorker {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>

                <Route exact path="/admin_edit_user" render={(props) => (
                    <AdminEditUser {...props}
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
                
                <Redirect to="/dashboard" render={(props) => (
                    <Dashboard {...props} 
                        userName={this.state.userName}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
                
            </div>
        </Router>
        )
    }
    else if(this.state.hasFail){
        alert("Incorrect password or username.")
        return(
            <Router>
                <div className = "Login_Ui">
                    <Redirect to= "/login" component={LoginScreen}/>
                    <Route path="/login" component={LoginScreen} />
                </div>
            </Router>
        )
    }
    }
}
export default LoginScreen;