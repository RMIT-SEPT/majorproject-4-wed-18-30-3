import React, { Component } from 'react'
import {Link} from "react-router-dom";

class ContextualButtonPane extends Component {
    
    render() {
        
        // Customer view
        if (this.props.userType === "CUSTOMER") {
            return (
                <React.Fragment>              
                                
                <Link to="/bookings" className="btn btn-sm btn-dark" id="navButton">Make booking by company</Link>
                <br/><br/>

                <Link to="/availabilites" className="btn btn-sm btn-dark" id="navButton">Make booking by availability</Link>
                <br/><br/>

                <Link to="/cancel" className="btn btn-sm btn-dark" id="navButton">Cancel existing booking</Link>
                <br/><br/>
                
                <Link to="/my_bookings" className="btn btn-sm btn-dark" id="navButton">View my current bookings</Link>
                <br/><br/>

                <Link to="/history" className="btn btn-sm btn-dark" id="navButton">View my booking history</Link>
                <br/><br/>

                <Link to="/profile" className="btn btn-sm btn-dark" id="navButton">Edit my profile</Link>
                <br/><br/>

                </React.Fragment>
            )

        // Admin nav view
        } else if (this.props.userType === "ADMIN") {
            return (
                <React.Fragment>              
                <Link to="/admin_portal" className="btn btn-sm btn-dark" id="navButton">View customer bookings</Link>
                <br/><br/>

                <Link to="/admin_portal" className="btn btn-sm btn-dark" id="navButton">Manage company groups</Link>
                <br/><br/>

                <Link to="/admin_portal" className="btn btn-sm btn-dark" id="navButton">Appointment settings</Link>
                <br/><br/>

                <Link to="/profile" className="btn btn-sm btn-dark" id="navButton">Edit my profile</Link>
                <br/><br/>
                </React.Fragment>
            )
        
        // Worker nav view
        } else if (this.props.userType === "WORKER") {
            return (
                <React.Fragment>              
                
                <Link to="/set_availabilites" className="btn btn-sm btn-dark" id="navButton">Set my availabilites</Link>
                <br/><br/>

                <Link to="/profile" className="btn btn-sm btn-dark" id="navButton">Edit my profile</Link>
                <br/><br/>
                </React.Fragment>
            )
        
        // No logged in user view
        } else {
            return (
                <React.Fragment>              
                <Link to="/login" className="btn btn-sm btn-dark" id="navButton">Log in</Link>
                <br/><br/>
                </React.Fragment>
            )
        }
    }
}

export default ContextualButtonPane;
