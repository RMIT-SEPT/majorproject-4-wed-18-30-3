import React, { Component } from 'react'
import {Link} from "react-router-dom";

class DashboardLinkButton extends Component {
    
    render() {
        return (
            <React.Fragment>
            <Link to="/dashboard" className="btn btn-sm btn-dark" id="navButton">
            Return to Dashboard
            </Link>
            </React.Fragment>
        )
    }
}

export default DashboardLinkButton;
