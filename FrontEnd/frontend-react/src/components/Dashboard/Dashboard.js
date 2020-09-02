import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'

class Dashboard extends Component {
    render() {
        return (
            <div className="container" id="dashboard_container">
                <h1>Job Booking App Homescreen - Group 4-wed-18-30-3</h1>
                <div className="row">
                    <div className="col-sm-3">
                        <NavPane/>
                    </div>
                    <div className="col-sm-9">
                        <br/><br/>
                        Todo: dashboard content
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;
