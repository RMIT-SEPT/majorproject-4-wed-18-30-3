import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker'
import AddBookingButton from './AddBookingButton';
import CancelButton from './CancelButton';

    function roundTo(date) {
        
        // Change final number to match min booking duration
        // Assumed 15 

        var mins = 1000 * 60 * 15;
        return new Date(Math.round(date.getTime() / mins) * mins)
    }

    function createBooking() {
        var timeslot = this.state.date;

        var i = document.getElementById("service");
        var service = i.options[i.selectedIndex].value;
        
        var i = document.getElementById("duration");
        var duration = i.options[i.selectedIndex].value;
        
        var i = document.getElementById("worker");
        var worker = i.options[i.selectedIndex].value;

        var customer = null;
        var group = null;

        alert(timeslot + service + duration + worker + customer + group)
    }
    
class BookingPane extends Component {

    state = {date: roundTo(new Date()),}

    onChange = date => this.setState({ date: roundTo(date) })

    render() {
        return (
            <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">
                <br/>    
                <b>Bookings</b>
                <br/>   
                <form>
                    <p>Select desired start time and date (please note 15 minute minimum duration):</p>
                    <DateTimePicker onChange={this.onChange} value={roundTo(this.state.date)}/>
                    <br/> <br/>    
                    <div class="form-group">
                        <label for="duration">Select job duration:</label>
                        <select class="form-control" id="duration">
                            <option value="15">15 min</option>
                            <option value="30">30 min</option>
                            <option value="45">45 min</option>
                            <option value="60">1 hour</option>
                            <option value="75">1 hr 15 min</option>
                            <option value="90">1 hr 30 min</option>
                            <option value="105">1 hr 45 min</option>
                            <option value="120">2 hours</option>
                            <option value="135">2 hr 15 min</option>
                            <option value="150">2 hr 30 min</option>
                            <option value="165">2 hr 45 min</option>
                            <option value="180">3 hours</option>
                            <option value="195">3 hr 15 min</option>
                            <option value="210">3 hr 30 min</option>
                            <option value="225">3 hr 45 min</option>
                            <option value="240">4 hours</option>
                        </select>
                    </div>
                    <div class="form-group">
                    <label for="service">Select a service:</label>
                    <select class="form-control" id="service">
                      <option value="1">Service 1</option>
                      <option value="2">Service 2</option>
                      <option value="3">Service 3</option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label for="worker">Select an available worker:</label>
                    <select class="form-control" id="worker">
                      <option value="1">Worker 1</option>
                      <option value="2">Worker 2</option>
                      <option value="3">Worker 3</option>
                    </select>
                    </div>

                    <div className="row">
                        <div className="col-sm">
                           <button className="btn btn-sm btn-dark" id="navButton" onlick={createBooking}>
                            Create new booking
                           </button>
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
