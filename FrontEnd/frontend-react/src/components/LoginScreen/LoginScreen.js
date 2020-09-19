import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import Dashboard from '../Dashboard/Dashboard';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
async function getUserConfirm(string userName) {
    const usr = await getUsers().then()
    const found = true;
    // Get all workers names
    for (let i = 0; i < usr.length; i++) {
        if (usr[i]["user"] == userName) {
            found = false;
        }
    }
    return found;
}
// still needs to be done
async function getUsers() {
    //return await axios.get('http://localhost:8080/api/User/all').then(response => {
    //    return response.data
})
}
class LoginScreen extends Component {
    constructor(props) {
        super(props);
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
        //200 pass, 400 fail
        const success = await getUserConfirm(thos.state.userName).then()
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
            <div className = "Login_Ui">
                <Redirect to= "/dashboard" render={(props) => (
                    <Dashboard {...props} userName={this.state.userName} />
                )}/>
                <Route path="/dashboard" render={(props) => (
                    <Dashboard {...props} userName={this.state.userName} />
                )}/>
            </div>
        </Router>
        )
    }
    else if(this.state.hasFail){
        alert("Password or Username incorrect!")
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