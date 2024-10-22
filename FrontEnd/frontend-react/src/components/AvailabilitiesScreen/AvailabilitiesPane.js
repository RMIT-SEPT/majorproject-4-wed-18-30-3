import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select';
import axios from "axios";
import makeAnimated from 'react-select/animated';
import CancelButton from './CancelButton';

// How many timeslots to display at once in the drop down for timeslot view
const SLOTS_TO_VIEW = 8

const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"

// Create date object from "YYYY-MM-DD-hh-mm-ss" string
function parseDateString(dStr) {
    var date = new Date()
    date.setFullYear(dStr.slice(0, 4))
    date.setMonth(parseInt((dStr.slice(5, 7)) - 1, 10))
    date.setDate(dStr.slice(8, 10))
    date.setHours(dStr.slice(11, 13))
    date.setMinutes(dStr.slice(14, 16))
    date.setSeconds(dStr.slice(17, 19))  
    return date
}

// Return the next chronological timeslot in backend format
function nextSlot(date, increment) {
    return new Date(date.getTime() + increment*60000);
}

// Return the current time in backend-friendly format 
function currentTime() {
    var date = new Date();
    var dateString =
        date.getFullYear() + "-" +
        ("0" + (date.getMonth()+1)).slice(-2) + "-" +
        ("0" + date.getDate()).slice(-2) + "-" +
        ("0" + date.getHours()).slice(-2) + "-" +
        ("0" + date.getMinutes()).slice(-2) + "-" +
        ("0" + date.getSeconds()).slice(-2);
    return dateString
}

// Return the given time in backend-friendly format 
function formatTime(date) {
    var dateString =
        date.getFullYear() + "-" +
        ("0" + (date.getMonth()+1)).slice(-2) + "-" +
        ("0" + date.getDate()).slice(-2) + "-" +
        ("0" + date.getHours()).slice(-2) + "-" +
        ("0" + date.getMinutes()).slice(-2) + "-" +
        ("0" + date.getSeconds()).slice(-2);
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

const capitalise = (string) => {
    if (typeof string !== 'string') return null
    return string.charAt(0).toUpperCase() + string.slice(1)
}

// Send a create booking request to bookings endpoint
async function createBooking(newBooking, token, userType, userName) {

    console.log(newBooking)
    return await axios.post(DNS_URI + '/api/booking', {
        timeslot: newBooking.timeslot,
        worker: newBooking.worker,
        service: newBooking.service,
        created_At: currentTime(),  
        updated_At: currentTime(),          
        customer: newBooking.customer
    },  { headers: { 
        'Authorization': token }
    })
    .then(res => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
        return true
    })
    .catch(error => {
        console.error(error)
        console.log(error.response)
        console.log(error.response.data)
        return false
    })
}

// Return all availability objects
async function getBookings(token, userType, userName) {

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
}

class AvailabilitiesPane extends Component {

    constructor(props) {
        super(props)
        this.state = {
            view: "select",
            availabilites: this.getAvailabilities(),
            avOptions: [],
            lastCurrentAvOption: null,
            selectedAv: null,
            selectedTimeslot: null,
            selectedWorker: null,
            selectedService: null,
            viewMessage: null,
            viewMessageCount: null,
            viewIndex: SLOTS_TO_VIEW,
            bookingBtnMsg: "~",
            textAreaMsg: "",
            userName: null,
            userType: null,
            token: null,

            workerOptions: null,
            avOptionsWorker: null
        }

        this.book = this.book.bind(this)
        this.reset = this.reset.bind(this)
        this.loadNext = this.loadNext.bind(this)
        this.timeslotsOptionsByWorker = this.timeslotsOptionsByWorker.bind(this)
        this.onTimeslotChangeWorkerView = this.onTimeslotChangeWorkerView.bind(this)
        this.loadAvailabilityOptions = this.loadAvailabilityOptions.bind(this)
        this.onAvailabilityChange = this.onAvailabilityChange.bind(this)
        this.onWorkerChange = this.onWorkerChange.bind(this)
        this.selectView = this.selectView.bind(this)
        this.timeslotView = this.timeslotView.bind(this)
        this.workerView = this.workerView.bind(this)
        this.storeLoginToken = this.storeLoginToken.bind(this)   
        this.getWorkerOptions = this.getWorkerOptions.bind(this)
    }

    async selectView () {this.setState({view: "select"})}
    
