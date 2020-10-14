import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from '../Layout/Header';
import axios from "axios";
import Footer from "../Layout/Footer";
import Select from "react-select";
import makeAnimated from "react-select/animated/dist/react-select.esm";
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
        this.getOptionCustomers = this.getOptionCustomers(this);
    }
    
    onCustomerChange(customer){
        console.log("customer -" + customer.label)
        this.setState({userName: customer.label});
        this.setState({disableCustomer: true});
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
    async viewAppointment(e){
        this.setState({viewApp:true})
        this.setState({count:e.target.value})
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
                             key={++count} >
                            {user.date}
                            <button type="button" value={count} onClick={e=>this.viewAppointment(e)}>View Appointment</button>
                        </div>
                    )
                })
            }
            if (!this.state.hasSuccess) {
                return (
                    <div className="AdminViewUser">
                        <Header/>
                        <br/><br/><br/><br/>
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
                            <div className="col-sm-3">
                        <div className="Heading">
                            <h1>Search for appointment</h1>
                            <p>Select the username of a customer and click submit to view all their bookings!</p>
                            <br/><br/>
                        </div>
                            <div className="list-group-item d-flex justify-content-between align-items-center">
                        <form onSubmit={this.onSubmit}>
                                <div className="col-sm">

                                    <div className="form-group">
                                        <label htmlFor="companyName">Select a customer:</label>
                                        <Select name={"customerNames"} value={this.state.value} options={this.state.optionsCustomers}
                                                onChange={this.onCustomerChange} components={animatedComponents} isDisabled={this.state.disableCustomer}/>
                                    </div>
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
                            </div>
                    </div>
                    </div>
                )
            } else{
                console.log(bookingDisplay)
                if(this.state.viewApp){
                    bookingDisplay = this.state.bookings[this.state.count]
                }
                return (
                    <div className="adminViewUser">
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
                                <h1>Bookings:</h1>
                                {bookingDisplay}
                                <div className="row"/>
                                <Link to="/dashboard">Home</Link>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}
export default AdminViewUser;
