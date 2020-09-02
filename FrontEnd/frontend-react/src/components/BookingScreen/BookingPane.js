import React, { Component } from 'react'
import DateTimePicker from 'react-datetime-picker'

class BookingPane extends Component {
    
    state = {
        date: new Date(),
    }

    onChange = date => this.setState({ date })

    render() {
        return (
            <div className="booking_screen_bookingpane" id="booking_screen_bookingpane">
                <br/>    
                
                <b>Bookings</b>
                <br/>
                
                <p>Select a booking timeslot (30 min increments):</p>
                <DateTimePicker onChange={this.onChange} value={this.state.date}/>

            </div>
        )
    }
}

export default BookingPane;
