import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select';
import axios from "axios";
import makeAnimated from 'react-select/animated';

// How many timeslots to display at once in the drop down for timeslot view
const SLOTS_TO_VIEW = 8

const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"

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

const capitalise = (string) => {
    if (typeof string !== 'string') return null
    return string.charAt(0).toUpperCase() + string.slice(1)
}

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

async function getBookings() {
    return await axios.get(DNS_URI + '/api/booking').then(response => {
        return response.data
    })
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
            viewMessage: null,
            viewMessageCount: null,
            viewIndex: SLOTS_TO_VIEW,
            bookingBtnMsg: "~",
            textAreaMsg: ""
        }

        this.loadNext = this.loadNext.bind(this)
        this.loadPrev = this.loadPrev.bind(this)
        this.loadAvailabilityOptions = this.loadAvailabilityOptions.bind(this)
        this.onAvailabilityChange = this.onAvailabilityChange.bind(this)
        this.selectView = this.selectView.bind(this)
        this.timeslotView = this.timeslotView.bind(this)
        this.workerView = this.workerView.bind(this)
    }

    timeslotView () {this.setState({view: "timeslot"}, this.setState({availabilites: this.loadAvailabilityOptions()}))}
    selectView () {this.setState({view: "select"})}
    workerView () {this.setState({view: "worker"})}

    onChange(e){

    }

    // Store availabilities in component state
    async getAvailabilities() {
        const bkgs = await getBookings().then()
        var avs = []

        // Filter available timeslots from booked timeslots
        for (let i = 0; i < bkgs.length; i++) {               
            if (bkgs[i]["customer"] === null) {             
                avs.push(bkgs[i]) 
            }
        }
        this.setState({availabilites: avs})
        return avs
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
            step = 1
        var count = 0
        const avs = this.state.availabilites
        var avOptions = []
        
        

        // Only add timeslots to options if they are in the future
        for (let i = 0; i < avs.length; i++) {   
            var date = parseDateString(avs[i]["timeslot"]["date"])
            if (date > start && count < SLOTS_TO_VIEW && count < avs.length) {
                count++
                if (avs[i + step] !== null) {
                    avOptions.push({
                        value: {
                            date: avs[i + step]["timeslot"]["date"], 
                            worker: avs[i + step]["worker"]["user"]["userName"], 
                            service: avs[i + step]["worker"]["services"][0]["name"]}, 
                        label: parseDateString(avs[i + step]["timeslot"]["date"]).toUTCString()})
                }
                step = 0
            }
        }
        this.setState({avOptions: avOptions})

        console.log(avOptions)

        console.log(avOptions[avOptions.length - 1])

        this.setState({lastCurrentAvOption: avOptions[avOptions.length - 1]["value"]["date"]})
        var msg = "(displaying " + (this.state.viewIndex - SLOTS_TO_VIEW)  + "-" + this.state.viewIndex + " of " + this.state.availabilites.length + ")"
        this.setState({viewMessage: msg})

        var text = ""
        for (let i = 0; i < avOptions.length; i++) {  
            text += avOptions[i]["label"] + " | " + capitalise(avOptions[i]["value"]["service"]) +
                    " with " + avOptions[i]["value"]["worker"] + "\n"
            count++
        }
        this.setState({textAreaMsg: text})

    }

    // Load the availability data in text area and enable booking button
    async onAvailabilityChange(av) {
        this.setState({selectedAv: av})
    
        var avMsg = "You have selected " + av["value"]["service"] + " with " +
                    av["value"]["worker"] + ", " + av["label"] + "."

        this.setState({bookingBtnMsg: "Book selected timeslot"})
        this.setState({selectedAvMsg: avMsg})        
    }

    // Load next batch of av's
    async loadNext() {
        
        var avs = await this.getAvailabilities()
        if (this.state.viewIndex != avs.length) {
            
            // Adjust display message
            if (this.state.viewIndex + SLOTS_TO_VIEW > avs.length) {
                this.setState({viewIndex: avs.length})
            } else {
                this.setState({viewIndex: this.state.viewIndex + SLOTS_TO_VIEW})
            }

            // Load next batch of slots
            this.loadAvailabilityOptions(this.state.lastCurrentAvOption)
        }

    }

    // Load last batch of av's
    async loadPrev() {

    }

    render() {
        
        const animatedComponents = makeAnimated();

        // Default view, user needs to make a selection
        if (this.state.view === "select") {
            return (
                <div className="cancel_pane" id="cancel_pane">
                    <br/>
                    <b>Choose worker or timeslot view</b>
                    <br/><br/>
                    <div className="row">
                        <div className="col-sm">
                            <button className="btn btn-sm btn-dark" id="navButton" onClick={this.timeslotView}>
                                View availabilities by timeslot
                            </button> 
                        </div>
                        <div className="col-sm">
                            <button className="btn btn-sm btn-dark" id="navButton" onClick={this.workerView}>
                                View availabilities by worker
                            </button> 
                        </div>
                    </div>
                </div>
            )
        
        // Timeslot view
        } else if (this.state.view === "timeslot") {

            const next = "next " + SLOTS_TO_VIEW + " slots >>"
            const prev = "<< prev " + SLOTS_TO_VIEW + " slots"
            
            return (
                <div className="timeslot_view_pane" id="timeslot_view_pane">
                    <br/>
                    <b>Availabilites by timeslot</b>
                    
                    <div className="row">
                        <div className="col-sm">
                            Select a timeslot - {this.state.viewMessage}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-2">
                            <button className="btn btn-sm btn-dark" id="navButton" onClick={this.loadPrev}>{prev}</button> 
                        </div>
                        <div className="col-8">
                            <Select name={"availabilities"} components={animatedComponents}
                                    value={this.state.value} 
                                    options={this.state.avOptions}
                                    onChange={this.onAvailabilityChange}/>
                            <br/>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-sm btn-dark" id="navButton" onClick={this.loadNext}>{next}</button> 
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm">
                            <textarea id="form7" className="md-textarea form-control" 
                                    rows="9" 
                                    value={this.state.textAreaMsg}
                                    onChange={this.onChange}/>
                        </div>
                    </div>   
                    <br/>


                    <b><font color="MidnightBlue">{this.state.selectedAvMsg}</font></b>
                    <br/><br/>

                    <div className="row">
                        <div className="col-sm">
                            <button className="btn btn-sm btn-dark" id="navButton" onClick={this.book}>
                                {this.state.bookingBtnMsg}
                            </button> 
                        </div>
                    </div>   
                    <br/>

                    <div className="row">
                        <div className="col-sm">
                            <button className="btn btn-sm btn-dark" id="navButton" onClick={this.selectView}>
                                Back to select view
                            </button> 
                        </div>
                        <div className="col-sm">
                            <Link to="/Dashboard" className="btn btn-sm btn-dark" id="navButton">Cancel</Link>    
                        </div>
                    </div>
                </div>
            )
             
        // Worker view
        } else if (this.state.view === "worker") {
            return (
                <div className="timeslot_view_pane" id="timeslot_view_pane">
                    <b>Availabilites by worker</b>
                 

                    <div className="row">
                        <div className="col-sm">
                            Select a worker to view availabilities
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm">
                            <button className="btn btn-sm btn-dark" id="navButton" onClick={this.selectView}>
                                Back to select view
                            </button> 
                        </div>
                        <div className="col-sm">
                            <Link to="/Dashboard" className="btn btn-sm btn-dark" id="navButton">Cancel</Link>    
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default AvailabilitiesPane;
