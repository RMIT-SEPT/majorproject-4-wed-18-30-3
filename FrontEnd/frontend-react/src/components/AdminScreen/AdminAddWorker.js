import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import NavPane from '../Layout/NavPane'
import Header from '../Layout/Header'
import Footer from '../Layout/Footer'
import axios from "axios";
const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"
const axiosConfig = {headers: {'Content-Type': 'application/json'}}

async function createWorker(userName, password, phone, address, service, company) {
    console.log(service)

    // TODO check if service exists, if not, create it.
    // For now, assign all new workers the company "Sunset Services"

    return await axios.post(DNS_URI + '/api/worker/register', {
        "user": {
            "userName": userName,
            "password": password,
            "address": address,
            "phone": phone,
            "userType": "WORKER"},
        "services": [{name: "Pool Cleaning"}],
        "companyName": company

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
            company: null,
            service: null,
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
            this.state.phone, this.state.address, this.state.service, this.state.company).then()
        this.setState({response: success[1]})
        console.log(this.state.response)
        if (this.state.response >= 200 && this.state.response <= 302) {
            this.setState({successMessage: "Worker successfully created."})
            this.setState({errorMessage: ""})
            this.setState({cancelTxt: "Log in"})
        } else {
            this.setState({errorMessage: "Worker creation failed, please check your details and try again."})
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
                        <div className="col-sm">
                            <div>
                                <br/>
                                <p>Phone no. must be 10 digits and start with 0</p>

                                <b><font color="red">{this.state.errorMessage}</font></b>
                                <b><font color="green">{this.state.successMessage}</font></b>
                                <br/><br/>
                                <form onSubmit={this.onSubmit}>

                                    <div className="row">
                                        <div className="col-2"/>
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
                                        <div className="col-2"/>
                                    </div>

                                    <div className="row">
                                        <div className="col-2"/>
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
                                        <div className="col-2"/>
                                    </div>

                                    <div className="row">
                                        <div className="col-2"/>
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
                                        <div className="col-2"/>
                                    </div>


                                    <div className="row">
                                        <div className="col-2"/>
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
                                        <div className="col-2"/>
                                    </div>

                                    <div className="row">
                                        <div className="col-2"/>
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
                                        <div className="col-2"/>
                                    </div>


                                    <div className="row">
                                        <div className="col-2"/>
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
                                        <div className="col-2"/>
                                    </div>


                                    <div className="row">
                                    <div className="col-2"/>
                                    <div className="col-8">
                                        <div className = "form-group">
                                            <input type="company" className="form-control"
                                                placeholder="Company name"
                                                id="company"
                                                name="company"
                                                value={this.state.value}
                                                onChange={this.onChange}>
                                            </input>
                                            </div>
                                        </div>    
                                    <div className="col-2"/>
                                </div>

                                    <div className="row">
                                    <div className="col-2"/>
                                    <div className="col-8">
                                        <div className = "form-group">
                                            <input type="service" className="form-control"
                                                placeholder="Service offered"
                                                id="service"
                                                name="service"
                                                value={this.state.value}
                                                onChange={this.onChange}>
                                            </input>
                                            </div>
                                        </div>    
                                    <div className="col-2"/>
                                </div>

                                    <div className="row">
                                        <div className="col-2"/>
                                        <div className="col-8">
                                            <input type="submit" className="btn btn-outline-dark" id="navButton"/>
                                        </div>
                                        <div className="col-2"/>
                                    </div>
                                    <br/>
                                    <div className="row">
                                        <div className="col-2"/>
                                        <div className="col-8">
                                            
                                        </div>
                                        <div className="col-2"/>
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
