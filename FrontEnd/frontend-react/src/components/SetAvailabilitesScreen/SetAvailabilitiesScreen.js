import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import Select from 'react-select';
import axios from "axios";
import makeAnimated from 'react-select/animated';
import { Link } from "react-router-dom";
import CancelButton from '../AvailabilitiesScreen/CancelButton'

const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"

const MIN_DURATION = 30

// Header config for REST requests
const axiosConfig = {headers: {'Content-Type': 'application/json'}}

// Send a create booking request to bookings endpoint
async function setAvailability(availability) {

    console.log(JSON.stringify({
        created_At: currentTime(),
        updated_At: currentTime(),
        worker: availability.worker,
        timeslot: availability.timeslot
    }))
    return await axios.post(DNS_URI + '/api/booking', {
        created_At: currentTime(),
        updated_At: currentTime(),
        worker: availability.worker,
        timeslot: availability.timeslot,
    }, axiosConfig)
    .then(res => {
        console.log(res)
        return true
    })
    .catch(error => {
        console.error("setAvailability()", error)
        return false
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

// Return datestring in backend-friendly format 
function formatDate(date) {
    if (date === undefined || date === null)
        var date = new Date();
    
    var dateString =
        date.getUTCFullYear() + "-" +
        ("0" + (date.getUTCMonth()+1)).slice(-2) + "-" +
        ("0" + date.getUTCDate()).slice(-2) + "-" +
        ("0" + date.getUTCHours()).slice(-2) + "-" +
        ("0" + date.getUTCMinutes()).slice(-2) + "-" +
        ("0" + date.getUTCSeconds()).slice(-2);
    return dateString
}

// Return the current time in backend-friendly format 
function currentTime() {
    var date = new Date();
    var dateString =
        date.getUTCFullYear() + "-" +
        ("0" + (date.getUTCMonth()+1)).slice(-2) + "-" +
        ("0" + date.getUTCDate()).slice(-2) + "-" +
        ("0" + date.getUTCHours()).slice(-2) + "-" +
        ("0" + date.getUTCMinutes()).slice(-2) + "-" +
        ("0" + date.getUTCSeconds()).slice(-2);
    return dateString
}

// Return current time as Date object rounded to its next upper increment
function roundedCurrentTime(increment) {
    var date = new Date()
    var ms = 1000 * 60 * increment;
    var rDate = new Date(Math.round(date.getTime() / ms) * ms);
    rDate.setMinutes(rDate.getMinutes() + increment)
    return rDate 
}

async function getTimelots() {
    return await axios.get(DNS_URI + '/api/timeslot').then(response => {
        console.log("getTimeslots()", response)
        return response.data
    }).catch(error => {
        console.error("getTimeslots()", error)
    })
}

async function getWorker(worker) {
    return await axios.get(DNS_URI + '/api/worker/' + worker).then(response => {
        console.log("getWorker()", response)
        return response.data
    }).catch(error => {
        console.error("getWorker()", error)
    })
}

async function getBookings() {
    return await axios.get(DNS_URI + '/api/booking').then(response => {
        return response.data
    }).catch(error => {
        console.error("getBookings()", error)
    })
}

class SetAvailabilitiesScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedDate: null,
            dateOptions: this.getDateOptions(),
            selectedService: null,
            serviceOptions: this.getServiceOptions(),
            lastDateShown: null,

            showSubmitPanel: false,
            showMultiPanel: false,
            submitMessage: null,
            buttonMsg: "~",

            disableService: false,
            disableTimeslot: true,
            disableNext: false,

            success: null
        }

        this.next = this.next.bind(this)
        this.oneDay = this.oneDay.bind(this)
        this.threeDays = this.threeDays.bind(this)
        this.sevenDays = this.sevenDays.bind(this)
        this.fourteenDays = this.fourteenDays.bind(this)
        this.setAvailByDay = this.setAvailByDay.bind(this)
        this.singleSlotAvail = this.singleSlotAvail.bind(this)
        this.getDateOptions = this.getDateOptions.bind(this)
        this.getServiceOptions = this.getServiceOptions.bind(this)
        this.onChange = this.onChange.bind(this)
        this.checkTimeslotsExist = this.checkTimeslotsExist.bind(this)

        this.checkTimeslotsExist()
    }

    onChange(e){
        this.setState({[e.value.target]: e.value.value})
        if (e.value.target === "selectedService") {
            this.setState({disableService: true})
            this.setState({disableTimeslot: false})
            this.setState({showMultiPanel: true})
            this.setState({buttonMsg: "Submit batch"})

        } else if (e.value.target === "selectedDate") {
            this.setState({showSubmitPanel: true})
            var msg = "You're offering " + this.state.selectedService + " service on " + parseDateString(e.value.value)
            this.setState({submitMessage: msg})
        }
    }

    async getDateOptions() {

        // Assume app state has populated timeslots
        const ts = await getTimelots().then()
    
        // Get a list of the workers existing bookings, if any
        var bkgTimes = []
        const bkgs = await getBookings().then()
        for (let i = 0; i < bkgs.length; i++) { 
            if (bkgs[i]["customer"] !== null && bkgs[i]["worker"]["user"]["userName"] === this.props.userName) 
                bkgTimes.push(bkgs[i]["timeslot"]["date"])
        }

        // If worker has existing bookings, dont show them in the list of timeslots (double booking).
        var count = 0
        var dateOptions = []
        if (ts[0] !== undefined) {            
            for (let i = 0; i < ts.length; i++) { 
                // Only show 50 timeslots at a time
                if (count < 50) {
                    if (!bkgTimes.includes(ts[i]["date"])) {
                        
                        // Only show timeslots in the future.
                        if (parseDateString(ts[i]["date"]) > new Date()) {
                        dateOptions.push({
                            value: {
                                date: ts[i]["date"],
                                value: ts[i]["date"],
                                target: "selectedDate"},
                            label: parseDateString(ts[i]["date"]).toString()
                        })
                        count++ 
                        }
                    } 
                }
            }
        } else {
            console.log("Timeslots not populated. Ensure timeslots have been created before attempting to create availabilites.")
        }
        this.setState({dateOptions: dateOptions})
        // log the last displayed timeslot
        this.setState({lastDateShown: dateOptions[dateOptions.length - 1]["value"]["date"]})
    }

    // Load next batch of timeslots, starting from the last previously displayed
    async next() {
        this.setState({showSubmitPanel : false})
        this.setState({selectedDate: null})
        const ts = await getTimelots().then()
        var bkgTimes = []
        const bkgs = await getBookings().then()
        for (let i = 0; i < bkgs.length; i++) { 
            if (bkgs[i]["customer"] !== null && bkgs[i]["worker"]["user"]["userName"] === this.props.userName) 
                bkgTimes.push(bkgs[i]["timeslot"]["date"])
        }
        var count = 0
        var dateOptions = []
        
        // Dont load next if at the end of the timeslots
        if (parseDateString(ts[ts.length-1]["date"]) > parseDateString(this.state.lastDateShown)) {   
            if (ts[0] !== undefined) {                     
                for (let i = 0; i < ts.length; i++) { 
                    // Only show 50 timeslots at a time
                    if (count < 50) {
                        if (!bkgTimes.includes(ts[i]["date"])) {
                            // Only show timeslots in the future.
                            if (parseDateString(ts[i]["date"]) > new Date()) {
                                // Only load next 50, starting from the previous last date
                                if (parseDateString(ts[i]["date"]) > parseDateString(this.state.lastDateShown)) {
                                    dateOptions.push({
                                        value: {
                                            date: ts[i]["date"],
                                            value: ts[i]["date"],
                                            target: "selectedDate"},
                                        label: parseDateString(ts[i]["date"]).toString()
                                    })
                                    count++ 
                                }
                            }
                        } 
                    }
                }
            } else {
                console.log("Timeslots not populated. Ensure timeslots have been created before attempting to create availabilites.")
            }
            this.setState({dateOptions: dateOptions})
            // log the last displayed timeslot
            if (dateOptions.length !== 0)
                this.setState({lastDateShown: dateOptions[dateOptions.length - 1]["value"]["date"]})
        }
        this.setState({disableNext: true})
    }

    async getServiceOptions() {
        const worker = await getWorker(this.props.userName).then()
        var serviceOptions = []

        // Only create the display if user logged in
        if (this.props.userName !== undefined) {
            
            // Display all the workers services
            for (let i = 0; i < worker["services"].length; i++) { 
                serviceOptions.push({
                    value: { 
                        service: worker["services"][i],
                        value: worker["services"][i]["name"],
                        target: "selectedService"},
                    label: capitalise(worker["services"][i]["name"]) 
                })
            }       
        }

        this.setState({serviceOptions: serviceOptions})
    }

    oneDay() {this.setAvailByDay(1)}
    threeDays() {this.setAvailByDay(3)}
    sevenDays() {this.setAvailByDay(5)}
    fourteenDays() {this.setAvailByDay(7)}
    
    // Set n days of availabilities 
    async setAvailByDay(n) {

        this.setState({success: "pending"})

        // Get a list of the workers next open timeslots
        const rawTimeslots = await getTimelots().then()
        const bkgs = await getBookings().then()
        var timeslotDates = []
        var bkgTimes = []
        for (let i = 0; i < bkgs.length; i++) { 
            
            // check for booked timeslots
            if (bkgs[i]["customer"] !== null && bkgs[i]["worker"]["user"]["userName"] === this.props.userName) 
                bkgTimes.push(bkgs[i]["timeslot"]["date"])

            // check for availability timeslots
            if (bkgs[i]["customer"] === null && bkgs[i]["worker"]["user"]["userName"] === this.props.userName) 
                bkgTimes.push(bkgs[i]["timeslot"]["date"])
        }
    
        // Subtract taken (booked or availability open) timeslots from list of all timeslots
        for (let i = 0; i < rawTimeslots.length; i++) { 
            if(!bkgTimes.includes(rawTimeslots[i]["date"])) {
                timeslotDates.push(rawTimeslots[i]["date"])
            }
        }
       
        console.log("timeslotDates", timeslotDates)

        // Only make bookings if the backend has timeslots
        if (timeslotDates.length > 1) {
            
            // Create n * 64 availabilities starting from the current earliest timeslot
            // (assume min duration is 30 mins, so 64 * 30 = 1 day)
            var results = []
            for (let i = 0; i < n * 64; i++) { 
                if (i < timeslotDates.length) {
                
                    var result = await setAvailability({
                        worker: {user: {userName: this.props.userName}},
                        timeslot: {date: timeslotDates[i]},
                        service: this.state.selectedService
                    })
                    results.push(result)
                }
            }
  
            // Verify the results
            var totalSucceeded = 0
            for (let j = 0; j < results.length; j++) { 
                if (results[j].status !== 201 || results[j].status !== 200 || results[j].status !== 301 ) {
                    totalSucceeded++
                } 
            }
            if (totalSucceeded === results.length) {
                this.setState({success: true})
            } else if (totalSucceeded < results.length) {
                alert("Setting availability was partially successful, " + totalSucceeded + " of " + results.length + " were set." + 
                       "\n Please check your availabilities and re-set as required.")
                this.setState({success: true})
            } else if (totalSucceeded === 0) {
                this.setState({success: false})
            }


            
        } else {
            console.log("Unable to place bookings, no timeslots available in system. Add more timeslots in the backend.")
            alert("No more timeslots available to book. Contact a system administrator to add more timeslots for you.")
            this.setState({success: false})
        }
    }

    async checkTimeslotsExist() {
        
        // Get a list of the workers next open timeslots
        const rawTimeslots = await getTimelots().then()
        const bkgs = await getBookings().then()
        var timeslotDates = []
        var bkgTimes = []
        for (let i = 0; i < bkgs.length; i++) { 
            
            // check for booked timeslots
            if (bkgs[i]["customer"] !== null && bkgs[i]["worker"]["user"]["userName"] === this.props.userName) 
                bkgTimes.push(bkgs[i]["timeslot"]["date"])

            // check for availability timeslots
            if (bkgs[i]["customer"] === null && bkgs[i]["worker"]["user"]["userName"] === this.props.userName) 
                bkgTimes.push(bkgs[i]["timeslot"]["date"])
        }
    
        // Subtract taken (booked or availability open) timeslots from list of all timeslots
        for (let i = 0; i < rawTimeslots.length; i++) { 
            if(!bkgTimes.includes(rawTimeslots[i]["date"])) {
                timeslotDates.push(rawTimeslots[i]["date"])
            }
        }
       
        // Critical error if there are no timeslots
        if (timeslotDates.length < 1) {
            console.log("Unable to place bookings, no timeslots available in system. Add more timeslots in the backend.")
            alert("No more timeslots available to book. Contact a system administrator to add more timeslots for you.")
            this.setState({success: false})
        }
    }

    async singleSlotAvail() {
        var newAvailability = {
            worker: {user: {userName: this.props.userName}},
            timeslot: {date: this.state.selectedDate},
            service: this.state.selectedService
        }

        const result = await setAvailability(newAvailability)

        if (result) {
            this.setState({success: true})
        } else {
            this.setState({success: false})
        }
    }

    render() {
        
        var reset_url
        if (window.location.pathname === "/set_availabilites" ) {
            reset_url = "/set_availabilites_reset"
        } else if (window.location.pathname === "/set_availabilites_reset") {
            reset_url = "/set_availabilites"
        } else 
            reset_url = "/set_availabilites" 
        
        const animatedComponents = makeAnimated()

        if (this.state.success === null) {
        
            return (
                <div className="container" id="setavailabilitiesscreen_container">
                    <Header id={this.props.id}
                        userName={this.props.userName}
                        address={this.props.address}
                        phone={this.props.phone}
                        userType={this.props.userType}
                        token={this.props.token}/>
                    <br/><br/><br/>
                    
                    <h2>Set availabilities</h2>

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
                        <div className="col-sm-9">
                        <br/>
                        <font>Choose a service to offer</font>
                        <br/><br/>

                        <div className="row">
                            <div className="col-sm">
                                <Select name={"selectedService"} id={"selectedService"} components={animatedComponents}
                                        value={this.state.value} 
                                        options={this.state.serviceOptions}
                                        onChange={this.onChange}
                                        isDisabled={this.state.disableService}/>
                                </div>
                            </div>

                            <br/>
                            <font>Select single timeslot...</font>
                            <br/>
                            <br/>
                            <div className="row">
                                <div className="col-2">
                                    <Link to={reset_url}>
                                        <font className="btn btn-outline-dark" id="navButton">Reset</font> 
                                    </Link>
                                </div>

                                <div className="col-8">
                                    <Select name={"selectedDate"} id={"selectedDate"} components={animatedComponents}
                                            value={this.state.value} 
                                            options={this.state.dateOptions}
                                            onChange={this.onChange}
                                            isDisabled={this.state.disableTimeslot}/>
                                    <br/>
                                </div>
                                
                                <div className="col-2">
                                    <button className="btn btn-outline-dark" id="navButton" 
                                            onClick={this.next}
                                            disabled={this.state.disableNext}>Next 50</button> 
                                </div>
                            </div>

                            {
                            this.state.showSubmitPanel? 
                            <div>
                                <div className="row">   
                                    <div className="col-sm">
                                        <b><font color="MidnightBlue">{this.state.submitMessage}</font></b>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-2"></div>
                                    <div className="col-8">
                                        <br/>
                                        <button className="btn btn-outline-dark" id="navButton" onClick={this.singleSlotAvail}>Submit single availability</button> 
                                    </div>
                                    <div className="col-2"></div>
                                </div>
                            </div> : null
                            }

                            <br/>

                            {
                            this.state.showMultiPanel? 
                            <div>
                                <p>...or make yourself availabile according to your open slots</p>
                                <div className="row">
                                <div className="col-sm-3">
                                    <div className="card shadow-sm bg-white rounded">
                                        <div className="card-body">
                                        <p className="card-title">1 day of timeslots</p>
                                        <font className="btn btn-outline-dark" onClick={this.oneDay}>{this.state.buttonMsg}</font>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="card shadow-sm bg-white rounded">
                                        <div className="card-body">
                                        <p className="card-title">3 days of timeslots</p>
                                        <font className="btn btn-outline-dark" onClick={this.threeDays}>{this.state.buttonMsg}</font>
                                        </div>
                                    </div>
                                </div>                       
                                <div className="col-sm-3">
                                    <div className="card shadow-sm bg-white rounded">
                                        <div className="card-body">
                                            <p className="card-title">5 days of timeslots</p>
                                            
                                            <font className="btn btn-outline-dark" onClick={this.sevenDays}>{this.state.buttonMsg}</font>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="card shadow-sm bg-white rounded">
                                        <div className="card-body">
                                            <p className="card-title">7 days of timeslots</p>
                                            <font className="btn btn-outline-dark" onClick={this.fourteenDays}>{this.state.buttonMsg}</font>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div> : null
                            }
                            
                            


                        </div>
                    </div>
                    
                </div>
            )

        // Success
        } else if (this.state.success === true) {
            return (
                <div>
                <Header/>
                <br/>  <br/>  <br/>  <br/>    
                    <b>Availabilities successfully set. Thanks, {this.props.userName}.</b>
                    <br/><br/>   
                    
                    <br/><br/>  
                    <div className="row">
                    <div className="col-sm"></div>
                        <div className="col-sm">
                            <Link to={reset_url}>
                                <font className="btn btn-outline-dark" id="navButton">Set more availabilites</font> 
                            </Link>
                        </div>
                        <div className="col-sm">
                            <CancelButton/>
                        </div>
                        <div className="col-sm"></div>
                    </div>
                <Footer/>
                </div>   
            )

        // Failure
        } else if (this.state.success === false) {
            return (
                <div>
                <Header/>
                    <br/>    <br/>  <br/>  <br/>  
                    <b>Setting of availabilites failed. Please try again.</b>
                    <br/><br/>   
                
                    <div className="row">
                    <div className="col-sm"></div>
                        <div className="col-sm">
                            <Link to={reset_url}>
                                <font className="btn btn-outline-dark" id="navButton" >Try again</font> 
                            </Link>
                        </div>
                        
                        <div className="col-sm">
                            <CancelButton/>
                        </div>
                    <div className="col-sm"></div>
                    </div>
                
                    
                <Footer/>
                </div>  
            )
        // Pending
        } else if (this.state.success === "pending") {
            return (
                <div>
                <Header/>
                    <br/>    <br/>  <br/>  <br/>  
                    <b>Working... Please wait a moment...</b>
                    <br/><br/>   

                <Footer/>
                </div>  
            )
        }
    }
}

export default SetAvailabilitiesScreen;
