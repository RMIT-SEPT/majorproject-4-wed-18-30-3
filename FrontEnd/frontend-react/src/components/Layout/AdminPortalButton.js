import React, { Component } from 'react'
import {Link} from "react-router-dom";

class AdminPortalButton extends Component {
    
    render() {
        return (
            <React.Fragment>
            <Link to="/admin_portal" className="btn btn-sm btn-dark" id="navButton">
            Admin Portal
            </Link>
            </React.Fragment>
        )
    }
}

export default AdminPortalButton;
