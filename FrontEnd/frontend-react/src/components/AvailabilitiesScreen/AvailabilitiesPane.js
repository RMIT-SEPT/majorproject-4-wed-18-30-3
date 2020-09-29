import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const MIN_DURATION = 30

function roundUpCurrentTime() {
    var date = new Date();

    var cMins = date.getUTCMinutes()
    var hr = date.getUTCHours()
    var day = date.getUTCDate()

    var mins = 0
    inc_hr = false;

    if (cMins >= 0 && cMins < 30) {
        mins = 30
    } else if (cMins >= 30 && cMins < 60) {
        mins = 0
        hr = hr + 1
        if (hr > 24)
            day = day + 1
        if (day > 7)
            day = 0
    }

    var dateString =
        date.getUTCFullYear() + "-" +
        ("0" + (date.getUTCMonth()+1)).slice(-2) + "-" +
        ("0" + day).slice(-2) + "-" +
        ("0" + hr).slice(-2) + "-" +
        ("0" + mins).slice(-2) + "-" +
        ("0" + 0);
    return dateString
}

class AvailabilitiesPane extends Component {

    constructor(props) {
        super(props)
        this.state = {
            view: "select",
            availabilities: null,
            availabilityOptions: loadAvailabilityOptions(),
        }

        this.loadAvailabilityOptions = this.loadAvailabilityOptions.bind(this)
        this.selectView = this.selectView.bind(this);
        this.timeslotView = this.timeslotView.bind(this);
        this.workerView = this.workerView.bind(this);
    }

    selectView () {this.setState({view: "select"})}
    timeslotView () {this.setState({view: "timeslot"})}
    workerView () {this.setState({view: "worker"})}

    // Load the current 10 availabilites, starting from startTimeslot
    async loadAvailabilityOptions(startTimeSlot) {

        // If startTimeslot null, load timeslots starting from current time
        // rounded to next min. booking duration increment
        var start
        if (startTimeSlot === null )
            start = roundedCurrentTime(MIN_DURATION)
        else 
            start = startTimeSlot

        

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
            const next = ">>>"
            const prev = "<<<"
            return (
                <div className="timeslot_view_pane" id="timeslot_view_pane">
                    <br/>
                    <b>Availabilites by timeslot</b>
                    
                    <div className="row">
                        <div className="col-sm">
                            Select a timeslot to view availabilities:
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-2">
                            <button className="btn btn-sm btn-dark" id="navButton" onClick={this.loadPrev}>{prev}</button> 
                        </div>
                        <div className="col-8">
                            <Select name={"availabilities"} components={animatedComponents}
                                    value={this.state.value} 
                                    options={this.state.availabilityOptions}
                                    onChange={this.onAvailabilityChange}/>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-sm btn-dark" id="navButton" onClick={this.loadNext}>{next}</button> 
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
