import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import axios from "axios";
import {Link} from "react-router-dom";
const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"
const axiosConfig = {headers: {'Content-Type': 'application/json'}}
async function createWorker(userName, password, phone, address) {
    return await axios.post(DNS_URI + '/api/worker/register', {
        "user": {
            "userName": userName,
            "password": password,
            "address": address,
            "phone": phone,
            "userType": "WORKER"},
        "services": [{}],
        "companyName": " "

    }, axiosConfig)
        .then(res => {
            return [true, res.status]
        })
        .catch(error => {
            return [false, error.response.status]
        })
}
class AdminAddWorker extends Component {
    constructor() {
        super();
        this.state={
            userName: null,
            password: null,
            phone: null,
            address: null,
            firstName: null,
            lastName: null,
            response: null,
            errorMessage: "",
            successMessage: "",
            cancelTxt: "Cancel",
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange(e){this.setState({[e.target.name]: e.target.value})}
    async onSubmit(e) {
        e.preventDefault();

        if (this.state.userName == null) {
            alert("Please enter a username!")
            return
        }
        if (this.state.password == null) {
            alert("Please enter a password!")
            return
        }
        if (this.state.phone == null) {
            alert("Please enter a valid phone number!")
            return
        }
        let phoneNumberLength = this.state.phone.length
        if (phoneNumberLength > 10) {
            alert("invalid phone number!")
            return
        }
        if (phoneNumberLength < 10) {
            alert("invalid phone number!")
            return
        }
        if (this.state.address == null) {
            alert("Please enter your address!")
            return
        }
        if (this.state.firstName == null) {
            alert("Please enter a first name!")
            return
        }
        if (this.state.lastName == null) {
            alert("Please enter a last name!")
            return
        }
        const success = await createWorker(this.state.userName, this.state.password,
            this.state.phone, this.state.address).then()
        this.setState({response: success[1]})
        console.log(this.state.response)
        if (this.state.response >= 200 && this.state.response <= 302) {
            this.setState({successMessage: "User successfully created. Log in to get started."})
            this.setState({errorMessage: ""})
            this.setState({cancelTxt: "Log in"})
        } else {
            this.setState({errorMessage: "Account creation failed, please check your details and try again."})
            this.setState({successMessage: ""})
        }
    }
    render() {
        return (
            <div className="container">
                <Header id={this.props.id}
                    userName={this.props.userName}
                    address={this.props.address}
                    phone={this.props.phone}
                    userType={this.props.userType}
                    token={this.props.token}/>
                <br/><br/><br/>

                
                <h2>Create a new worker</h2>
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
                <div className = "Register_worker">
                        <div className="col-sm"></div>
                        <div className="col-sm">
                            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
                                <br/><br/><br/>
                                <h1>Register</h1>
                                <p>Phone no. must be 10 digits and start with 0</p>

                                <b><font color="red">{this.state.errorMessage}</font></b>
                                <b><font color="green">{this.state.successMessage}</font></b>
                                <br></br><br></br>
                                <form onSubmit={this.onSubmit}>

                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col-8">
                                            <div className = "form-group">
                                                <input type="text" className="form-control"
                                                       placeholder="Username"
                                                       id="userName"
                                                       name="userName"
                                                       value={this.state.value}
                                                       onChange={this.onChange}>
                                                </input>
                                            </div>
                                        </div>
                                        <div className="col-2"></div>
                                    </div>

                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col-8">
                                            <div className = "form-group">
                                                <input type="password" className="form-control"
                                                       placeholder="Password"
                                                       id="password"
                                                       name="password"
                                                       value={this.state.value}
                                                       onChange={this.onChange}>
                                                </input>
                                            </div>
                                        </div>
                                        <div className="col-2"></div>
                                    </div>

                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col-8">
                                            <div className = "form-group">
                                                <input type="text" className="form-control"
                                                       placeholder="Phone"
                                                       id="phone"
                                                       name="phone"
                                                       value={this.state.value}
                                                       onChange={this.onChange}>
                                                </input>
                                            </div>
                                        </div>
                                        <div className="col-2"></div>
                                    </div>


                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col-8">
                                            <div className = "form-group">
                                                <input type="text" className="form-control"
                                                       placeholder="Address"
                                                       id="address"
                                                       name="address"
                                                       value={this.state.value}
                                                       onChange={this.onChange}>
                                                </input>
                                            </div>
                                        </div>
                                        <div className="col-2"></div>
                                    </div>

                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col-8">
                                            <div className = "form-group">
                                                <input type="text" className="form-control"
                                                       placeholder="Firstname"
                                                       id="firstName"
                                                       name="firstName"
                                                       value={this.state.value}
                                                       onChange={this.onChange}>
                                                </input>
                                            </div>
                                        </div>
                                        <div className="col-2"></div>
                                    </div>


                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col-8">
                                            <div className = "form-group">
                                                <input type="text" className="form-control"
                                                       placeholder="Lastname"
                                                       id="lastName"
                                                       name="lastName"
                                                       value={this.state.value}
                                                       onChange={this.onChange}>
                                                </input>
                                            </div>
                                        </div>
                                        <div className="col-2"></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col-8">
                                            <input type="submit" className="btn btn-outline-dark" id="navButton"/>
                                        </div>
                                        <div className="col-2"></div>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col-8">
                                            <Link to="/dashboard" className="btn btn-outline-dark" id="navButton">Return</Link>
                                            <br/><br/>
                                        </div>
                                        <div className="col-2"></div>
                                    </div>

                                </form>
                            </div>
                        </div>
                </div>
                <Footer/>
                        </div>
                    </div>
            </div>
        )
    }
}

export default AdminAddWorker;
