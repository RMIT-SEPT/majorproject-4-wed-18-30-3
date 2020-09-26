import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Dashboard from '../Dashboard/Dashboard';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import axios from "axios";

const DNS_URI = "http://localhost:8080"
const axiosConfig = {headers: {'Content-Type': 'application/json'}}

async function getUserConfirm(userName, password) {
    return await axios.post(DNS_URI + '/api/user', {
        userName: userName,
        password: password
    }, axiosConfig)
        .then(res => {
            return [true, res]
        })
        .catch(error => {
            console.error(error)
            return [false, error]
        })
}

class LoginScreen extends Component {
  
    constructor() {
        super();
        this.state = {
            id: null,
            userName: "",
            password: "",
            address: null,
            phone: null,
            userType: null,
            token: null,
            hasSuccess: false,
            hasFail: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    
    async onSubmit(e) {
        e.preventDefault()
        
        if(document.getElementById("userName").value == null || document.getElementById("password").value == null){
            alert("Please enter a username and password.")
            return
        }
        
        // Set state accoring to the REST response
        const success = await getUserConfirm(this.state.userName, this.state.password).then()
        if (success[0]) {
            console.log(success[1].data["userType"])
            this.setState({id: success[1].data["id"]})
            this.setState({userName: success[1].data["userName"]})
            this.setState({password: success[1].data["password"]})
            this.setState({address: success[1].data["address"]})
            this.setState({phone: success[1].data["phone"]})
            this.setState({userType: success[1].data["userType"]})
            this.setState({token: success[1].data["token"]})
            this.setState({hasSuccess: true})
            this.setState({hasFail: false})
        } else {
            this.setState({hasSuccess: false})
            this.setState({hasFail: true})
        }
    }

    render() {
    if (!this.state.hasSuccess && !this.state.hasFail) {
        return(
            <div className = "Login_Ui">
                <div className = "Heading">
                    <h1>Log in</h1>
                    <br/><br/>
                </div>
                <form onSubmit={this.onSubmit}>
                    
                    <div className="row">
                        <div className="col-sm"></div>    
                        <div className="col-sm">
                            <div className = "form-group">
                                
                                <input type="text" className="form-control"
                                        placeholder="Username"
                                        id="userName" 
                                        name={"userName"} 
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
                                        name={"password"}
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
            <div className = "Login_Ui">
                <Redirect to= "/dashboard" render={(props) => (
                    <Dashboard {...props} 
                        id={this.state.id}
                        userName={this.state.userName}
                        password={this.state.password}
                        address={this.state.address}
                        phone={this.state.phone}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
                <Route path="/dashboard" render={(props) => (
                    <Dashboard {...props}
                        id={this.state.id}
                        userName={this.state.userName}
                        password={this.state.password}
                        address={this.state.address}
                        phone={this.state.phone}
                        userType={this.state.userType}
                        token={this.state.token}/>
                )}/>
            </div>
        </Router>
        )
    }
    else if(this.state.hasFail){
        alert("Incorrect password or username.")
        return(
            <Router>
                <div className = "Login_Ui">
                    <Redirect to= "/login" component={LoginScreen}/>
                    <Route path="/login" component={LoginScreen} />
                </div>
            </Router>
        )
    }
    }
}
export default LoginScreen;