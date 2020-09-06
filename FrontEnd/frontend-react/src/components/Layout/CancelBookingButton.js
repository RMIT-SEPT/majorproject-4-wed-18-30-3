import React, { Component } from 'react'
import {Link} from "react-router-dom";

class CancelBookingButton extends Component {
    
    render() {
        return (
            <React.Fragment>
            <Link to="/cancel_booking" className="btn btn-sm btn-dark" id="navButton">
            CancelBooking
            </Link>
            </React.Fragment>
        )
    }
}

export default CancelBookingButton;
