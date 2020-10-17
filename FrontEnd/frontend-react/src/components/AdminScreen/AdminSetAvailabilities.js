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

// Send a create booking request to bookings endpoint
async function setAvailability(availability, token, userType, userName) {

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
    },  { headers: { 
            'Authorization': token }
    })
    .then(res => {
        return true
    })
    .catch(error => {
        console.error("setAvailability()", error)
        console.error(error.response.data)
        return false
    })
}

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

async function getTimeslots(token, userType, userName) {
    
    return await axios.get(DNS_URI + '/api/timeslot', {
        headers: { 
            'Authorization': token }
    }).then(response => {
        console.log("getTimeslots()", response)
        return response.data
    }).catch(error => {
        console.error("getTimeslots()", error)
    })
}

async function getWorkers(token, userType, userName) {

    var urlString = '/api/worker'
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

class AdminSetAvailabilities extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedDate: null,
            workerOptions: this.getWorkerOptions(),
            dateOptions: null,
            selectedService: null,
            serviceOptions: null,
            selectedWorker: null,
            lastDateShown: null,

            showSubmitPanel: false,
            showMultiPanel: false,
            submitMessage: null,
            buttonMsg: "~",

            disableWorker: false,
            disableService: true,
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
        this.getWorkerOptions = this.getWorkerOptions.bind(this)
        this.getDateOptions = this.getDateOptions.bind(this)
        this.getServiceOptions = this.getServiceOptions.bind(this)
        this.onChange = this.onChange.bind(this)
        this.checkTimeslotsExist = this.checkTimeslotsExist.bind(this)

        this.checkTimeslotsExist()
    }

    onChange(e){
        this.setState({[e.value.target]: e.value.value})
        
        if (e.value.target === "selectedService") {
            this.setState({dateOptions: this.getDateOptions()})
            this.setState({disableService: true})
            this.setState({disableTimeslot: false})
            this.setState({showMultiPanel: true})
            this.setState({buttonMsg: "Submit batch"})

        } else if (e.value.target === "selectedDate") {
            this.setState({showSubmitPanel: true})
            var msg = this.state.selectedService + " service by " + this.state.selectedWorker + " on " + parseDateString(e.value.value)
            this.setState({submitMessage: msg})
        
        } else if (e.value.target === "selectedWorker") {
            this.setState({serviceOptions: this.getServiceOptions()})
            this.setState({disableWorker: true})
            this.setState({disableService: false})
        }
    }

    async getWorkerOptions() {
        if (this.props.userName !== undefined && this.props.userType !== undefined) {
            const wks = await getWorkers(this.props.token, this.props.userType, this.props.userName).then()            
            var workerOptions = []
            for (let i = 0; i < wks.length; i++) { 
                workerOptions.push({
                    value: {
                        target: "selectedWorker",
                        value: wks[i].user.userName,                              
                        services: wks[i].services,
                        company: wks[i].companyName
                    },
                    label: wks[i].user.userName
                })
            }
            this.setState({workerOptions: workerOptions})
        }
    }

    async getDateOptions() {

        if (this.props.userName !== undefined && this.props.userType !== undefined) {
            
            // Get a list of the workers existing bookings, if any
            const ts = await getTimeslots(this.props.token, this.props.userType, this.props.userName).then()
            var bkgTimes = []
            const bkgs = await getBookings(this.props.token, this.props.userType, this.props.userName).then()
            
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
    }

    // Load next batch of timeslots, starting from the last previously displayed
    async next() {

        this.setState({showSubmitPanel : false})
        this.setState({selectedDate: null})
        const ts = await getTimeslots().then()
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
        const wks = await getWorkers(this.props.token, this.props.userType, this.props.userName).then()            
        var serviceOptions = []
        for (let i = 0; i < wks.length; i++) { 
            for (let j = 0; j < wks[i].services.length; j++) { 
                if(wks[i].user.userName === this.state.selectedWorker) {
                    serviceOptions.push({
                        value: {
                            target: "selectedService",
                            value: wks[i].services[j].name                              
                        },
                        label: wks[i].services[j].name
                    })
                }
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
        const rawTimeslots = await getTimeslots(this.props.token, this.props.userType, this.props.userName).then()
        const bkgs = await getBookings(this.props.token, this.props.userType, this.props.userName).then()
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
       
        // Only make bookings if the backend has timeslots
        if (timeslotDates.length > 1) {
            
            // Create n * 64 availabilities starting from the current earliest timeslot
            // (assume min duration is 30 mins, so 64 * 30 = 1 day)
            var results = []
            for (let i = 0; i < n * 64; i++) { 
                if (i < timeslotDates.length) {
                
                    var result = await setAvailability({
                        worker: {user: {userName: this.state.selectedWorker}},
                        timeslot: {date: timeslotDates[i]},
                        service: this.state.selectedService
                    }, this.props.token, this.props.userType, this.props.userName)
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
        
        if (this.props.userName !== undefined && this.props.userType !== undefined) {
            // Get a list of the workers next open timeslots
            const rawTimeslots = await getTimeslots(this.props.token, this.props.userType, this.props.userName).then()
            const bkgs = await getBookings(this.props.token, this.props.userType, this.props.userName).then()
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
    }

    async singleSlotAvail() {
        var newAvailability = {
            worker: {user: {userName: this.state.selectedWorker}},
            timeslot: {date: this.state.selectedDate},
            service: this.state.selectedService
        }

        const result = await setAvailability(newAvailability, this.props.token, this.props.userType, this.props.userName)

        if (result) {
            this.setState({success: true})
        } else {
            this.setState({success: false})
        }
    }

    render() {
        
        var reset_url
        if (window.location.pathname === "/admin_set_availabilites" ) {
            reset_url = "/admin_set_availabilites_reset"
        } else if (window.location.pathname === "/admin_set_availabilites_reset") {
            reset_url = "/admin_set_availabilites"
        } else 
            reset_url = "/admin_set_availabilites" 
        
        const animatedComponents = makeAnimated()
        
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
        }

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
                    
                    <h2>Set worker availabilities</h2>

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
                        <font>Select a worker</font>
                        <br/><br/>
                        <div className="row">
                            <div className="col-sm">
                                <Select name={"selectedWorker"} id={"selectedWorker"} components={animatedComponents}
                                        value={this.state.value} 
                                        options={this.state.workerOptions}
                                        onChange={this.onChange}
                                        isDisabled={this.state.disableWorker}/>
                            </div>
                        </div>
                        <br/>
                        <font>Select service for worker</font>
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
                                <p>...or make {this.state.selectedWorker} availabile broadly</p>
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

export default AdminSetAvailabilities;
