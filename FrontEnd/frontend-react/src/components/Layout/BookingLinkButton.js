import React, { Component } from 'react'
import {link, Link} from "react-router-dom";

class BookingLinkButton extends Component {
    
    render() {
        return (
            <React.Fragment>
            <Link to="/bookings" className="btn btn-sm btn-dark" id="navButton">
            Make a booking
            </Link>
            </React.Fragment>
        )
    }
}

export default BookingLinkButton;
