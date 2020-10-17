import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import axios from "axios";


const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"

async function getBookings(token, userType, userName) {

    if (userType === "ADMIN") {
        return await axios.get(DNS_URI + '/api/booking', {
            headers: { 
                'Authorization': token }
        }).then(function(response) {
            console.log('Authenticated');
            return response.data
        }).catch(function(error) {
            console.error("getBookings()", error)
            console.log(error.response.data)
        });
    } else if (userType === "CUSTOMER") {
        return await axios.get(DNS_URI + '/api/customer/' + userName, {
            headers: { 
                'Authorization': token }
        }).then(function(response) {
            console.log('Authenticated');
            return response.data.bookings
        }).catch(function(error) {
            console.error("getBookings()", error)
            console.log(error.response.data)
        });
    } 
}

async function getWorkers(token, userType, userName) {

    if(userType !== undefined && userType !== "CUSTOMER") {
        var urlString = '/api/worker'
        if (userType !== "ADMIN")
            urlString = urlString + '/' + userName

        return await axios.get(DNS_URI + urlString, {
        headers: { 
            'Authorization': token }
        }).then(function(response) {
            console.log('Authenticated');
            return response.data
        }).catch(function(error) {
            console.error("getWorkers()", error)
            console.log(error.response.data)
        });
    }
}

async function getCustomers(token, userType, userName) {

    var urlString = '/api/customer' 
    if (userType !== "ADMIN")
        urlString = urlString + '/' + userName
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
            workers: this.loadWorkers(),
            customers: this.loadCustomers(),
            bookingMsg: null
        }
        this.loadCustomers = this.loadCustomers.bind(this)
        this.loadWorkers = this.loadWorkers.bind(this)
    }

    async loadCustomers() {
        if (this.props.token !== undefined) {
            const customers = await getCustomers(this.props.token, this.props.userType, this.props.userName).then()
            var customerList = []
            if (customers !== undefined) {
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
                this.setState({customers: customerList})
                return customerList
            }
        }
    }

    async loadWorkers() {
        if (this.props.token !== undefined) {
            const workers = await getWorkers(this.props.token, this.props.userType, this.props.userName).then()
            var workerList = []
            if (workers !== undefined) {
                for (let i = 0; i < workers.length; i++) {
                    
                    var services = "None"
                    if (workers[i].services[0] !== undefined) 
                        services = workers[i].services[0]["name"]
                    
                    var serviceCount = workers[i].services.length
                    workerList.push({
                        user: workers[i].user.userName,
                        company: workers[i].companyName,
                        services: services,
                        serviceCount: serviceCount
                    })
                }    
            }
            this.setState({workers: workerList})
            return workerList
        }
    }


    async getUserBookings() {

        // Only load bookings if a customer or worker is logged in 
        if (this.props.userType !== "ADMIN" && this.props.userType !== undefined) {

            const bkgs = await getBookings(this.props.token, this.props.userType, this.props.userName).then()
            var userBkgs = []
            var msgString = "No bookings found : ("

            if (bkgs !== undefined) {
                // Only add bookings if theyre in the future
                
                

                if (Array.isArray(bkgs)) {
                    for (let i = 0; i < bkgs.length; i++) {
                        if(parseDateString(bkgs[i]["timeslot"]["date"]) > new Date()) {
                            userBkgs.push(bkgs[i])
                        }
                    }
                } else if (bkgs.constructor === Object) {
                    if(parseDateString(bkgs["timeslot"]["date"]) > new Date()) {
                        userBkgs = bkgs
                    }
                }

                
                

                var typeString = "job"
                if (this.props.userType === "CUSTOMER")
                    typeString = "booking"

                if (userBkgs.length > 1)
                    msgString = "You have " + userBkgs.length + " upcoming " + typeString + "s."
                else if (userBkgs.length === 1)
                    msgString = "You have " + userBkgs.length + " upcoming " + typeString + "."
                this.setState({bookingMsg: msgString})
                this.setState({bookings: userBkgs})
            }
        }
    }        
    
    render() {
        
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
                <Header/>
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

            // Show app stats for admins
            if (this.props.userType === "ADMIN") {           
                if(Array.isArray(customers)) {
                    
                    
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
                        <p className="text-left"><b>Customers at a glance</b></p>
                        </div>
                    )

                    workerHeader = (
                        <div>
                        <br/>
                        <p className="text-left"><b>Workers at a glance</b></p>
                        </div>
                    )   
                        
                }
            
            
                if(Array.isArray(workers)) {
                    
                    
                    var countW = 0                    
                    workerDisplay = workers.map((user) => { 
                        return (
                            <div className="list-group-item d-flex justify-content-between align-items-center" key={++countW}>
                                {user.user} | {user.company}
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
                        userName={this.props.userName}
                        userType={this.props.userType}
                        token={this.props.token}/>
                    <br/><br/><br/>
                    <h2>{headerText}</h2>
                    <div className="row">
                        <div className="col-sm-3">
                            <NavPane
                            userName={this.props.userName}
                            userType={this.props.userType}
                            token={this.props.token}/>
                        </div>
                        <div className="col-sm-9">
                            <br/>
                            <b>Welcome, {this.props.userName}!</b> &nbsp; {this.state.bookingMsg}
                            
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


export default Dashboard
