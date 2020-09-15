import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import LoginScreen from '../LoginScreen/LoginScreen'
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
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
          userType:null,
        };
        this.onSubmit = this.onSubmit.bind(this);
    }
    setUsername = () => this.setState({ userName: document.getElementById("username").value})
    setPassword = () => this.setState({ password: document.getElementById("password").value})
    setPhone = () => this.setState({ phone: document.getElementById("phone").value})
    setAddress = () => this.setState({ address: document.getElementById("address").value})
    setFirstName = () => this.setState({ firstName: document.getElementById("firstName").value})
    setLastName = () => this.setState({ lastName: document.getElementById("lastName").value})
    onTypeChange(Type) {
        this.setState({ userName: Type})
    }
    onTypeChange = userType => this.setState({ userType })
    async onSubmit(e) {
        e.preventDefault();
        await this.setPassword()
        await this.setUsername()
        await this.setPhone()
        await this.setAddress()
        await this.setFirstName()
        await this.setLastName()
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
        // confirmation that username doesnt exist
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
        //username is taken

      }
    render(){
        const animatedComponents = makeAnimated();
        const userTypes = [
            { value: 'Customer', label: 'Customer' },
            { value: 'Worker', label: 'Worker' },
            { value: 'Admin', label: 'Admin' },
        ]
        if (!this.state.hasSuccess && !this.state.hasFail) {
            return(
                <div className = "Register_Ui">
                    <div className = "Heading">
                        <h1> Sign Up</h1>
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
                        <div className = "Phone">
                            <label htmlFor={"phone"}>Phone:</label>
                            <input type="number" id="phone" name="phone" required></input><br></br><br></br>
                        </div>
                        <div className = "Address">
                            <label htmlFor={"address"}>Address:</label>
                            <input type="text" id="address" name="address" required></input><br></br><br></br>
                        </div>
                        <div className = "Firstname">
                            <label htmlFor={"firstName"}>First Name:</label>
                            <input type="text" id="firstName" name="fName" required></input><br></br><br></br>
                        </div>
                        <div className = "Lastname">
                            <label htmlFor={"lastName"}>Last Name:</label>
                            <input type="text" id="lastName" name="lName" required></input><br></br><br></br>
                        </div>
                        <div className="form-user">
                            <label htmlFor={"user"}>Select Type of user:</label>
                            <Select name="user" id="user" value={this.state.userType} options={userTypes}
                                    onChange={this.onTypeChange} components={animatedComponents} required/>
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
                        <Redirect to="/login" component = {LoginScreen}/>
                    </Route>
                </Router>
            )
        }
        else if(this.state.hasFail){
            alert("username is taken, please try again!")
        }
    }
}

export default RegisterScreen;
