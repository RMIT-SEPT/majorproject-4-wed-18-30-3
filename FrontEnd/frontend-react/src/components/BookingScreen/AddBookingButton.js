import React, { Component } from 'react'
import {link, Link} from "react-router-dom";


function validate() {

}

function createBooking() {
    var timeslot
    var service
    var worker   
    var customer
    var group 
}

class AddBookingButton extends Component {
    
    render() {
        return (
            <React.Fragment>
            <p className="btn btn-sm btn-dark" id="navButton" onclick={validate}>
            Create new booking
            </p>
            </React.Fragment>
        )
    }
}

export default AddBookingButton;
