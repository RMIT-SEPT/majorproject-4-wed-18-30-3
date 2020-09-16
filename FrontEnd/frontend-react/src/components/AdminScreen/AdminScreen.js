import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'

class AdminScreen extends Component {
    render() {
        return (
            <div className="container" id="admin_screen_container">
            <h1>Todo: Admin portal</h1>
            <div className="row">
                    <div className="col-sm-3">
                        <NavPane/>
                    </div>
                    <div className="col-sm-9">
                    <br/><br/>
                        Todo: admin task pane component
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminScreen;
