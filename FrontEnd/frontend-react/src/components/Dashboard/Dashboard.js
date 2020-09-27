import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'
import { connect } from 'react-redux'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'


class Dashboard extends Component {

    constructor(props) {
        super(props)
        
        this.state = {}

        this.storeLoginToken = this.storeLoginToken.bind(this)
        this.storeLoginToken()
    }

    // Store session token and login details in Redux state
    storeLoginToken() {
        this.props.dispatch({
            type: "LOGIN",
            payload: {
                'id': this.props.id,
                'userName': this.props.userName,
                'address': this.props.address, 
                'phone': this.props.phone,
                'userType': this.props.userType,
                'token': this.props.token
            }
        })

        // TODO: persist state between refreshes/redirects
    }

    render() {
        
        // Use the most recent element in state history
        const index = this.props.user.length - 1
        return (
            <div className="container" id="dashboard_container">
                <Header
                    id={this.props.user[index]["id"]}
                    userName={this.props.user[index]["userName"]}
                    address={this.props.user[index]["address"]}
                    phone={this.props.user[index]["phone"]}
                    userType={this.props.user[index]["userType"]}
                    token={this.props.user[index]["token"]}/>
                <br/><br/><br/>
                <h1>AGME Job Booking App</h1>
                <div className="row">
                    <div className="col-sm-3">
                        <NavPane
                            id={this.props.user[index]["id"]}
                            userName={this.props.user[index]["userName"]}
                            address={this.props.user[index]["address"]}
                            phone={this.props.user[index]["phone"]}
                            userType={this.props.user[index]["userType"]}
                            token={this.props.user[index]["token"]}/>
                    </div>
                    <div className="col-sm-9">
                        <br/>
                        <b>Welcome, {this.props.user[index]["userName"]}!</b>
                        <br/>
                        
                    </div>
                </div>
                <Footer/>
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
