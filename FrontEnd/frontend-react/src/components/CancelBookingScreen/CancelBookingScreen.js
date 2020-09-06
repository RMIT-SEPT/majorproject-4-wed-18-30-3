import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'

class CancelBookingScreen extends Component {
    render() {
        return (
            <div className="container" id="CancelBookingScreen_container">
            <h1>Todo: CancelBooking</h1>
            <div className="row">
                    <div className="col-sm-3">
                        <NavPane/>
                    </div>
                    <div className="col-sm-9">
                    <br/><br/>
                        Todo: CancelBooking here
                    </div>
                </div>
            </div>
        )
    }
}

export default CancelBookingScreen;