    async timeslotView () {
        this.storeLoginToken()
        this.setState({availabilites: this.loadAvailabilityOptions()})
        this.setState({view: "timeslot"})
    }
    
    async workerView () {
        this.storeLoginToken()
        this.setState({selectedAvMsg: null})
        this.setState({workerOptions: this.getWorkerOptions()})
        this.setState({view: "worker"})
    }

    async storeLoginToken() {
        const name = document.getElementById("userName").textContent
        const type = document.getElementById("userType").textContent
        const loginToken = document.getElementById("userToken").textContent
        
        this.setState({userName: name})
        this.setState({userType: type})
        this.setState({token: loginToken})
    }
    
    async onChange(e){
        e.preventDefault()
    }
    
    async book () {
        
        if(this.state.bookingBtnMsg !== "~") {

            const selectedService = document.getElementById("selectedService").textContent
            const selectedWorker = document.getElementById("selectedWorker").textContent
            const selectedTimeslot = document.getElementById("selectedTimeslot").textContent

            // Validate login
            if (this.props.userName !== null && this.props.userType !== null) {
                // Validate user type
                if(this.props.userType !== "CUSTOMER") {
                    alert("You must be a customer to make bookings. Create a customer account and try again.")
                    return 
                }
            } else {
                alert("You must be logged in to make bookings. Please log in.")
                return 
            }

            // Send the POST request
            const success = await createBooking({
                updated_At: currentTime(),
                worker: {user: {userName: selectedWorker}},
                timeslot: {date: selectedTimeslot},
                service: {name: selectedService},
                customer: {user: {userName: this.props.userName}},
            }, this.props.token, this.props.userType, this.props.userName).then()

            // Set success/fail state, will change what the pane is rendering
            if (success) {
                this.setState({view: "success"})
            } else {
                this.setState({view: "failure"})
            }
        }
    }

    // Get availabilities from bookings
    async getAvailabilities() {
        const bkgs = await getBookings(this.props.token, this.props.userType, this.props.userName).then()
        var avs = []

        var future = false
        var currentTime = roundedCurrentTime(30)
        var formattedTime = formatTime(currentTime)
        var next = formatTime(nextSlot(currentTime, 30))
        var nextNext = formatTime(nextSlot(currentTime, 60))

        // Filter available timeslots from booked timeslots
        for (let i = 0; i < bkgs.length; i++) {               
            if (bkgs[i]["customer"] === null) {             

                // Only add slots in the future
                if (future)
                    avs.push(bkgs[i]) 
                    if (parseDateString(bkgs[i]["timeslot"]["date"])  > parseDateString(formattedTime) || parseDateString(bkgs[i]["timeslot"]["date"])  > parseDateString(next) ||parseDateString(bkgs[i]["timeslot"]["date"])  > parseDateString(nextNext)) { 
                        future = true
                    }

            }
        }
        this.setState({availabilites: avs})
        return avs
    }
    
    // Get only the workers who have availabilites
    async getWorkerOptions() {
        const bkgs = await getBookings(this.props.token, this.props.userType, this.props.userName).then()
        var workerOptions = []
        var temp = []    
        for (let i = 0; i < bkgs.length; i++) {        
            if (bkgs[i]["customer"] === null) {   
                if (!temp.includes(bkgs[i]["worker"]["user"]["userName"])) {
                    workerOptions.push({
                        value: {
                            date: bkgs[i]["timeslot"]["date"], 
                            worker: bkgs[i]["worker"]["user"]["userName"], 
                            service: bkgs[i]["worker"]["services"][0]["name"]},
                        label: bkgs[i]["worker"]["user"]["userName"]
                    })
                    temp.push((bkgs[i]["worker"]["user"]["userName"]))
                }
            }
        }
        this.setState({workerOptions: workerOptions})
    }

    // Load the availability data in text area and enable booking button
    async onWorkerChange(wkr) {
        this.setState({selectedWorker: wkr["label"]})
        this.setState({avOptionsWorker: this.timeslotsOptionsByWorker()})
    }

