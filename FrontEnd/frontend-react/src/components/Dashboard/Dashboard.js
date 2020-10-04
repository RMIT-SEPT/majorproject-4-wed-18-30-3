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

async function getWorkers() {
    return await axios.get(DNS_URI + '/api/worker').then(response => {
        console.log("getWorker()", response)
        return response.data
    }).catch(error => {
        console.error("getWorker()", error)
    })
}

async function getCustomers() {
    return await axios.get(DNS_URI + '/api/customer').then(response => {
        console.log("getCustomers()", response)
        return response.data
    }).catch(error => {
        console.error("getCustomers()", error)
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
            customers: this.loadCustomers(),
            workers: this.loadWorkers(),
            bookingMsg: null
        }

        this.loadCustomers = this.loadCustomers.bind(this)
        this.loadWorkers = this.loadWorkers.bind(this)
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

    async loadCustomers() {
        const customers = await getCustomers()
        var customerList = []
        
        for (let i = 0; i < customers.length; i++) {
            var nextBooking = "No bookings yet"
            var bookingCount = 0
            if (customers[i].bookings.length > 0)
                nextBooking = customers[i].bookings[0].timeslot.date
                bookingCount = customers[i].bookings.length
            customerList.push({
                user: customers[i].user.userName,
                nextBooking: nextBooking,
                bookingCount: bookingCount
            })
        }

        console.log(customerList)

        this.setState({customers: customerList})
        return customerList
    }

    async loadWorkers() {
        const workers = await getWorkers()
        var workerList = []


        for (let i = 0; i < workers.length; i++) {
            var services = workers[i].services[0]["name"]
            var serviceCount = workers[i].services.length
            workerList.push({
                user: workers[i].user.userName,
                company: workers[i].companyName,
                services: services,
                serviceCount: serviceCount
            })
        }

        console.log(workerList)

        this.setState({workers: workerList})
        return workerList
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
                            
                            // Only add bookings if theyre in the future
                            if(parseDateString(bkgs[i]["timeslot"]["date"]) > new Date()) {
                                userBkgs.push(bkgs[i])
                            }
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

                            // Only add bookings if theyre in the future
                            if(parseDateString(bkgs[i]["timeslot"]["date"]) > new Date()) {
                                userBkgs.push(bkgs[i])
                            }
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

        var headerText = ""
        if (this.props.userType === "CUSTOMER")
            headerText = "Customer portal"
        else if (this.props.userType === "WORKER")
            headerText = "Worker portal"
        else if (this.props.userType === "ADMIN")
            headerText = "Admin portal"      

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
                <b>Please <a href="/login">log in </a> to use the app.</b>
                <br/><br/>
                <Footer/>
                </div>
            )
        
        } else {

            const customers = this.state.customers
            const workers = this.state.workers
            const bookings = this.state.bookings
            var bookingDisplay
            var customerHeader
            var workerHeader
            var customerDisplay
            var workerDisplay
            var custCount
            var wkrCount

            // Show app stats for admins
            if (this.props.userType === "ADMIN") {           
                if(Array.isArray(customers)) {
                    
                    custCount = customers.length
                    var count = 0                    
                    customerDisplay = customers.map((user) => { 
                        return (
                            <div className="list-group-item d-flex justify-content-between align-items-center" key={++count}>
                                {user.user} | Next booking: {user.nextBooking}
                                <span className="badge badge-primary badge-pill">{user.bookingCount} active bookings</span>
                            </div>
                        )
                    })

                    customerHeader = (
                        <div>
                        <br/>
                        <p>Customers at a glance</p>
                        </div>
                    )

                    workerHeader = (
                        <div>
                        <br/>
                        <p>Workers at a glance</p>
                        </div>
                    )   
                        
                }
            
            
                if(Array.isArray(workers)) {
                    
                    wkrCount = workers.length
                    var count = 0                    
                    workerDisplay = workers.map((user) => { 
                        return (
                            <div className="list-group-item d-flex justify-content-between align-items-center" key={++count}>
                                {user.user} from {user.company}
                                <span className="badge badge-primary badge-pill">{user.serviceCount} service(s) offered</span>
                            </div>
                        )
                    })
                        


                }

            }


            // Show users and workers their bookings
            if(Array.isArray(bookings)) {

                // Customer
                if (this.props.userType === "CUSTOMER") {
                    bookingDisplay = bookings.map((bkg) => { 
                        return (
                            <div className="list-group-item d-flex justify-content-between align-items-center" key={bkg["id"]}>
                                {capitalise(bkg["service"]["name"])} with {bkg["worker"]["user"]["userName"]} on {(parseDateString(bkg["timeslot"]["date"])).toUTCString()}
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
                            <b>Welcome, {this.props.user[index]["userName"]}!</b> &nbsp; {this.state.bookingMsg}
                            
                            <div className="list-group list-group-flush" id="scrollable">              
                                {bookingDisplay}
                                {workerHeader}
                                {workerDisplay}
                                {customerHeader}
                                {customerDisplay}
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
