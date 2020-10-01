import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import axios from "axios";
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const DNS_URI = "http://localhost:8080"
// const DNS_URI = "http://ec2-34-204-47-86.compute-1.amazonaws.com:8080"
const axiosConfig = {headers: {'Content-Type': 'application/json'}}

async function createWorker(userName, password, phone, address, userType) {
    return await axios.post(DNS_URI + '/api/worker', {
        "user": {
            "userName": userName, 
            "password": password, 
            "address": address,
            "phone": phone,
            "userType": userType},
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

async function createAdmin(userName, password, phone, address, userType) {
    return await axios.post(DNS_URI + '/api/admin', {
        "user": {
            "userName": userName, 
            "password": password, 
            "address": address,
            "phone": phone,
            "userType": userType}
    }, axiosConfig)
        .then(res => {
            return [true, res.status]
        })
        .catch(error => {
            return [false, error.response.status]
        })
}

async function createCustomer(userName, password, phone, address, userType) {
    return await axios.post(DNS_URI + '/api/customer', {
        "user": {
            "userName": userName, 
            "password": password, 
            "address": address,
            "phone": phone,
            "userType": userType}
    }, axiosConfig)
        .then(res => {
            return [true, res.status]
        })
        .catch(error => {
            return [false, error.response.status]
        })
}

class RegisterScreen extends Component {
   
    constructor() {
        super();
        this.state = {
            userName: null,
            password: null,
            phone: null,
            address: null,
            firstName: null,
            lastName: null,
            userType: null,
            hasSuccess: false,
            hasFail: false,
            response: null,
            errorMessage: "",
            successMessage: "",
            userTypes: [
                {value: 'CUSTOMER', label: 'Customer'},
                {value: 'ADMIN', label: 'Admin'},
                {value: 'WORKER', label: 'Worker'},]
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onTypeChange = this.onTypeChange.bind(this);
    }
    
    onChange(e){this.setState({[e.target.name]: e.target.value})}
    onTypeChange(Type) {this.setState({ userType: Type})}

    async onSubmit(e) {
        e.preventDefault();

        if(this.state.userName == null){
            alert("Please enter a username!")
            return
        }
        if(this.state.password == null){
            alert("Please enter a password!")
            return
        }
        if(this.state.phone == null){
            alert("Please enter a valid phone number!")
            return
        }
        let phoneNumberLength = this.state.phone.length
        if(phoneNumberLength >10){
            alert("invalid phone number!")
            return
        }
        if(phoneNumberLength <10){
            alert("invalid phone number!")
            return
        }
        if(this.state.address == null){
            alert("Please enter your address!")
            return
        }
        if(this.state.firstName == null){
            alert("Please enter a first name!")
            return
        }
        if(this.state.lastName == null) {
            alert("Please enter a last name!")
            return
        }
        if(this.state.userType == null){
            alert("Please select what type of user you are!")
            return
        }

        if (this.state.userType['value'] === "CUSTOMER") {
            const success = await createCustomer(this.state.userName, this.state.password, 
                this.state.phone, this.state.address, this.state.userType["value"]).then()            
            this.setState({response: success[1]})
            console.log(this.state.response)

        } else if (this.state.userType['value'] === "ADMIN") {
            const success = await createAdmin(this.state.userName, this.state.password, 
                this.state.phone, this.state.address, this.state.userType["value"]).then()
            this.setState({response: success[1]})
            console.log(this.state.response)

        } else if (this.state.userType['value'] === "WORKER") {
            const success = await createWorker(this.state.userName, this.state.password, 
                this.state.phone, this.state.address, this.state.userType["value"]).then()
            this.setState({response: success[1]})
            console.log(this.state.response)

        }

        if (this.state.response >= 200 && this.state.response <= 302) {
            this.setState({successMessage: "User successfully created. Log in to get started."})
            this.setState({errorMessage: ""})
        } else {
            this.setState({errorMessage: "Account creation failed, please check your details and try again."})
            this.setState({successMessage: ""})
        }
        
    }

    render(){
        const animatedComponents = makeAnimated();
        if (!this.state.hasSuccess && !this.state.hasFail) {
            return(
                <div className = "Register_Ui">
                <Header/>
                <br/><br/>
                <br/><br/><br/>
                <div className="row">
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


                                <div className="form-user">
                                <div className="row">
                            
                                    <div className="col-2"></div>
                                    <div className="col-8">
                                        <Select name="user" id="user" placeholder="User type" value={this.state.userType} options={this.state.userTypes}
                                                onChange={this.onTypeChange} components={animatedComponents} required/>
                                    </div>
                                    <div className="col-2"></div>
                                </div>
                                </div><br/>
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
                                        <a href="/login" className="btn btn-outline-dark" id="navButton">Cancel</a>
                                    </div>
                                    <div className="col-2"></div>    
                                </div>                            
                            </form>
                            <br/><br/><br/><br/>
                            </div>

                        </div>
                        <div className="col-sm"></div>
                        
                    <Footer/>
            
                </div>

            </div>

            )
        }
    }
}

export default RegisterScreen;