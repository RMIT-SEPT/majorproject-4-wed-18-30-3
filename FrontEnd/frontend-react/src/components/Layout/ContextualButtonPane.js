import React, { Component } from 'react'
import {Link} from "react-router-dom";

class ContextualButtonPane extends Component {
    
    render() {
        
        // Customer view
        if (this.props.userType === "CUSTOMER") {
            return (
                <React.Fragment>              

                <Link to="/dashboard" className="btn btn-outline-dark" id="navButton">Home</Link>
                <br/><br/>

                <Link to="/bookings" className="btn btn-outline-dark" id="navButton">Make booking by company</Link>
                <br/><br/>

                <Link to="/availabilites" className="btn btn-outline-dark" id="navButton">Make booking by availability</Link>
                <br/><br/>

                <Link to="/cancel" className="btn btn-outline-dark" id="navButton">Cancel existing booking</Link>
                <br/><br/>
                
                <Link to="/my_bookings" className="btn btn-outline-dark" id="navButton">View my current bookings</Link>
                <br/><br/>

                <Link to="/history" className="btn btn-outline-dark" id="navButton">View my booking history</Link>
                <br/><br/>

                <Link to="/profile" className="btn btn-outline-dark" id="navButton">Edit my profile</Link>
                <br/><br/>

                <Link to="/about" className="btn btn-outline-dark" id="navButton">About/Contact us</Link>
                <br/><br/>

                <Link to="/logout" className="btn btn-outline-dark" id="navButton">Log out</Link>
                <br/><br/>

                </React.Fragment>
            )

        // Admin nav view
        } else if (this.props.userType === "ADMIN") {
            return (
                <React.Fragment>              
                
                <Link to="/dashboard" className="btn btn-outline-dark" id="navButton">Home</Link>
                <br/><br/>

                <Link to="/admin_booking_summary" className="btn btn-outline-dark" id="navButton">7-day summary</Link>
                <br/><br/>
                
                <Link to="/admin_set_availabilities" className="btn btn-outline-dark" id="navButton">Set worker availability</Link>
                <br/><br/>

                <Link to="/admin_view_user" className="btn btn-outline-dark" id="navButton">View customer bookings</Link>
                <br/><br/>

                <Link to="/admin_add_worker" className="btn btn-outline-dark" id="navButton">Add new worker</Link>
                <br/><br/>

                <Link to="/admin_edit_user" className="btn btn-outline-dark" id="navButton">Edit worker details</Link>
                <br/><br/>

                <Link to="/profile" className="btn btn-outline-dark" id="navButton">Edit my profile</Link>
                <br/><br/>

                <Link to="/about" className="btn btn-outline-dark" id="navButton">About/Contact us</Link>
                <br/><br/>

                <Link to="/logout" className="btn btn-outline-dark" id="navButton">Log out</Link>
                <br/><br/>

                </React.Fragment>
            )
        
        // Worker nav view
        } else if (this.props.userType === "WORKER") {
            return (
                <React.Fragment>              
                
                <Link to="/dashboard" className="btn btn-outline-dark" id="navButton">Home</Link>
                <br/><br/>

                <Link to="/set_availabilites" className="btn btn-outline-dark" id="navButton">Set my availabilites</Link>
                <br/><br/>

                <Link to="/profile" className="btn btn-outline-dark" id="navButton">Edit my profile</Link>
                <br/><br/>

                <Link to="/about" className="btn btn-outline-dark" id="navButton">About/Contact us</Link>
                <br/><br/>

                <Link to="/logout" className="btn btn-outline-dark" id="navButton">Log out</Link>
                <br/><br/>

                </React.Fragment>
            )
        
        // No logged in user view
        } else {
            return (
                <React.Fragment>              
                <Link to="/login" className="btn btn-outline-dark" id="navButton">Log in</Link>
                <br/><br/>
                </React.Fragment>
            )
        }
    }
}

export default ContextualButtonPane;
