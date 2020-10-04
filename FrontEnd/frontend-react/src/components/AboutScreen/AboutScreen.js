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
                        <p>Enquiries inbox - hello@agme.com</p>    
                        <p>123 High St, Fort Lauderdale</p>
                        <p>33301 FL, United States</p>
                        <br/>
                        <p>Thank you for choosing AGME booking software : )</p>
                        
                        

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
