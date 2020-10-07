import React, { Component } from 'react'
import BookingPane from './BookingPane'

import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'

class BookingScreen extends Component {
    render() {

        // Check user is logged in
        if (this.props.userName === undefined && this.props.userType === undefined) {
            return (
                <div className="profile_screen_editprofile" id="profile_screen_editprofile">
                <Header/>
                    <br/><br/><br/><br/>
                <b>Please <a href="/login">log in </a> to use the app.</b>
                <br/><br/>
                <Footer/>
                </div>
            )
        }

        return (
            <div className="container" id="booking_screen_container">
                <Header/>
                <br/><br/><br/>
                
                <h2>Make booking by company</h2>

                <div className="row">
                    <div className="col-sm-3">
                        <NavPane
                            userName={this.props.userName}
                            userType={this.props.userType}
                            token={this.props.token}/>
                    </div>
                    <div className="col-sm-9">
                        <BookingPane
                            userName={this.props.userName}
                            userType={this.props.userType}
                            token={this.props.token}/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default BookingScreen;