    // Add all of a workers services as options
    async timeslotsOptionsByWorker() {
        const bkgs = await getBookings(this.props.token, this.props.userType, this.props.userName).then()
        var timeslotOptions = []

        var future = false
        var currentTime = roundedCurrentTime(30)
        var formattedTime = formatTime(currentTime)
        var next = formatTime(nextSlot(currentTime, 30))
        var nextNext = formatTime(nextSlot(currentTime, 60))

        for (let i = 0; i < bkgs.length; i++) {        
            if (bkgs[i]["customer"] === null) {   
                if (bkgs[i]["worker"]["user"]["userName"] === this.state.selectedWorker) {
                    for (let j = 0; j < bkgs[i]["worker"]["services"].length; j++) {        
                        
                        // only add bookings for timeslots in the future
                        if (future) {
                            timeslotOptions.push({
                                value: {
                                    date: bkgs[i]["timeslot"]["date"], 
                                    service: bkgs[i]["worker"]["services"][j]["name"]},
                                label: capitalise(bkgs[i]["worker"]["services"][j]["name"]) + " | " + parseDateString(bkgs[i]["timeslot"]["date"]).toString()
                            })
                        }
                        if (parseDateString(bkgs[i]["timeslot"]["date"])  > parseDateString(formattedTime) || parseDateString(bkgs[i]["timeslot"]["date"])  > parseDateString(next) ||parseDateString(bkgs[i]["timeslot"]["date"])  > parseDateString(nextNext)) {
                            future = true
                        }
                    }
                }
            }
        }
        this.setState({avOptionsWorker: timeslotOptions})
        return timeslotOptions
    }

    async onTimeslotChangeWorkerView(ts) {
        var avMsg = "You have selected " + ts["value"]["service"] + " with " +
                    this.state.selectedWorker + ", " + parseDateString(ts["value"]["date"]).toString() + "."
                    
        this.setState({bookingBtnMsg: "Book selected timeslot"})
        this.setState({selectedAvMsg: avMsg})        
        this.setState({selectedService: ts["value"]["service"]})
        this.setState({selectedTimeslot: ts["value"]["date"]})
    }


    // Load SLOTS_TO_VIEW # of availabilites, starting from startTimeslot
    async loadAvailabilityOptions(startTimeSlot) {

        // Used to skip the final slot being re-added for future batches of slots
        var step = 0
        var start        

        // If startTimeslot null, load timeslots starting from current time
        if (startTimeSlot == null)
            start = new Date()
        else 
            start = parseDateString(startTimeSlot)
            step = 0
        var count = 0
        const avs = this.state.availabilites
        var avOptions = []

        // Only process if availabilites exist
        if (avs.length !== 0) {
            // Only add timeslots to options if they are in the future
            for (let i = 0; i < avs.length; i++) {   
                var date = parseDateString(avs[i]["timeslot"]["date"])
                if (date > start && count < SLOTS_TO_VIEW && count < avs.length) {
                    count++
                    if (avs[i + step] !== null) {
                        const av = {
                            value: {
                                date: avs[i + step]["timeslot"]["date"], 
                                worker: avs[i + step]["worker"]["user"]["userName"], 
                                service: avs[i + step]["worker"]["services"][0]["name"], 
                                duration: avs[i + step]["worker"]["services"][0]["minDuration"]}, 
                            label: parseDateString(avs[i + step]["timeslot"]["date"]).toString()}
                        avOptions.push(av)

                        // select the first available appointment by default
                        if (step === 1) {

                        }
                    }
                    step = 0
                }
            }
            this.setState({avOptions: avOptions})
            
            // Set a different message depending on if or not availabilities exist
            if (avOptions.length > 0) {
                this.setState({lastCurrentAvOption: avOptions[avOptions.length - 1]["value"]["date"]})
                var msg = "(displaying " + (this.state.viewIndex - SLOTS_TO_VIEW)  + "-" + this.state.viewIndex + " of " + this.state.availabilites.length + ")"
                this.setState({viewMessage: msg})
    
            } else {
                this.setState({viewMessage: "No availabilites found for any workers."})
            }
        }
    }

    // Load the availability data in text area and enable booking button
    async onAvailabilityChange(av) {
    
        var avMsg = "You have selected " + av["value"]["service"] + " with " +
                    av["value"]["worker"] + ", " + av["label"] + "."
                    
        var service = av["value"]["service"]
        var worker = av["value"]["worker"]
        var timeslot = av["value"]["date"]

        this.setState({selectedAv: av})
        this.setState({bookingBtnMsg: "Book selected timeslot"})
        this.setState({selectedAvMsg: avMsg})        
        this.setState({selectedService: service})
        this.setState({selectedWorker: worker})
        this.setState({selectedTimeslot: timeslot})
        
    }

