import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'
import { connect } from 'react-redux'
import store from '../../store'


class Dashboard extends Component {

    constructor(props) {
        super(props)
        
        this.state = {}

        this.storeLoginToken = this.storeLoginToken.bind(this)
        this.storeLoginToken()
    }

    // Store user login details in Redux state, as passed in from the login component
    storeLoginToken() {
        this.props.dispatch({
            type: "LOGIN",
            payload: {
                'id': this.props.id,
                'userName': this.props.userName,
                'password': this.props.password,
                'address': this.props.address, 
                'phone': this.props.phone,
                'userType': this.props.userType,
                'token': this.props.token
            }
        })

        // TODO: persist state between refreshes/redirects

    }

    render() {
        
        // Ue the most recent element state history
        const index = this.props.user.length - 1

        return (
            <div className="container" id="dashboard_container">
                <h1>AGME Job Booking App</h1>
                <div className="row">
                    <div className="col-sm-3">
                        <NavPane/>
                    </div>
                    <div className="col-sm-9">
                        <br/>
                        <b>Welcome, {this.props.user[index]["userName"]}!</b>
                        <br/>
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = dispatch => {
    return { dispatch }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard)
