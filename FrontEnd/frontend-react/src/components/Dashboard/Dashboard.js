import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'
import { connect } from 'react-redux'


class Dashboard extends Component {

    constructor(props) {
        super(props)
        
        this.state = {}

        this.storeLoginToken = this.storeLoginToken.bind(this)
        this.storeLoginToken()
    }

    storeLoginToken() {
        this.props.dispatch({
            type: "LOGIN",
            payload: {
                'id': this.props.id,
                'userName': this.props.userName,
                'password': this.props.password,
                'address': this.props.address, 
                'phone':this.props.phone,
                'userType': this.props.userType
            }
        })
    }

    render() {
        
        // Always use the final element in user state history
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
