import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'

class ProfileScreen extends Component {
    render() {
        return (
            <div className="container" id="profile_container">
                <h1>Todo: View/edit profile screen</h1>
                <div className="row">
                    <div className="col-sm-3">
                        <NavPane/>
                    </div>
                    <div className="col-sm-9">
                        <br/><br/>
                        Todo: profile
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileScreen;
