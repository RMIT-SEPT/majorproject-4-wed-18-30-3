import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import LoginScreen from '../LoginScreen/LoginScreen'
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import axios from "axios";

const DNS_URI = "http://localhost:8080"
const axiosConfig = {headers: {'Content-Type': 'application/json'}}

async function createUser(userName, password, phone, address, userType) {

    // Set the endpoint according to userType
    var endpoint = null
    let newUser
    if (userType === "CUSTOMER") {
        endpoint = "customer"
        newUser = { 
            user: {
                userName: userName, 
                password: password, 
                address: address,
                phone: phone,
                userType: userType}}
    
    } else if (userType === "ADMIN") {
    endpoint = "admin"
    newUser = { 
        user: {
            userName: userName, 
            password: password, 
            address: address,
            phone: phone,
            userType: userType}}
    
    } else if (userType === "WORKER") {
        endpoint = "worker"
        newUser = { 
            user: {
                userName: userName, 
                password: password, 
                address: address,
                phone: phone,
                userType: userType},
            services: {},
            companyName: ""}
    } else {
        console.log("User type error.")
    }

    if (endpoint != null) {
        
        console.log(newUser)
        // console.log(DNS_URI + '/api/' + endpoint)

        return await axios.post(DNS_URI + '/api/' + endpoint, {
            newUser
        }, axiosConfig)
            .then(res => {
                return [true, res]
            })
            .catch(error => {
                return [false, error]
            })
    }
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
            userTypes: [
                { value: 'CUSTOMER', label: 'Customer' },
                { value: 'ADMIN', label: 'Admin' },
                { value: 'WORKER', label: 'Worker' },]
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

        const success = await createUser(this.state.userName, this.state.password, 
            this.state.phone, this.state.address, this.state.userType["value"]).then()

        console.log(success[0], success[1])

        // if (success[0]) {
        //     this.setState({hasSuccess: true})
        //     this.setState({hasFail: false})
        // } else {
        //     this.setState({hasSuccess: false})
        //     this.setState({hasFail: true})
        // }

    }

    render(){
        const animatedComponents = makeAnimated();
        if (!this.state.hasSuccess && !this.state.hasFail) {
            return(
                <div className = "Register_Ui">
                    <div className = "Heading">
                        <h1>Sign up</h1>
                        <br></br><br></br><br></br>
                    </div>
                    <form onSubmit={this.onSubmit}>

                        <div className="row">
                            <div className="col-sm"></div>    
                            <div className="col-sm">
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
                            <div className="col-sm"></div>
                        </div>
                        
                        <div className="row">
                            <div className="col-sm"></div>    
                            <div className="col-sm">
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
                            <div className="col-sm"></div>
                        </div>  
                        
                        <div className="row">
                            <div className="col-sm"></div>    
                            <div className="col-sm">
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
                            <div className="col-sm"></div>
                        </div>
                        
                                
                        <div className="row">
                            <div className="col-sm"></div>    
                            <div className="col-sm">
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
                            <div className="col-sm"></div>
                        </div>

                        <div className="row">
                            <div className="col-sm"></div>    
                            <div className="col-sm">
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
                            <div className="col-sm"></div>
                        </div>


                        <div className="row">
                            <div className="col-sm"></div>    
                            <div className="col-sm">
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
                            <div className="col-sm"></div>
                        </div>


                        <div className="form-user">
                        <label htmlFor={"user"}>Select Type of user:</label>
                        <div className="row">
                        
                            <div className="col-sm"></div>
                            <div className="col-sm">
                                <Select name="user" id="user" value={this.state.userType} options={this.state.userTypes}
                                        onChange={this.onTypeChange} components={animatedComponents} required/>
                            </div>
                            <div className="col-sm"></div>
                        </div>
                        </div><br/>
                        <div className="row">
                            <div className="col-sm"></div>
                            <div className="col-sm">
                                <input type="submit" className="btn btn-sm btn-dark" id="navButton"/>
                            </div>
                            <div className="col-sm"></div>
                        </div>
                        </form>
                </div>
            )
        }
        if(this.state.hasSuccess) {
            return(
                <Router>
                    <div className = "Register_Ui">
                        <Redirect to= "/login" component={LoginScreen}/>
                        <Route path="/login" component={LoginScreen}/>
                    </div>
                </Router>
            )
        }
        else if(this.state.hasFail){
            alert("username is taken, please try again!")
            return(
                <Router>
                    <div className = "Register_Ui">
                        <Redirect to= "/register" component={RegisterScreen}/>
                        <Route path="/register" component={RegisterScreen}/>
                    </div>
                </Router>
            )
        }
    }
}

export default RegisterScreen;