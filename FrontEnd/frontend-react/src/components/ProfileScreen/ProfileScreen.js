import React, { Component } from 'react'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header';
//import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'
import EditProfile from './EditProfile'

class ProfileScreen extends Component {
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
            <div className="container" id="profile_container">
                <Header
                    id={this.props.id}
                    userName={this.props.userName}
                    address={this.props.address}
                    phone={this.props.phone}
                    userType={this.props.userType}
                    token={this.props.token}/>
                <br/><br/><br/>
                <h2>View/edit profile</h2>
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
                        <br/><br/>
        
                        <EditProfile
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

export default ProfileScreen;
