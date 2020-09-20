import React, { Component } from 'react'
import {Link} from "react-router-dom";

class ProfileButton extends Component {
    
    render() {
        return (
            <React.Fragment>
            <Link to="/profile/:i11d" className="btn btn-sm btn-dark" id="navButton">
            View/edit profile
            </Link>
            </React.Fragment>
        )
    }
}

export default ProfileButton;
