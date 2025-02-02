import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from '../Layout/Header';
import axios from "axios";
import Footer from "../Layout/Footer";
import Select from "react-select";
import makeAnimated from 'react-select/animated';
import NavPane from "../Layout/NavPane";
import {Link} from "react-router-dom";

const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"

async function getUser(token, userName) {

    var urlString = '/api/customer/' +userName
    return await axios.get(DNS_URI + urlString, {
        headers: { 
            'Authorization': token }
        }).then(function(response) {
        console.log('Authenticated');
        return response.data
        }).catch(function(error) {
        console.error("getCustomers()", error)
        console.log(error.response.data)
        });
}
async function getCustomers(token) {

    return await axios.get(DNS_URI + '/api/customer', {
        headers: {
            'Authorization': token }
    }).then(function(response) {
        console.log('Authenticated');
        return response.data
    }).catch(function(error) {
        console.error("getCustomers()", error)
        console.log(error.response.data)
    });
}
async function getCustomerNames(token) {
    const cstmr = await getCustomers(token).then()
    var customers = []
    var temp = []
    if (cstmr !== undefined) {
        for (let i = 0; i < cstmr.length; i++) {
            if(cstmr[i].user.userName !== null) {
                if (!temp.includes(cstmr[i].user.userName)) {
                    customers.push(cstmr[i].user)
                    temp.push(cstmr[i].user.userName)
                }
            }
        }
    }
    return customers
}
class AdminViewUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: null,
            userType: null,
            hasSuccess: false,
            bookings:null,
            optionsCustomers: this.getOptionCustomers(),
            disableCustomer: false,
            viewApp:false,
            count: 0,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onCustomerChange = this.onCustomerChange.bind(this);
        this.getOptionCustomers = this.getOptionCustomers.bind(this);
    }

    onCustomerChange(customer){
        console.log("customer -" + customer.label)
        this.setState({userName: customer.label});
        // this.setState({disableCustomer: true});
    }

    async getOptionCustomers(){
        const options = await getCustomerNames(this.props.token)
        var customerOptions = []
        this.setState({optionsCustomers: options})
        if(options !== undefined){
            for (let i = 0; i < options.length; i++) {
                    customerOptions.push({
                        label: options[i]["userName"],
                        value: options[i]
                    })
            }
        }
        console.log(customerOptions)
        this.setState({optionsCustomers: customerOptions})
        return customerOptions
    }

    async loadCustomer() {
        console.log(this.state.userName)
        if (this.props.token !== undefined && this.props.token !== null) {
            const customers = await getUser(this.props.token, this.state.userName).then()
            var customerBookings = []

            if (customers !== undefined) {
                var Booking = ""
                var time = "No bookings yet"
                if(customers.bookings !== undefined){
                    if (customers.bookings.length > 0) {
                        for (let i = 0; i < customers.bookings.length; i++) {
                            Booking = customers.bookings[i]
                            time = customers.bookings[i].timeslot.date
                            customerBookings.push({
                                booking: Booking,
                                date: time,
                            })
                        }
                        this.setState({bookings: customerBookings})
                }
                    else{
                        customerBookings.push({
                            booking: Booking,
                            date: time,
                        })
                    }
                }
            }
            return customerBookings
        }
    }

    async viewAppointment(count){
        console.log(count)
        this.setState({viewApp:true})
        this.setState({count:count-1})
        console.log(this.state.count)
    }

    async onSubmit(e) {
        e.preventDefault()
        if (this.props.userType === "ADMIN") {
                const success = await this.loadCustomer();
                if(success){
                    this.setState({hasSuccess: true});
                    this.setState({bookings: this.loadCustomer()})
                }
                else{
                    alert("invalid username!")
                }
        }
        else{
            alert("you must be an admin to view customer appointments!")
        }
    }

    render() {
        const animatedComponents = makeAnimated();
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
        }else if(this.props.userType !=="ADMIN"){
            return(
                <div className="profile_screen_editprofile" id="profile_screen_editprofile">
                    <Header/>
                    <br/><br/><br/><br/>
                    <b>Please <a href="/dashboard">return </a> to home as you are not an admin.</b>
                    <br/><br/>
                    <Footer/>
                </div>
            )
        } else {
            const bookings = this.state.bookings;
            var bookingDisplay
            if(Array.isArray(bookings)) {
                var count = 0;
                bookingDisplay = bookings.map((user) => {
                    return (
                        <div className="list-group-item d-flex justify-content-between align-items-center"
                             key={count++} >
                            {user.date}
                            {<button type="button" className="btn btn-outline-dark" value={count} onClick={e=>this.viewAppointment(e.target.value)}>View booking details</button>}
                        </div>

                    )
                })
            }
            if (!this.state.hasSuccess) {
                return (
                    <div className="container">
                        <Header/>
                        <br/><br/><br/>
                        <h2>Booking details by customer</h2>
                        <div className="row">
                            <div className="col-sm-3">
                                <NavPane
                                    id={this.props.id}
                                    userName={this.props.userName}
                                    address={this.props.address}
                                    phone={this.props.phone}
                                    userType={this.props.userType}
                                    token={this.props.token}/>
                            </div>
                            <div className="col">
                            <br/>
                                <form onSubmit={this.onSubmit}>
                                    <div className="col-sm">
                                        <div className="form-group">
                                            <label htmlFor="companyName">Select customer username to view all their bookings:</label>
                                            <Select name={"customerNames"} value={this.state.value} options={this.state.optionsCustomers}
                                                    onChange={this.onCustomerChange} components={animatedComponents} isDisabled={this.state.disableCustomer}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm"/>
                                        <div className="col-sm">
                                            <input type="submit" className="btn btn-outline-dark" placeholder="Search"
                                                   id="navButton"/>
                                        </div>
                                        <div className="col-sm"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                            <div className="row"/>
                        <Footer/>
                    </div>
                )
            } else if(this.state.viewApp){
                const dateOfApp = "Date of Appointment: " + this.state.bookings[this.state.count].date
                const worker = "Worker name: " + this.state.bookings[this.state.count].booking.worker.user.userName
                const service = "Service: " + this.state.bookings[this.state.count].booking.service.name
                const duration = "Duration: " + this.state.bookings[this.state.count].booking.service.minDuration
                const id = "ID: " + this.state.bookings[this.state.count].booking.id
                return(
                    <div className="container">
                        <Header/>
                        <br/><br/><br/>
                        <h2>Booking details by customer</h2>
                        <div className="row">
                            <div className="col-sm-3">
                                <NavPane
                                    id={this.props.id}
                                    userName={this.props.userName}
                                    address={this.props.address}
                                    phone={this.props.phone}
                                    userType={this.props.userType}
                                    token={this.props.token}/>
                            </div>
                            <div className="col-sm">
                                <br/>
                                <p>Booking Details:</p>
                                {dateOfApp}
                                <br/>
                                {worker}
                                <br/>
                                {service}
                                <br/>
                                {duration}
                                <br/>
                                {id}
                                <div className="row"/>
                                <br/>
                                <Link to="/dashboard">Home</Link>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                )
            }else{
                return (
                    <div className="container">
                        <Header/>
                        <br/><br/><br/>
                        <h2>Booking details by customer</h2>
                        <div className="row">
                            <div className="col-sm-3">
                                <NavPane
                                    id={this.props.id}
                                    userName={this.props.userName}
                                    address={this.props.address}
                                    phone={this.props.phone}
                                    userType={this.props.userType}
                                    token={this.props.token}/>
                            </div>
                            <div className="col-sm">
                            <br/>
                            <p>Bookings:</p>
                                {bookingDisplay}
                                <div className="row"/>
                                <br/>
                                <Link to="/dashboard">Home</Link>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                )
            }
        }
    }
}

export default AdminViewUser