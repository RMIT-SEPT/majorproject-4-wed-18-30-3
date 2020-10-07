import React, { Component } from 'react'
import {Link} from "react-router-dom";

class CancelButton extends Component {
    
    render() {
        return (
            <React.Fragment>
            <Link to="/dashboard" className="btn btn-outline-dark" id="navButton">
            Cancel
            </Link>
            </React.Fragment>
        )
    }
}

export default CancelButton;
