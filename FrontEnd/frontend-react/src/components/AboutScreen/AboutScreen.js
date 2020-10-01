import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import logo from './agme.png'

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

                <Footer/>
            </div>
        )
    }
}

export default AboutScreen;
