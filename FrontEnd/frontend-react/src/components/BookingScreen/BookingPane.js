import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker'
import axios from "axios";
import CancelButton from './CancelButton';

    function roundTo(date) {
        
        // Change final number to match min booking duration
        // Assumed 15 

        var mins = 1000 * 60 * 15;
        return new Date(Math.round(date.getTime() / mins) * mins)
    }

    var config = {
        headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin:': '*'
        }
    }

    function createBooking(newBooking) {

        console.log(newBooking)

        axios.post('https://ae5b398a-4768-4d8f-b24a-0f5aa15a09a0.mock.pstmn.io/bookings', {
        // axios.post('http://localhost:8080/api/booking', {
            
            timeslot: newBooking.timeslot,
            duration: newBooking.duration,
            service: newBooking.service,
            worker: newBooking.worker,
            customer: newBooking.customer

        }, config)
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })
    }
    
class BookingPane extends Component {

    constructor() {
        super()
        this.state = {
            date: roundTo(new Date()),
            duration: "",
            service: "",
            worker: "",
            customer: "",
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        if (e.name === "date")
            this.setState({[e.name]: roundTo(e.value)});
        else
            this.setState({[e.name]: e.value});
    }
    
    onSubmit(e){
        e.preventDefault();

        // Need to match this with Cams backend format
        var timeslot = roundTo(this.state.date)

        const newBooking = {
            timeslot: timeslot,
            duration: this.state.duration,
            service: this.state.service,
            worker: this.state.worker,
            customer: this.state.customer
        }

        // Send the POST request
        createBooking(newBooking);
    }

    render() {
        return (
            <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">
                <br/>    
                <b>Bookings</b>
                <br/>   
                <form onSubmit={this.onSubmit}>
                    <p>Select desired start time and date. Actual start time rounded to the closest 15 minutes:</p>
                    <DateTimePicker onChange={this.onChange} value={this.state.date}/>
                    <br/> <br/>    
                    <div className="form-group">
                        <label htmlFor="duration">Select job duration:</label>
                        <select className="form-control" value={this.state.duration} onChange={this.onChange} name="duration">
                            <option value="15">15 min</option>
                            <option value="30">30 min</option>
                            <option value="45">45 min</option>
                            <option value="60" >1 hour</option>
                            <option value="75">1 hr 15 min</option>
                            <option value="90">1 hr 30 min</option>
                            <option value="105">1 hr 45 min</option>
                            <option value="120">2 hours</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <label htmlFor="service">Select a service:</label>
                    <select className="form-control" value={this.state.service} onChange={this.onChange}>
                      <option value="1" >Service 1</option>
                      <option value="2">Service 2</option>
                      <option value="3">Service 3</option>
                    </select>
                    </div>
                    <div className="form-group">
                    <label htmlFor="worker">Select an available worker:</label>
                    <select className="form-control" value={this.state.worker} onChange={this.onChange}>
                      <option value="1" >Worker 1</option>
                      <option value="2">Worker 2</option>
                      <option value="3">Worker 3</option>
                    </select>
                    </div>

                    <div className="row">
                        <div className="col-sm">
                           <input type="submit" className="btn btn-sm btn-dark" id="navButton"/>

                        </div>
                        <div className="col-sm">
                            <CancelButton/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default BookingPane;
