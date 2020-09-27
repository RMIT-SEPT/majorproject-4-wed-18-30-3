import React, { Component } from 'react'
import { Link, Router } from 'react-router-dom'


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
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark" id="header">
                <div className="container">
                    <div className="collapse navbar-collapse" id="mobile-nav">    
                        
                        <Link to="/dashboard">
                        <ul className="navbar-nav ml-auto">
                            <div className="navbar-brand">Home</div>
                        </ul>
                        </Link>

                        <Link to="/about">
                            <ul className="navbar-nav ml-auto">
                                <div className="navbar-brand">About</div>
                            </ul>
                        </Link>
                    
                    </div>        
                </div>
            </nav>
            )
        
        // No login session, show contextual links.
        } else {
            return (
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark" id="header">
                <div className="container">
                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav ml-auto">
                            <a className="navbar-brand" href="/register">
                                Register
                            </a>                           
                            <a className="navbar-brand" href="/login">
                                Sign in
                            </a>
                            <a className="navbar-brand" href="/about">
                                About
                            </a>
                        </ul>
                    </div>        
                </div>
            </nav>
            )
        }
    }
}

export default Header;
