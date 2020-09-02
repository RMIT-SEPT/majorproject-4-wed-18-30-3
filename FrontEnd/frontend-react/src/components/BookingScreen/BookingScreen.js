import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import InlineNavPane from './InlineNavPane'
import CalendarPane from './CalendarPane'

class BookingScreen extends Component {
    render() {
        return (
            <div className="container" id="booking_screen_container">
                <h1>Make a booking</h1>
                <div className="row no-gutters">
                    <div className="col-sm-3">
                        <InlineNavPane/>
                    </div>
                    <div className="col-sm-9">
                        <CalendarPane/>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookingScreen;
