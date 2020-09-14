import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
//import {Link} from "react-router-dom";
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
    }
    onTypeChange(Type) {
        this.setState({ userName: Type})
    }
    onTypeChange = userType => this.setState({ userType })
    onSubmit(e) {
        e.preventDefault();
        this.setState({ userName: document.getElementById("username").value})
        this.setState({ password: document.getElementById("password").value})
        this.setState({ phone: document.getElementById("phone").value})
        this.setState({ address: document.getElementById("address").value})
        this.setState({ firstName: document.getElementById("firstName").value})
        this.setState({ lastName: document.getElementById("lastName").value})
        let phoneNumberLength = this.state.phone.length
        if(this.state.userName == null){
            alert("Please enter a username!")
            return
        }
        if(this.state.password == null){
            alert("Please enter a password!")
            return
        }
        if(this.state.phone == null){
            alert("Please enter a phone number!")
            return
        }
        if(phoneNumberLength >10){
            alert("invalid phone number!")
            return
        }
        if(phoneNumberLength >10){
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
        // confirmation that username doesnt exist
        //if its confirmed then this happens
        if(true){
            //post of user in here
            //<Link to="/loginscreen"></Link>
        }
        //username is taken
        else{
            alert("username is taken, please try again!")
        }
      }
    render(){
        const animatedComponents = makeAnimated();
        const userTypes = [
            { value: 'Customer', label: 'Customer' },
            { value: 'Worker', label: 'Worker' },
            { value: 'Admin', label: 'Admin' },
        ]
        return(
            <div className = "Register_Ui">
                <div className = "Heading">
                    <h1> Sign Up</h1>
                    <br></br><br></br><br></br><br></br>
                </div>
                <div className = "UserName">
                <label for="username">Username:</label>
                <input type="text" id="username" name="uname" required></input><br></br><br></br>
                </div>
                <div className = "Password">
                <label for="password">Password:</label>
                <input type="text" id="password" name="pass" required></input><br></br><br></br>
                </div>
                <div className = "Phone">
                <label for="phone">Password:</label>
                <input type="text" id="phone" name="phone" required></input><br></br><br></br>
                </div>
                <div className = "Address">
                <label for="address">Password:</label>
                <input type="text" id="address" name="address" required></input><br></br><br></br>
                </div>
                <div className = "Firstname">
                <label for="firstName">Password:</label>
                <input type="text" id="firstName" name="fName" required></input><br></br><br></br>
                </div>
                <div className = "Lastname">
                <label for="lastName">Password:</label>
                <input type="text" id="lastName" name="lName" required></input><br></br><br></br>
                </div>
                <div className="from-user">
                        <label for="user">Select Type of user:</label>
                        <Select name="user" id="user" value={this.state.userType} options={userTypes} 
                            onChange={this.onTypeChange} components={animatedComponents}/>
                    </div>
                <input type="submit" className="login_Submit" id="navButton"/>
            </div>

        )
    }
}

export default RegisterScreen;
