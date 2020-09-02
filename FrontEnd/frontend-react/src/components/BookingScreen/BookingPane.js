import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker'
import AddBookingButton from './AddBookingButton';
import CancelButton from './CancelButton';

    function roundTo(date) {
        var mins = 1000 * 60 * 15; // Change final number to match min booking duration
        return new Date(Math.round(date.getTime() / mins) * mins)
    }

class BookingPane extends Component {

    state = {
        date: roundTo(new Date()),
    }

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
                        <label for="duration">Select job duration (required):</label>
                        <select class="form-control" id="duration">
                            <option>15 min</option>
                            <option>30 min</option>
                            <option>45 min</option>
                            <option>1 hour</option>
                            <option>1 hr 15 min</option>
                            <option>1 hr 30 min</option>
                            <option>1 hr 45 min</option>
                            <option>2 hours</option>
                            <option>2 hr 15 min</option>
                            <option>2 hr 30 min</option>
                            <option>2 hr 45 min</option>
                            <option>3 hours</option>
                            <option>3 hr 15 min</option>
                            <option>3 hr 30 min</option>
                            <option>3 hr 45 min</option>
                            <option>4 hours</option>
                        </select>
                    </div>
                    <div class="form-group">
                    <label for="service">Select a service(required):</label>
                    <select class="form-control" id="service">
                      <option>Service 1</option>
                      <option>Service 2</option>
                      <option>Service 3</option>
                    </select>
                    </div>
                    <div class="form-group">
                    <label for="worker">Select an available worker:</label>
                    <select class="form-control" id="worker">
                      <option>Worker 1</option>
                      <option>Worker 2</option>
                      <option>Worker 3</option>
                    </select>
                    </div>

                    <div className="row">
                        <div className="col-sm">
                            <AddBookingButton/>
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
