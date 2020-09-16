import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Dashboard from '../Dashboard/Dashboard';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
//import Header from '../Layout/Header';
//import Footer from '../Layout/Footer';
//import NavPane from '../Layout/NavPane';

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            userName: null,
            password: null,
            hasSuccess: false,
            hasFail: false,
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    setUsername = () => this.setState({ userName: document.getElementById("username").value})
    setPassword = () => this.setState({ password: document.getElementById("password").value})

    async onSubmit(e) {
        e.preventDefault();
        await this.setPassword()
        await this.setUsername()
        if(this.state.userName == null){
            alert("Please enter a username!")
            return
        }
        if(this.state.password == null){
            alert("Please enter a password!")
            return
        }
        // confirmation of user in here
        //if its confirmed then this happens
        // const success = await (method)().then()
        const success = true;
        if (success) {
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
                    <br></br><br></br><br></br><br></br>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className = "UserName">
                        <label htmlFor={"username"}>Username:</label>
                        <input type="text" id="username" name="uname" required></input><br></br><br></br>
                    </div>
                    <div className = "Password">
                        <label htmlFor={"password"}>Password:</label>
                        <input type="password" id="password" name="pass" required></input><br></br><br></br>
                    </div>
                    <input type="submit" className="login_Submit" id="navButton"/>
                </form>
            </div>
            )
        }
    if(this.state.hasSuccess) {
        return(
        <Router>
            <Route exact path="/">
                <Redirect to="/dashboard" component = {Dashboard}/>
            </Route>
        </Router>
        )
    }
    else if(this.state.hasFail){
        alert("Password or Username incorrect!")
    }
    }
}
export default LoginScreen;