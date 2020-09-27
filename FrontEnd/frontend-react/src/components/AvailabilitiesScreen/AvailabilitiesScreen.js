import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

class AvailabilitiesScreen extends Component {
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

                <h1>View Availabilities</h1>

                <Footer/>
            </div>
        )
    }
}

export default AvailabilitiesScreen;
