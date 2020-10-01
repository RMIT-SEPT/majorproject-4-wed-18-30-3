import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Header extends Component {

    constructor(props){
        super(props)
        this.state = {
            
        }
    }

    render() {
        
        // User logged in, show contextual links.
        if (this.props.userName != null) {
            return (
            <nav className="bg-dark text-center" id="header">
                <div className="container">
                    <h4>AGME Online Appointment Booking App</h4>
                </div>
            </nav>
            )
        
        // No login session, show contextual links.
        } else {
            return (
                <nav className="bg-dark text-center" id="header">
                <div className="container">
                    <h4 className="text-center">AGME Online Appointment Booking App</h4>
                </div>
            </nav>
            )
        }
    }
}

export default Header;