    // Load next batch of av's
    async loadNext() {
        
        var avs = await this.getAvailabilities()
        if (this.state.viewIndex !== avs.length) {
            
            // Adjust display message
            if (this.state.viewIndex + SLOTS_TO_VIEW > avs.length) {
                this.setState({viewIndex: avs.length})
            } else {
                this.setState({viewIndex: this.state.viewIndex + SLOTS_TO_VIEW})
            }

            // Load next batch of slots
            this.loadAvailabilityOptions(this.state.lastCurrentAvOption)

            this.setState({bookingBtnMsg: "~"})
            this.setState({selectedAvMsg: ""})        
            this.setState({selectedService: ""})
            this.setState({selectedWorker: ""})
            this.setState({selectedTimeslot: ""})
        }
    }

    reset () {
        this.setState({view: "select"})
        this.setState({availabilites: this.getAvailabilities()})
        this.setState({avOptions: []})
        this.setState({lastCurrentAvOption: null})
        this.setState({selectedAv: null})
        this.setState({viewMessage: null})
        this.setState({viewMessageCount: null})
        this.setState({viewIndex: SLOTS_TO_VIEW})
        this.setState({bookingBtnMsg: "~"})
        this.setState({textAreaMsg: ""})
        this.setState({selectedAvMsg: ""})
    }

