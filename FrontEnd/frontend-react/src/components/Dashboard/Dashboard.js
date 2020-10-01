import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'
import { connect } from 'react-redux'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import axios from "axios";


const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"

// const axiosConfig = {headers: {'Content-Type': 'application/json'}}

async function getBookings() {
    return await axios.get(DNS_URI + '/api/booking').then(response => {
        return response.data
    })
}

const capitalise = (string) => {
    if (typeof string !== 'string') return null
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// Create date object from "YYYY-MM-DD-hh-mm-ss" string
function parseDateString(dStr) {
    var date = new Date()
    date.setUTCFullYear(dStr.slice(0, 4))
    date.setUTCMonth(parseInt((dStr.slice(5, 7)) - 1, 10))
    date.setUTCDate(dStr.slice(8, 10))
    date.setUTCHours(dStr.slice(11, 13))
    date.setUTCMinutes(dStr.slice(14, 16))
    date.setUTCSeconds(dStr.slice(17, 19))  
    return date
}

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: null,
            userType: null,
            bookings: this.getUserBookings(),
            bookingMsg: null
        }

        this.storeLoginToken = this.storeLoginToken.bind(this)
        this.storeLoginToken()
    }

    // Store session token and login details in Redux state
    storeLoginToken() {
        this.props.dispatch({
            type: "LOGIN",
            payload: {
                'id': this.props.id,
                'userName': this.props.userName,
                'address': this.props.address, 
                'phone': this.props.phone,
                'userType': this.props.userType,
                'token': this.props.token
            }
        })
        // TODO: persist state between refreshes
    }

    async getUserBookings() {
        // Only load bookings if a customer or worker is logged in 
        if (this.props.userType !== null && this.props.userType !== "ADMIN" && this.props.userType !== undefined) {

            const bkgs = await getBookings().then()
            var userBkgs = []
            var msgString = "No bookings found : ("

            // Filter bookings for customers
            if (this.props.userType === "CUSTOMER") {
                for (let i = 0; i < bkgs.length; i++) {
                    if (bkgs[i]["customer"] !== null) {
                        if (bkgs[i]["customer"]["user"]["userName"] === this.props.userName) {
                            userBkgs.push(bkgs[i])
                        }
                    }
                }
                if (userBkgs.length > 1)
                    msgString = "You have " + userBkgs.length + " upcoming bookings."
                else if (userBkgs.length === 1)
                    msgString = "You have " + userBkgs.length + " upcoming booking."
                this.setState({bookingMsg: msgString})
                this.setState({bookings: userBkgs})

            // Filter bookings for workers
            } else if (this.props.userType === "WORKER") {
                for (let i = 0; i < bkgs.length; i++) {
                    if (bkgs[i]["worker"] !== null && bkgs[i]["customer"] !== null) {
                        if (bkgs[i]["worker"]["user"]["userName"] === this.props.userName) {
                            userBkgs.push(bkgs[i])
                        }
                    }
                }
                if (userBkgs.length > 1)
                    msgString = "You have " + userBkgs.length + " upcoming jobs."
                else if (userBkgs.length === 1)
                    msgString = "You have " + userBkgs.length + " upcoming job."
                this.setState({bookingMsg: msgString})
                this.setState({bookings: userBkgs})
            }
        }        
    }

    render() {
        
        // Use the most recent element in state history
        const index = this.props.user.length - 1

        var headerText = "AGME Booking App"
        if (this.props.userType === "CUSTOMER")
            headerText = "AGME Booking App - Customer portal"
        else if (this.props.userType === "WORKER")
            headerText = "AGME Booking App - Worker portal"
        else if (this.props.userType === "ADMIN")
            headerText = "AGME Booking App - Admin portal"      

        // Check user is logged in
        if (this.props.userName === undefined && this.props.userType === undefined) {
            return (
                <div className="profile_screen_editprofile" id="profile_screen_editprofile">
                <Header
                    id={this.props.user[index]["id"]}
                    userName={this.props.user[index]["userName"]}
                    address={this.props.user[index]["address"]}
                    phone={this.props.user[index]["phone"]}
                    userType={this.props.user[index]["userType"]}
                    token={this.props.user[index]["token"]}/>
                    <br/><br/><br/><br/>
                <b>Please log in first.</b>
                <br/><br/>
                <Footer/>
                </div>
            )
        
        } else {

            const bookings = this.state.bookings
            var bookingDisplay

            // Wait for promise fulfillment
            if(Array.isArray(bookings)) {
                console.log(bookings)
                console.log("yes")

                // Customer
                if (this.props.userType === "CUSTOMER") {
                    bookingDisplay = bookings.map((bkg) => { 
                        return (
                            <div className="list-group-item d-flex justify-content-between align-items-center" key={bkg["id"]}>
                                {capitalise(bkg["service"]["name"])} for {bkg["customer"]["user"]["userName"]} on {(parseDateString(bkg["timeslot"]["date"])).toUTCString()}
                                <span className="badge badge-primary badge-pill">{bkg["service"]["minDuration"]} mins</span>
                            </div>
                        )
                    })
                }

                // Worker
                if (this.props.userType === "WORKER") {
                    bookingDisplay = bookings.map((bkg) => { 
                        return (
                            <div className="list-group-item d-flex justify-content-between align-items-center" key={bkg["id"]}>
                                {capitalise(bkg["service"]["name"])} for {bkg["customer"]["user"]["userName"]} on {(parseDateString(bkg["timeslot"]["date"])).toUTCString()}
                                <span className="badge badge-primary badge-pill">{bkg["service"]["minDuration"]} mins</span>
                            </div>
                        )
                    })
                }
            }   
            

            return (
                <div className="container" id="dashboard_container">
                    <Header
                        id={this.props.user[index]["id"]}
                        userName={this.props.user[index]["userName"]}
                        address={this.props.user[index]["address"]}
                        phone={this.props.user[index]["phone"]}
                        userType={this.props.user[index]["userType"]}
                        token={this.props.user[index]["token"]}/>
                    <br/><br/><br/>
                    <h2>{headerText}</h2>
                    <div className="row">
                        <div className="col-sm-3">
                            <NavPane
                                id={this.props.user[index]["id"]}
                                userName={this.props.user[index]["userName"]}
                                address={this.props.user[index]["address"]}
                                phone={this.props.user[index]["phone"]}
                                userType={this.props.user[index]["userType"]}
                                token={this.props.user[index]["token"]}/>
                        </div>
                        <div className="col-sm-9">
                            <br/>
                            <b>Welcome, {this.props.user[index]["userName"]}!</b>
                            <p>{this.state.bookingMsg}</p>
                            
                            <div className="list-group list-group-flush" id="scrollable">              
                                {bookingDisplay}
                            </div>

                        </div>
                    </div>
                    <Footer/>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => {
    return { dispatch }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
