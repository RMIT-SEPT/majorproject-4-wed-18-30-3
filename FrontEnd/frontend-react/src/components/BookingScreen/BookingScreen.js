import React, { Component } from 'react'
import BookingPane from './BookingPane'

import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'

class BookingScreen extends Component {
    render() {
        return (
            <div className="container" id="booking_screen_container">
                <h1>Make a booking</h1>
                <div className="row">
                    <div className="col-sm-3">
                        <NavPane/>
                    </div>
                    <div className="col-sm-9">
                        <BookingPane/>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookingScreen;
