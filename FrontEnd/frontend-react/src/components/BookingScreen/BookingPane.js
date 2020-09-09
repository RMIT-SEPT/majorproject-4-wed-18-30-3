import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker'
import axios from "axios";
import CancelButton from './CancelButton';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

    // Round a date object to its nearest 15min increment
    function roundTo(date) {
        
        // Change final number to match min booking duration
        // Assumed 15 
        if (date != null) {
            var mins = 1000 * 60 * 15;
            return new Date(Math.round(date.getTime() / mins) * mins)
        } else 
            return date

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
            duration: null,
            service: null,
            worker: null,
            customer: null,
        }

        // this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onDateChange = date => this.setState({ date })
    onDurationChange = duration => this.setState({ duration })
    onServiceChange = service => this.setState({ service })
    onWorkerChange = worker => this.setState({ worker })
    
    onSubmit(e){
        e.preventDefault();

        if (this.state.date == null) {
            alert("Please select a start time and date.")
        }
        if (this.state.duration == null) {
            alert("Please select a duration.")
        }
        if (this.state.service == null) {
            alert("Please select a service.")
        }
        if (this.state.worker == null) {
            alert("Please select a worker.")
        }            

        // Need to match this with Cams backend format
        var timeslot = roundTo(this.state.date)

        // Get this from local React state once login is done
        var customer = null;

        const newBooking = {
            timeslot: timeslot,
            duration: this.state.duration.value,
            service: this.state.service.value,
            worker: this.state.worker.value,
            customer: customer
        }

        // Send the POST request
        createBooking(newBooking);
    }

    render() {
        const animatedComponents = makeAnimated();
        var durationOptions = [
            { value: 15, label: '15 minutes' },
            { value: 30, label: '30 minutes' },
            { value: 45, label: '45 minutes' },
            { value: 60, label: '1 hour' },
            { value: 75, label: '1 hr 15 mins' },
            { value: 90, label: '1 hr 30 mins' },
            { value: 105, label: '1 hr 45 mins' },
            { value: 120, label: '2 hours' },
        ]

        var serviceOptions = [
            { value: 'mowing', label: 'Mowing' },
            { value: 'hedging', label: 'Hedging' },
            { value: 'pool_cleaning', label: 'Pool Cleaning' },
        ]

        var workerOptions = [
            { value: 'jim', label: 'Jim' },
            { value: 'tim', label: 'Tim' },
            { value: 'rob', label: 'Rob' },
        ]
        
        return (
            <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">
                <br/>    
                <b>Bookings</b>
                <br/>   
                <form onSubmit={this.onSubmit}>
                    <p>Select desired start time and date. Actual start time rounded to the closest 15 minutes:</p>
                    <DateTimePicker name="date" value={this.state.date} onChange={this.onDateChange}/>
                    <br/> <br/>    
                    <div className="form-group">
                        <label htmlFor="duration">Select job duration:</label>
                        <Select name={"duration"} value={this.state.duration} options={durationOptions} 
                            onChange={this.onDurationChange} components={animatedComponents}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="service">Select a service:</label>
                        <Select name={"service"} value={this.state.value} options={serviceOptions}
                            onChange={this.onServiceChange} components={animatedComponents}/>
                    </div>
                    <div className="form-group">
                    <label htmlFor="worker">Select an available worker:</label>
                    <Select name={"worker"} value={this.state.value} options={workerOptions}
                        onChange={this.onWorkerChange} components={animatedComponents}/>
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
