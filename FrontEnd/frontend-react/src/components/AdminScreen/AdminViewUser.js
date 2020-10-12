import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from '../Layout/Header';
import axios from "axios";
import Footer from "../Layout/Footer";

const DNS_URI = "http://localhost:8080"
async function getUser(token, userName) {
    var urlString = '/api/customer' + userName;
    console.log(token)
    return await axios.post(DNS_URI + urlString,{
        headers: {
            'Authorization': token }
        }).then(function(response) {
        console.log('Authenticated');
        return response.data
        }).catch(function(error) {
        console.error("getUser()", error)
        console.log(error.response.data)
        });
}
class AdminViewUser extends Component {
    constructor() {
        super();
        this.state = {
            userName: null,
            userType: null,
            hasSuccess: false,
            totalBookings: 0,
            bookings:this.loadCustomer(),
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.viewAppointment = this.viewAppointment(this)
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    async loadCustomer() {
        if (this.props.token !== undefined) {
            const customer = await getUser(this.props.token, this.props.userName).then()
            var customerBookings = []
            if (customer !== undefined) {
                var Booking = "No bookings yet"
                var bookingCount = 0
                var time = ""
                if (customer.bookings.length > 0) {
                    for (let i = 0; i < customer.bookings.length; i++) {
                            Booking = customer.bookings[i]
                            time = customer.bookings[i].timeslot.date
                            bookingCount++
                            customerBookings.push({
                                booking: Booking,
                                date: time,
                            })
                    }
                    this.setState({bookings: customerBookings})
                    this.setState({totalBookings: bookingCount})
                    return customerBookings
                }
            }
        }
    }
    async viewAppointment(booking){
        alert(booking.toString());
    }
    async onSubmit(e) {
        e.preventDefault()
        if (this.props.userType === "ADMIN") {
                const success = await this.loadCustomer();
                if(success){
                this.setState({hasSuccess: true});
            }
        }
        else{
            alert("you must be an admin to view customer appointments!")
        }
    }
    render() {
        if (this.props.userName === undefined && this.props.userType === undefined) {
            return (
                <div className="profile_screen_editprofile" id="profile_screen_editprofile">
                    <Header/>
                    <br/><br/><br/><br/>
                    <b>Please <a href="/login">log in </a> to use the app.</b>
                    <br/><br/>
                    <Footer/>
                </div>
            )

        } else {
            const bookings = this.state.bookings;
            const bookingsAmount = this.state.totalBookings;
            var bookingDisplay
            if(Array.isArray(bookings)) {

                var count = 0;
                bookingDisplay = bookings.map((user) => {
                    return (
                        <div className="list-group-item d-flex justify-content-between align-items-center"
                             key={++count}>
                            {user.date}
                            <button onClick={this.viewAppointment()}>View Appointment</button>
                            <span className="badge badge-primary badge-pill">{bookingsAmount} total bookings</span>
                        </div>
                    )
                })
            }
            if (this.state.hasSuccess === false) {
                return (
                    <div className="AdminViewUser">
                        <Header/>
                        <br/><br/><br/><br/>
                        <div className="Heading">
                            <h1>Search for appointment</h1>
                            <p>Enter a username of a customer and click submit to view all their bookings!</p>
                            <br/><br/>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-sm"></div>
                                <div className="col-sm">
                                    <div className="form-group">

                                        <input type="text" className="form-control"
                                               placeholder="Username"
                                               id="userName"
                                               name={"userName"}
                                               value={this.state.value}
                                               onChange={this.onChange}>
                                        </input>

                                    </div>
                                </div>
                                <div className="col-sm"></div>
                            </div>
                            <div className="row">
                                <div className="col-sm"></div>
                                <div className="col-sm">
                                    <input type="submit" className="btn btn-sm btn-dark" placeholder="Search"
                                           id="navButton"/>
                                </div>
                                <div className="col-sm"></div>
                            </div>
                        </form>
                    </div>
                )
            } else {
                return (
                    <div className="adminViewUser">
                        <h1>Bookings:</h1>
                            <div className="col-sm">
                                {bookingDisplay}
                            </div>
                    </div>
                )
            }
        }
    }
}
export default AdminViewUser;