    render() {
        
        const animatedComponents = makeAnimated();

        const id = this.props.id
        const userName = this.props.userName
        const userType = this.props.userType
        const token = this.props.token

        // Check user is logged in
        if (this.props.userName === undefined && this.props.userType === undefined) {
            return (
                <div className="cancel_pane" id="cancel_pane">
                    <br/>
                    <b>Please log in to view availabilites</b>
                    <br/><br/>
                </div>
            )

        // Default view, user needs to make a selection
        } else if (this.state.view === "select") {
            return (
                <div className="cancel_pane" id="cancel_pane">
                    <br/>
                    <b>Choose worker or timeslot view</b>
                    <br/><br/>
                    <div className="row">
                        <div className="col-sm">
                            <button className="btn btn-outline-dark" id="navButton" onClick={this.timeslotView}>
                                View availabilities by timeslot
                            </button> 
                        </div>
                        <div className="col-sm">
                            <button className="btn btn-outline-dark" id="navButton" onClick={this.workerView}>
                                View availabilities by worker
                            </button> 
                        </div>
                    </div>
                    <div id="userId" style={{display: "none"}}>{id}</div>
                    <div id="userName" style={{display: "none"}}>{userName}</div>
                    <div id="userType" style={{display: "none"}}>{userType}</div>
                    <div id="userToken" style={{display: "none"}}>{token}</div>
                </div>
            )
        
         // Worker view
        } else if (this.state.view === "worker") {
            return (
                <div className="timeslot_view_pane" id="timeslot_view_pane">
                    <br/>
                    <b>Availabilites by worker</b>
                    <br/>                 

                    <div className="row">
                        <div className="col-sm">
                            Select a worker to view availabilities
                        </div>
                    </div>
                    <br/>

                    <div className="row">
                        <div className="col-sm">
                            <Select name={"worker"} components={animatedComponents}
                                    value={this.state.value} 
                                    options={this.state.workerOptions}
                                    onChange={this.onWorkerChange}/>
                            <br/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm">
                            <Select name={"availabilities"} components={animatedComponents}
                                    value={this.state.value} 
                                    options={this.state.avOptionsWorker}
                                    onChange={this.onTimeslotChangeWorkerView}/>
                            <br/>
                        </div>
                    </div>

                    <b><font color="MidnightBlue">{this.state.selectedAvMsg}</font></b>
                    <div id="selectedService" style={{display: "none"}}>{this.state.selectedService}</div>
                    <div id="selectedWorker" style={{display: "none"}}>{this.state.selectedWorker}</div>
                    <div id="selectedTimeslot" style={{display: "none"}}>{this.state.selectedTimeslot}</div>
                    <br/><br/>

                    <div className="row">
                        <div className="col-sm">
                            <button className="btn btn-outline-dark" id="navButton" onClick={this.book}>
                                {this.state.bookingBtnMsg}
                            </button> 
                        </div>
                    </div>   
                    <br/>

                    <div className="row">
                        <div className="col-sm">
                            <button className="btn btn-outline-dark" id="navButton" onClick={this.selectView}>
                                Back to select view
                            </button> 
                        </div>
                        <div className="col-sm">
                            <Link to="/Dashboard" className="btn btn-outline-dark" id="navButton">Cancel</Link>    
                        </div>
                    </div>
                    <div id="userId" style={{display: "none"}}>{id}</div>
                    <div id="userName" style={{display: "none"}}>{userName}</div>
                    <div id="userType" style={{display: "none"}}>{userType}</div>
                    <div id="userToken" style={{display: "none"}}>{token}</div>
                </div>
            )

        // Timeslot view
        } else if (this.state.view === "timeslot") {

            const next = "next " + SLOTS_TO_VIEW + " >>"
            const avOptions = this.state.avOptions
            var availDisplay

            // Wait for promise fulfillment
            var count = 0
            if(Array.isArray(avOptions)) {
                availDisplay = avOptions.map((opt) => { 
                    return (
                        <div className="list-group-item d-flex justify-content-between align-items-center" key={++count}>
                            {opt["label"]} | {capitalise(opt["value"]["service"])} with {opt["value"]["worker"]}
                            <span className="badge badge-primary badge-pill">{opt["value"]["duration"]} min</span>
                        </div>
                    )
                })
            }

            return (
                
                <div className="timeslot_view_pane" id="timeslot_view_pane">
                    <br/>
                    <b>Availabilites by timeslot</b>
                    
                    <div className="row">
                        <div className="col-sm">
                            {this.state.viewMessage}
                        </div>
                    </div>
                    <br/>

                    <div className="row">
                        <div className="col-2">
                            <Link to="/availabilites">
                                <div className="btn btn-outline-dark" id="navButton" onClick={this.reset}>Reset</div> 
                            </Link>
                        </div>
                        <div className="col-8">
                            <Select name={"availabilities"} components={animatedComponents}
                                    value={this.state.value} 
                                    options={this.state.avOptions}
                                    onChange={this.onAvailabilityChange}/>
                            <br/>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-outline-dark" id="navButton" onClick={this.loadNext}>{next}</button> 
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm">
                            <div className="list-group list-group-flush">              
                                {availDisplay}
                            </div>
                        </div>
                    </div>   
                    <br/>

                    <b><font color="MidnightBlue">{this.state.selectedAvMsg}</font></b>
                        <div id="selectedService" style={{display: "none"}}>{this.state.selectedService}</div>
                        <div id="selectedWorker" style={{display: "none"}}>{this.state.selectedWorker}</div>
                        <div id="selectedTimeslot" style={{display: "none"}}>{this.state.selectedTimeslot}</div>
                    <br/><br/>

                    <div className="row">
                        <div className="col-sm">
                            <button className="btn btn-outline-dark" id="navButton" onClick={this.book}>
                                {this.state.bookingBtnMsg}
                            </button> 
                        </div>
                    </div>   
                    <br/>

                    <div className="row">
                        <div className="col-sm">
                            <button className="btn btn-outline-dark" id="navButton" onClick={this.selectView}>
                                Back to select view
                            </button> 
                        </div>
                        <div className="col-sm">
                            <Link to="/Dashboard" className="btn btn-outline-dark" id="navButton">Cancel</Link>    
                        </div>
                    </div>
                    <div id="userId" style={{display: "none"}}>{id}</div>
                    <div id="userName" style={{display: "none"}}>{userName}</div>
                    <div id="userType" style={{display: "none"}}>{userType}</div>
                    <div id="userToken" style={{display: "none"}}>{token}</div>
                </div>
            )
             
        // Successful booking
        } else if (this.state.view === "success") {
            return (
                <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">
                    <br/>    
                    <b>Booking placed successfully. Thanks, {this.props.userName}.</b>
                    <br/><br/>   
                    <Link to="/dashboard">View your bookings.</Link>
                    <br/><br/>  
                    <div className="row">
                        <div className="col-sm">
                            <button className="btn btn-outline-dark" id="navButton" onClick={this.reset}>
                                Make another booking
                            </button> 
                        </div>
                        <div className="col-sm">
                            <CancelButton/>
                        </div>
                    </div>
                </div>   
            )

        // Failed booking
        } else if (this.state.view === "failure") {
            return (
                <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">
                    <br/>    
                    <b>Booking failed. Please try again.</b>
                    <br/><br/>   
                
                <div className="row">
                    <div className="col-sm">
                        <button className="btn btn-outline-dark" id="navButton" onClick={this.reset}>
                            Make another booking
                        </button> 
                    </div>
                    <div className="col-sm">
                        <CancelButton/>
                    </div>
                </div>
            </div>  
            )
        }
    }
}

export default AvailabilitiesPane
