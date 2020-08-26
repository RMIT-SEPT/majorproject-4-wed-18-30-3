import React, { Component } from 'react'


class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="container">
                
                <a className="navbar-brand" href="/dashboard">
                    Home
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"/>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">

                        </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/register">
                                Register
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">
                                Sign in
                            </a>
                        </li>   
                        <li className="nav-item">
                        <a className="nav-link" href="/About/">
                            About
                        </a>
                    </li>        
                    </ul>
                </div>        
            </div>
        </nav>
        )
    }
}

export default Header;
