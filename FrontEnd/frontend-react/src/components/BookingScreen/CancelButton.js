import React, { Component } from 'react'
import {link, Link} from "react-router-dom";

class CancelButton extends Component {
    
    render() {
        return (
            <React.Fragment>
            <Link to="/dashboard" className="btn btn-sm btn-dark" id="navButton">
            Cancel
            </Link>
            </React.Fragment>
        )
    }
}

export default CancelButton;
