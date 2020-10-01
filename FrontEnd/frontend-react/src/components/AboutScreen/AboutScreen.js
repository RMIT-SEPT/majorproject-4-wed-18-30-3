import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import logo from './agme.png'
import { Link } from 'react-router-dom';

class AboutScreen extends Component {
    render() {
        return (
            <div>
                <Header
                    id={this.props.id}
                    userName={this.props.userName}
                    address={this.props.address}
                    phone={this.props.phone}
                    userType={this.props.userType}
                    token={this.props.token}/>
                    <br/><br/><br/><br/>

                <h1>AGME | Excellence in task scheduling</h1>

                <div>
                    <img src={logo} alt="AGME"/>
                </div>

                <br/>
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                    </div>
                    <div className="col-sm"></div>
                </div>

                <br/>
                <div className="row">
                    <div className="col-sm"></div>
                    <div className="col-sm">
                        <Link to="/dashboard" className="btn btn-outline-dark" id="navButton">Return</Link>
                        <br/><br/>
                    </div>
                    <div className="col-sm"></div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default AboutScreen;
