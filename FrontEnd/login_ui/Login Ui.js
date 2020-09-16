import React, { Component } from 'react';
import {Link} from "react-router-dom";

class Login_Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userName: null,
          password: null,
        };
    }
    onSubmit(e) {
        e.preventDefault();
        if(username == null){
            alert("Please enter a username!")
            return
        }
        if(password == null){
            alert("Please enter a password!")
            return
        }
        userName = document.getElementById("username").value
        password = document.getElementById("password").value
        // confirmation of user in here
        //if its confirmed then this happens
        if(true){
            <Link to="/dashboard"></Link>
        }
        //user doesnt exist / password incorrect
        else{
            alert("Invalid password or username, please try again!")
        }
      }
    render(){
        return(
            <div className = "Login_Ui">
                <div className = "Heading">
                    <h1 header> Log in</h1>
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
                <input type="submit" className="login_Submit" id="navButton"/>
            </div>

        )
    }
}