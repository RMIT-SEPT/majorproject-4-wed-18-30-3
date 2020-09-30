import React, { Component } from 'react'
import BookingPane from './BookingPane'

import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'

class BookingScreen extends Component {
    render() {
        return (
            <div className="container" id="booking_screen_container">
                <Header id={this.props.id}
                    userName={this.props.userName}
                    address={this.props.address}
                    phone={this.props.phone}
                    userType={this.props.userType}
                    token={this.props.token}/>
                <br/><br/><br/>
                
                <h1>Make booking by company</h1>

                <div className="row">
                    <div className="col-sm-3">
                        <NavPane
                            id={this.props.id}
                            userName={this.props.userName}
                            address={this.props.address}
                            phone={this.props.phone}
                            userType={this.props.userType}
                            token={this.props.token}/>
                    </div>
                    <div className="col-sm-9">
                        <BookingPane
                            id={this.props.id}
                            userName={this.props.userName}
                            address={this.props.address}
                            phone={this.props.phone}
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
